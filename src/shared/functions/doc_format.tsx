export function formatCpf(value: string): string {
  if (value.length > 11) return value;

  let formattedValue = '';

  for (let index = 1; index <= value.length; index++) {
    formattedValue += value[index - 1];

    if (index == 3) {
      formattedValue += '.'
      continue;
    }
    if (index == 6) {
      formattedValue += '.'
      continue;
    }
    if (index == 9) {
      formattedValue += '-'
      continue;
    }
  }

  return formattedValue;
}

export function formatCnpj(value: string): string {
  if (value.length > 14) return value;

  let formattedValue = '';

  for (let index = 1; index <= value.length; index++) {
    formattedValue += value[index - 1];

    if (index == 2) {
      formattedValue += '.'
      continue;
    }
    if (index == 5) {
      formattedValue += '.'
      continue;
    }
    if (index == 8) {
      formattedValue += '/'
      continue;
    }
    if (index == 12) {
      formattedValue += '-'
      continue;
    }
  }

  return formattedValue;
}