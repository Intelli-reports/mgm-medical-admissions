export const motionEase = [0.2, 0.8, 0.2, 1];

export const pageReveal = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: motionEase
    }
  }
};

export const bannerReveal = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: motionEase
    }
  }
};

export const sectionReveal = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: motionEase
    }
  }
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: motionEase
    }
  }
};

export const headlineReveal = {
  hidden: { opacity: 0, y: 18, clipPath: "inset(0 0 18% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0 0)",
    transition: {
      duration: 0.62,
      ease: motionEase
    }
  }
};

export const cardHover = {
  y: -3,
  transition: {
    duration: 0.22,
    ease: motionEase
  }
};

export const softTap = {
  scale: 0.985,
  transition: {
    duration: 0.1
  }
};
