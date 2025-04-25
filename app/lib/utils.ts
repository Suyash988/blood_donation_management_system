import { Revenue } from './definitions';

export const formatBloodAmount = (amount: number) => {
  return `${amount.toLocaleString('en-US')} mL`;
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export type HasRevenue = { revenue: number }
export type HasUnits   = { unitsAvailable: number }

export const generateYAxis = <T extends HasRevenue | HasUnits>(data: T[]) => {
  if (data.length === 0) {
    return { yAxisLabels: [] as string[], topLabel: 0 }
  }

  // detect which metric we’re charting
  const first = data[0]!
  const isRevenue = (first as HasRevenue).revenue !== undefined

  // pull out the values
  const values = data.map(d =>
    isRevenue
      ? (d as HasRevenue).revenue
      : (d as HasUnits).unitsAvailable
  )

  // find the max
  const highest = Math.max(...values)

  // choose step & topLabel
  let step: number, topLabel: number
  if (isRevenue) {
    step = 1000
    topLabel = Math.ceil(highest / step) * step
  } else {
    const segments = 5
    step = Math.ceil(highest / segments)
    topLabel = step * segments
  }

  // build labels array
  const yAxisLabels: string[] = []
  for (let v = topLabel; v >= 0; v -= step) {
    yAxisLabels.push(isRevenue ? `$${v / 1000}K` : `${v}`)
  }

  return { yAxisLabels, topLabel }
}

export function generateYAxisForInventory(values: number[], segments = 5) {
  if (values.length === 0) {
    return { yAxisLabels: [] as string[], topLabel: 0 };
  }

  const highest = Math.max(...values);
  const step = Math.ceil(highest / segments);
  const topLabel = step * segments;

  const yAxisLabels: string[] = [];
  for (let v = topLabel; v >= 0; v -= step) {
    yAxisLabels.push(`${v}`);
  }

  return { yAxisLabels, topLabel };
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
