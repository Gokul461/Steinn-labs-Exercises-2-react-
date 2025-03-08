type SliderValue = [number, number];
import React from "react";
import { Slider } from "@heroui/react";

type PriceSliderProps = {
  filters: {
    min_price: number | "";
    max_price: number | "";
  };
  setFilters: (filters: { min_price: number | ""; max_price: number | "" }) => void;
};

const PriceSlider: React.FC<PriceSliderProps> = ({ filters, setFilters }) => {
  const [value, setValue] = React.useState<SliderValue>([0, 1000]);

  const handleChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
      setValue(newValue as SliderValue);
      setFilters({
        ...filters,
        min_price: newValue[0],
        max_price: newValue[1],
      });
    }
  };

  return (
    <div className="my-4 flex flex-col gap-4">
      <Slider
        defaultValue={[0, 800]}
        disableThumbScale={true}
        formatOptions={{style: "currency", currency: "INR"}}
        // label="Price Range"
        maxValue={1000}
        minValue={0}
        showOutline={true}
        showSteps={true}
        showTooltip={true}
        step={100}
        value={value} 
        onChange={handleChange}
        classNames={{
          base: "max-w-md",
          filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
          labelWrapper: "mb-2",
          label: "font-medium text-default-700 text-medium",
          value: "font-medium text-default-500 text-small",
          thumb: [
            "transition-size",
            "bg-gradient-to-r from-secondary-400 to-primary-500",
            "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
            "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
          ],
          step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
        }}
        tooltipProps={{
          offset: 10,
          placement: "bottom",
          classNames: {
            base: [
              "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
            ],
            content: [
              "py-2 shadow-xl",
              "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
            ],
          },
        }}
        tooltipValueFormatOptions={{ style: "currency", currency: "INR", maximumFractionDigits: 0 }}
      />

      <p className="text-gray-600 font-medium text-sm">
       {Array.isArray(value) && value.map((b) => `₹${b}`).join(" – ")}
      </p>
    </div>
  );
};

export default PriceSlider;
