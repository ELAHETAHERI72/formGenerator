export function isImageUrl(url: string): boolean {
  if (!url.length) {
    return false;
  }
  return (
    url.endsWith('.jpg') ||
    url.endsWith('.jpeg') ||
    url.endsWith('.svg') ||
    url.endsWith('.png')
  );
}
