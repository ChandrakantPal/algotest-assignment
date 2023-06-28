import { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import data from "../static/BANKNIFTY2360843500CE(2023-06-01).json";
import { dataPreparationTradeValueAndVolume } from "@/utils/dataPreparation";

const Chart = () => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return <div ref={chartContainerRef} className="w-full" />;
};

export default Chart;
