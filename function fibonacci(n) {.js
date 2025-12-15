function fibonacci(n) {
  let a = 0, b = 1;
  let series = [];

  for (let i = 0; i < n; i++) {
    series.push(a);
    let next = a + b;
    a = b;
    b = next;
  }

  return series;
}

