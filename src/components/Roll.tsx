// Button label that rolls up to a second copy of itself on hover (CSS only).
export function Roll({ children }: { children: string }) {
  return <span className="roll"><span data-l={children}>{children}</span></span>;
}
