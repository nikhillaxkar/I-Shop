function getRandomDarkGradient() {
    const letters = '0123456789ABCDEF';
    
    // Generate a random dark color by limiting the color range
    const getRandomDarkColor = () =>
      '#' +
      Array.from({ length: 6 })
        .map(() => letters[Math.floor(Math.random() * 8)]) // Use only darker shades
        .join('');
    
    const angle = Math.floor(Math.random() * 360);
    
    // Return a linear-gradient with two random dark colors
    return `linear-gradient(${angle}deg, ${getRandomDarkColor()}, ${getRandomDarkColor()})`;
  }
  
  export { getRandomDarkGradient };
  