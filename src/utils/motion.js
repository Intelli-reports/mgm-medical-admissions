export const motionEase = [0.22, 1, 0.36, 1];

export const pageReveal = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: motionEase
    }
  }
};

export const sectionReveal = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: motionEase
    }
  }
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: motionEase
    }
  }
};

export const cardHover = {
  y: -4,
  transition: {
    duration: 0.18,
    ease: motionEase
  }
};

export const softTap = {
  scale: 0.98,
  transition: {
    duration: 0.12
  }
};
