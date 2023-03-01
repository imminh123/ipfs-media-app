export function* countPrimes(n: number) {
  let array: Array<String>[] = [];
  let seen = new Uint8Array(n);
  let tempArray: String[] = [];

  for (let num = 2; num < n; num++) {
    if (seen[num]) continue;
    tempArray.push(num.toString());
    if (tempArray.length === 16) {
      array.push(tempArray);
      tempArray = [];
      yield array;
    }
    let mult = num * num;

    for (mult; mult < n; mult += num) seen[mult] = 1;
  }

  return array;
}
