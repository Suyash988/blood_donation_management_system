import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';
import { Inventory } from '@/app/lib/definitions';
import { fetchInventory } from '@/app/lib/data';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function InventoryChart() {
  const inventory = await fetchInventory();
  console.log('inventory', inventory);
  const chartHeight = 350
  const { yAxisLabels, topLabel } = generateYAxis(inventory)

  // const units = inventory.map(i => i.unitsAvailable);

  // console.log('units', units);


  if (inventory.length === 0) {
    return <p className="mt-4 text-gray-400">No inventory data available.</p>
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Current Inventory
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {inventory.map((item) => (
            <div key={item.bloodGroup} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-red-300"
                style={{
                  height: `${(chartHeight / topLabel) * item.unitsAvailable}px`,
                }}
              />
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {item.bloodGroup}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">
            As of {new Date().toLocaleDateString()}
          </h3>
        </div>
      </div>
    </div>
  )
}