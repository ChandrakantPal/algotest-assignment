import * as React from "react";
import { CrosshairMode, createChart } from "lightweight-charts";

const CandlestickChart = ({
  data,
  interval,
  livePreview,
  priceData,
  showPiceGraph,
}) => {
  const chartContainerRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  React.useEffect(() => {
    const dataArray = livePreview ? [data[0]] : data;
    const priceArray = livePreview ? [priceData[0]] : priceData;
    let index = 1;
    chartInstanceRef.current = createChart(chartContainerRef.current, {
      width: "100%",
      height: 0.7 * window.innerHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
      layout: {
        backgroundColor: "#f5f5f5",
        textColor: "#000000",
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      autoSize: true,
    });

    const candlestickSeries = chartInstanceRef.current.addCandlestickSeries();
    candlestickSeries.setData(dataArray);

    const lineSeries = chartInstanceRef.current.addLineSeries({
      lineWidth: 2,
    });
    if (showPiceGraph) {
      lineSeries.setData(priceArray);
    }
    let timeInterval;
    if (livePreview) {
      timeInterval = setInterval(() => {
        if (index <= data.length - 1) {
          const newDataPoint = data[index];
          candlestickSeries.update(newDataPoint);
          if (showPiceGraph) {
            const newPriceDataPoint = priceData[index];
            lineSeries.update(newPriceDataPoint);
          }
          index++;
        }
      }, interval * 1000);
    }
    return () => {
      clearInterval(timeInterval);
      chartInstanceRef.current.remove();
    };
  }, [data, interval, livePreview, priceData, showPiceGraph]);

  return <div ref={chartContainerRef} className="w-full rounded" />;
};

export default CandlestickChart;
