export function currencyFormat(value: string, showSymbol: boolean = false) {
  const nonFormattedValue = filterZerosAndLetters((value as any).replaceAll('.', '').replaceAll(',', ''));

  const formattedValue = formatValue(nonFormattedValue);

  let firstZeros = '';

  if (formattedValue.length == 0) {
    firstZeros = '0,00';
  }
  if (formattedValue.length == 1) {
    firstZeros = '0,0';
  }
  if (formattedValue.length == 2) {
    firstZeros = '0,';
  }
  if (showSymbol) return `R\$ ${firstZeros}${formattedValue}`;
  return `${firstZeros}${formattedValue}`;
}

function filterZerosAndLetters(value: string) {
  let endZeros = false;
  let returnValue = '';

  for (let index = 0; index < value.length; index++) {
    const item = value[index];

    if (
      item != '0' &&
      item != '1' &&
      item != '2' &&
      item != '3' &&
      item != '4' &&
      item != '5' &&
      item != '6' &&
      item != '7' &&
      item != '8' &&
      item != '9'
    ) {
      continue;
    }

    if (endZeros) {
      returnValue += item;
      continue;
    }

    if (item != '0') {
      endZeros = true;
      returnValue += item;
    }
  }

  return returnValue;
}

function formatValue(value: string) {
  let newValue: string[] = [];

  const splitted = value.split('').reverse();

  for (let index = 1; index <= splitted.length; index++) {
    if (index == 3) {
      newValue.push(`${splitted[index - 1]},`);
    } else if ((index - 3) % 3 == 0) {
      newValue.push(`${splitted[index - 1]}.`);
    } else {
      newValue.push(splitted[index - 1]);
    }
  }
  return newValue.reverse().join('');
}
