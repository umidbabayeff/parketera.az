export const quizQuestions = [
  {
    id: 1,
    key: 'room',
    options: ['living', 'bedroom', 'kitchen', 'office', 'commercial']
  },
  {
    id: 2,
    key: 'heating',
    options: ['yes', 'no']
  },
  {
    id: 3,
    key: 'style',
    options: ['modern', 'classic', 'minimalist', 'luxury']
  },
  {
    id: 4,
    key: 'usage',
    options: ['high', 'low']
  },
  {
    id: 5,
    key: 'tone',
    options: ['light', 'medium', 'dark']
  }
];

export const getMatches = (answers, products) => {
  // Simple heuristic matching
  return products
    .map(product => {
      let score = 0;
      
      // Heating match (Engineered board is best for heating)
      if (answers.heating === 'yes' && (product.categoryId === 4 || product.categoryId === 2)) {
        score += 3;
      }
      
      // Usage match (Engineered and Merbau are durable)
      if (answers.usage === 'high' && (product.categoryId === 4 || product.categoryId === 3)) {
        score += 2;
      }

      // Style match (Herringbone/Massive for Classic/Luxury)
      if ((answers.style === 'classic' || answers.style === 'luxury') && product.name.toLowerCase().includes('herringbone')) {
        score += 2;
      }

      // Tone match (based on product color/name keywords)
      const color = product.color?.toLowerCase() || '';
      if (answers.tone === 'light' && (color.includes('white') || color.includes('light') || color.includes('natural'))) score += 2;
      if (answers.tone === 'dark' && (color.includes('dark') || color.includes('black') || color.includes('brown'))) score += 2;
      if (answers.tone === 'medium' && !color.includes('white') && !color.includes('dark')) score += 1;

      return { ...product, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};
