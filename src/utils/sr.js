import ScrollReveal from 'scrollreveal';

let srInstance;

function getScrollReveal() {
  if (typeof window === 'undefined') {
    return null;
  }
  if (!srInstance) {
    srInstance = ScrollReveal();
  }
  return srInstance;
}

/** Same shape as scrollreveal; reveal() no-ops if DOM node or browser is missing. */
const sr = {
  reveal(el, config) {
    const instance = getScrollReveal();
    if (!instance || !el) {
      return;
    }
    instance.reveal(el, config);
  },
};

export default sr;
