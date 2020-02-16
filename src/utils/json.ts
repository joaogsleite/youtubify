
export function unique(array: any[]): any[] {
  return array.filter((value, index, self) => self.indexOf(value) === index)
}

export function getKey(obj: any, keys: string[] | string): any {
  const thekeys = Array.isArray(keys) ? keys : [keys]
  const results: any[] = [];
  function search(obj: any): any {
    if (Array.isArray(obj)) {
      obj.forEach((item) => search(item))
    } else if (typeof obj === 'object') {
      const keys = Object.keys(obj)
      if(thekeys.every((key) => keys.includes(key))) {
        results.push(obj)
      } else {
        keys.forEach((key) => search(obj[key]))
      }
    }
  }
  search(obj);
  return unique(results);
}