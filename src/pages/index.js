import * as React from "react";
import Chart from "@/components/PriceChart";
import Dropdown from "@/components/Dropdown";
import { DataSetMapping } from "@/utils/dataMapper";
import { DataSetOptions } from "@/utils/options";

export default function Home() {
  const [data, setData] = React.useState([]);
  const [selectedDataset, setSelectedDataset] = React.useState(
    DataSetOptions[0].value
  );

  React.useEffect(() => {
    const chartData = DataSetMapping[selectedDataset];
    setData(chartData);
  }, [selectedDataset]);

  return (
    <>
      <div className="flex items-center justify-end mb-2 gap-x-4">
        <Dropdown
          value={selectedDataset}
          options={DataSetOptions}
          onChange={(value) => {
            setSelectedDataset(value);
          }}
        />
      </div>
      {data.length > 0 && <Chart />}
    </>
  );
}
