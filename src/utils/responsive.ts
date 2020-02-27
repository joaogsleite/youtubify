export function isMobile() {
  return typeof window.orientation !== "undefined"
}

export function setFavicon(href: string) {
  const link: any = document.querySelector("link[rel*='icon']") || 
    document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = href;
  document.getElementsByTagName('head')[0].appendChild(link);
}