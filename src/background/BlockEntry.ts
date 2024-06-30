export class BlockEntry {
  constructor(private name: string, private urlPattern: string) {}
  match(url: string): boolean {
    const pattern = this.urlPattern;
    if (
      pattern.startsWith("/") &&
      pattern.endsWith("/") &&
      pattern.length >= 2
    ) {
      return RegExp(pattern.substring(1, pattern.length - 1), "i").test(url);
    }
    return url.toLowerCase().includes(pattern.toLowerCase());
  }
}
