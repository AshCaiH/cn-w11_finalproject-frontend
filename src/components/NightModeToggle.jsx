import { useContext, useEffect, useState } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { userContext } from "../common/contexts";
import Cookie from "js-cookie";

export const NightModeToggle = () => {
  const { nightMode, setNightMode } = useContext(userContext);

  useEffect(() => {
    if (Cookie.get("nightMode") == "true") setNightMode(true);
  }, [setNightMode]);

  useEffect(() => {
    // if (!nightMode) document.cookie = "nightMode=0"
    // else document.cookie = "nightMode=1"

    const variables = Array.from(document.styleSheets)
      .filter((styleSheet) => {
        return styleSheet.cssRules;
      })
      .map((styleSheet) => Array.from(styleSheet.cssRules))
      .flat()
      .filter((cssRule) => cssRule.selectorText === ":root")
      .map((cssRule) =>
        cssRule.cssText.split("{")[1].split("}")[0].trim().split(";")
      )
      .flat()
      .filter((text) => text !== "")
      .map((text) => text.split(":"))
      .map((parts) => ({ key: parts[0].trim(), value: parts[1].trim() }));

    variables.forEach((variable) => {
      if (variable.key.indexOf("Toggle") != -1) {
        const newValue = variable.key.replace(
          "Toggle",
          nightMode ? "Night" : "Day"
        );
        document.documentElement.style.setProperty(
          variable.key,
          `var(${newValue})`
        );
      }
    });
  }, [nightMode]);

  return (
    <div
      className="nightmode-toggle"
      onClick={() => {
        document.cookie = `nightMode=${!nightMode}`;
        setNightMode(!nightMode);
      }}
    >
      {!nightMode ? <IoMdSunny /> : <IoMdMoon />}
    </div>
  );
};

export default NightModeToggle;
