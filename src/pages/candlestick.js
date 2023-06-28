import * as React from "react";
import CandlestickChart from "@/components/CandlestickChart";
import {
  getCandleStickData,
  getPriceGraphDataForTimeInterval,
} from "@/utils/dataPreparation";
import { DataSetMapping } from "@/utils/dataMapper";
import Dropdown from "@/components/Dropdown";
import { DataSetOptions, IntervalOptions } from "@/utils/options";
import ToggleSwitch from "@/components/ToggleSwitch";

const Candlestick = () => {
  const [data, setData] = React.useState([]);
  const [priceData, setPriceData] = React.useState([]);
  const [selectedDataset, setSelectedDataset] = React.useState(
    DataSetOptions[0].value
  );
  const [selectedInterval, setSelectedInterval] = React.useState(
    IntervalOptions[0].value
  );
  const [showLiveData, setShowLiveData] = React.useState(false);
  const [showPiceGraph, setShowPriceGraph] = React.useState(false);

  React.useEffect(() => {
    const candlesticksData = getCandleStickData(
      DataSetMapping[selectedDataset],
      selectedInterval
    );
    const price = getPriceGraphDataForTimeInterval(
      DataSetMapping[selectedDataset],
      selectedInterval
    );
    setData(candlesticksData);
    setPriceData(price);
  }, [selectedDataset, selectedInterval]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-end gap-4 mb-2">
        <Dropdown
          value={selectedDataset}
          options={DataSetOptions}
          onChange={(value) => {
            setSelectedDataset(value);
          }}
        />
        <Dropdown
          value={selectedInterval}
          options={IntervalOptions}
          onChange={(value) => {
            setSelectedInterval(value);
          }}
        />
        <ToggleSwitch
          label="Live Preview"
          checked={showLiveData}
          onChange={(value) => {
            setShowLiveData(value);
          }}
        />
        <ToggleSwitch
          label="Show Price Graph"
          checked={showPiceGraph}
          onChange={(value) => {
            setShowPriceGraph(value);
          }}
        />
      </div>
      {data.length > 0 && (
        <CandlestickChart
          data={data}
          priceData={priceData}
          interval={selectedInterval}
          livePreview={showLiveData}
          showPiceGraph={showPiceGraph}
          key={`${data[Math.floor(Math.random() * 6)][0]}-${
            data[Math.floor(Math.random() * 6)][1]
          }-${data[Math.floor(Math.random() * 6)][2]}`}
        />
      )}
    </>
  );
};

export default Candlestick;
