import * as React from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import data1 from "../static/BANKNIFTY2360843500CE(2023-06-01).json";
import data2 from "../static/BANKNIFTY2360843500PE(2023-06-01).json";
import {
  combinePriceDataUnique,
  dataPreparationTradeValueAndVolume,
} from "@/utils/dataPreparation";

const MultipleCombinedChart = ({ showCombinedData }) => {
  const chartContainerRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  React.useEffect(() => {
    const sanitizedData1 = dataPreparationTradeValueAndVolume(data1);
    const sanitizedData2 = dataPreparationTradeValueAndVolume(data2);

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

    if (showCombinedData) {
      const combinedData = combinePriceDataUnique(data1, data2);
      const combinedGraph = chartInstanceRef.current.addLineSeries({
        color: "rgba(7, 213, 254, 1)",
      });
      combinedGraph.setData(dataPreparationTradeValueAndVolume(combinedData));
    }

    const lineSeries = chartInstanceRef.current.addLineSeries({
      color: "rgba(67, 83, 254, 1)",
    });
    lineSeries.setData(sanitizedData1);
    const lineSeries2 = chartInstanceRef.current.addLineSeries({
      color: "rgba(200, 83, 254, 1)",
    });
    lineSeries2.setData(sanitizedData2);

    return () => {
      chartInstanceRef.current.remove();
    };
  }, [showCombinedData]);

  return <div ref={chartContainerRef} className="w-full" />;
};

export default MultipleCombinedChart;
