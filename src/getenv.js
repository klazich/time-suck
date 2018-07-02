export default variable =>
  [
    s =>
      s
        .trim()
        .toLowerCase()
        .replace(/[_ ]/g, '-'),
    s =>
      s
        .trim()
        .toLowerCase()
        .replace(/[- ]/g, '_'),
    s =>
      s
        .trim()
        .toLowerCase()
        .replace(/[-_]/g, ' '),
    s =>
      s
        .trim()
        .toUpperCase()
        .replace(/[_ ]/g, '-'),
    s =>
      s
        .trim()
        .toUpperCase()
        .replace(/[- ]/g, '_'),
    s =>
      s
        .trim()
        .toLowerCase()
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
    s =>
      s
        .trim()
        .toLowerCase()
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(''),
  ]
    .map(f => f(variable))
    .map(v => process.env[v])
    .filter(e => e)[0]
