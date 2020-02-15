
export function unique(array: any[]): any[] {
  return array.filter((value, index, self) => self.indexOf(value) === index)
}

export function getKey(obj: any, thekey: string): any {
  const results: any[] = [];
  function search(obj: any): any {
    if (Array.isArray(obj)) {
      for (const child of obj) {
        const value = search(child);
        if (value !== undefined) {
          results.push(value)
        }
      }
    } else if (typeof obj === 'object') {
      const keys = Object.keys(obj)
      for (const key of keys) {
        if (key === thekey) {
          results.push(obj[key])
        } else {
          const value = search(obj[key])
          if (value !== undefined) {
            results.push(value)
          }
        }
      }
    }
  }
  search(obj);
  return unique(results);
}