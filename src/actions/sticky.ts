export const sticky = (node: HTMLCanvasElement) => {
  const observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle("isSticky", e.intersectionRatio < 1),
    { threshold: [1] }
  );
  observer.observe(node);

  return {
    update() {
      // TODO ... update
    },
    destroy() {
      // TODO ... cleanup
    },
  };
};
