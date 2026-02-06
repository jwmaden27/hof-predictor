interface ProjectionSliderProps {
  value: number
  onChange: (value: number) => void
}

export function ProjectionSlider({ value, onChange }: ProjectionSliderProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Projected WAR per Season
        </label>
        <span className="rounded-lg bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-lg font-bold text-blue-600 dark:text-blue-400">
          {value.toFixed(1)}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={9}
        step={0.5}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700 accent-blue-600"
      />
      <div className="mt-1 flex justify-between text-xs text-gray-400 dark:text-gray-500">
        <span>1.0 (Replacement)</span>
        <span>4.0 (Good)</span>
        <span>6.0 (All-Star)</span>
        <span>9.0 (MVP)</span>
      </div>
    </div>
  )
}
