export function getScrollOffset(): number {
  if (typeof window === "undefined") return -90;
  const topbar = document.querySelector("[data-topbar]");
  const header = document.querySelector("[data-header]");
  const topbarH = topbar instanceof HTMLElement ? topbar.getBoundingClientRect().height : 0;
  const headerH = header instanceof HTMLElement ? header.getBoundingClientRect().height : 0;
  return -(topbarH + headerH);
}
