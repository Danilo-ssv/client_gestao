import { DateRange, isDateRange } from "react-day-picker";

export function dateFormatToString(date: DateRange | Date | string | undefined, format?: 'dd/MM/yyyy' | 'yyyy-MM-dd' | undefined): string {
  if (typeof date == 'undefined') return '';

  if (isDateRange(date)) {
    if (format == "yyyy-MM-dd") {
      return `${date.from?.toISOString().split('T')[0]} - ${date.to?.toISOString().split('T')[0]}`;
    }
    return `${date.from?.toLocaleDateString("pt-BR")} - ${date.to?.toLocaleDateString("pt-BR")}`;
  }

  if (date instanceof Date) {
    if (format == "yyyy-MM-dd") return date.toISOString().split('T')[0];

    // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("pt-BR");
  }

  if (format == "yyyy-MM-dd") {
    const split = date.split('/');

    if (split.length != 3) return date;

    return `${split[2]}-${split[1]}-${split[0]}`;
  }

  const split = date.split('-');

  if (split.length != 3) return date;

  return `${split[2]}/${split[1]}/${split[0]}`;
}

// export function dateFormatToDate(date: Date | string): Date {
//   if (date instanceof Date) {
//     return new Date();
//   }
//   return new Date();
// }