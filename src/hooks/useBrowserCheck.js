import platform from "platform";

function browserSupport() {
  const isUnsupported = () =>
    platform.name === "IE" || platform.layout === "EdgeHTML";

  // Browsers that are supported and don't
  const isSupported = () =>
    !isUnsupported() &&
    ["Chrome", "Firefox", "Microsoft Edge"].includes(platform.name);

  //Check if mobile
  const isMobile = () => {
    const mobileDevice = RegExp(/Android|webOS|iPhone|iPod|iPad/i).test(
      navigator.userAgent
    );
    const isMac = RegExp(/Macintosh/i).test(navigator.userAgent);
    return (
      (isMac && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) ||
      mobileDevice
    );
  };

  if (isUnsupported()) {
    return "unsupported";
  } else if (isMobile()) {
    return "mobile";
  } else if (isSupported()) {
    return "supported";
  } else {
    return "unknown";
  }
}

export default browserSupport();
