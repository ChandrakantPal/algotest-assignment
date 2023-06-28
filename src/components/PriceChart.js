import * as React from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { dataPreparationTradeValueAndVolume } from "@/utils/dataPreparation";

const Chart = ({ data }) => {
  const chartContainerRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  React.useEffect(() => {
    const sanitizedData = dataPreparationTradeValueAndVolume(data);
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
    lineSeries.setData(sanitizedData);

    return () => {
      chartInstanceRef.current.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} className="w-full" />;
};

export default Chart;
