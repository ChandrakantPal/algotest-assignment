import * as React from "react";
import MultipleCombinedChart from "@/components/MultipleCombinedChart";
import ToggleSwitch from "@/components/ToggleSwitch";

const CombinedCharts = () => {
  const [showCombinedData, setShowCombinedData] = React.useState(false);

  return (
    <>
      <div className="flex items-center justify-end mb-2 gap-x-4">
        <ToggleSwitch
          checked={showCombinedData}
          onChange={(value) => {
            setShowCombinedData(value);
          }}
          label="Show Combined Data"
        />
      </div>
      <MultipleCombinedChart showCombinedData={showCombinedData} />
    </>
  );
};

export default CombinedCharts;
