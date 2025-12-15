function typeWriter(text, speed = 100) {
  let i = 0;
  const interval = setInterval(() => {
    document.body.innerHTML += text[i];
    i++;
    if (i === text.length) clearInterval(interval);
  }, speed);
}

typeWriter("Hello, JavaScript!");
