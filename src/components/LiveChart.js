import * as React from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import data from "../static/BANKNIFTY2360843500PE(2023-06-01).json";
import {
  dataPreparationTradeValueAndVolume,
  getCandleStickData,
  getPreparedItem,
} from "@/utils/dataPreparation";

const LiveChart = () => {
  const chartContainerRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  React.useEffect(() => {
    const dataArray = [getPreparedItem(data[0])];
    let index = 1;
    chartInstanceRef.current = createChart(chartContainerRef.current, {
      width: "100%",
      height: window.innerHeight - 100,
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

    const lineSeries = chartInstanceRef.current.addLineSeries();
    lineSeries.setData(dataArray);
    const interval = setInterval(() => {
      if (index <= data.length - 1) {
        const newDataPoint = getPreparedItem(data[index]);
        lineSeries.update(newDataPoint);
        index++;
      }
    }, 1000);
    return () => {
      clearInterval(interval);
      chartInstanceRef.current.remove();
    };
  }, []);

  return <div ref={chartContainerRef} className="w-full" />;
};

export default LiveChart;
