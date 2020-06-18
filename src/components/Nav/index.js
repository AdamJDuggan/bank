// React
import React, { useState } from "react";
import { Link } from "react-router-dom";

// 3rd party
import classnames from "classnames";

// Styles
import styles from "./index.module.scss";

// Hooks
import useWindowWidth from "../../hooks/useWindowWidth";
import useShowHide from "../../hooks/useShowHide";

const MobileNav = (props) => {
  const { show, render } = useShowHide(props.isOpen);
  return !render ? null : (
    <>
      <div onClick={props.closeMenu} className={styles.overlay}></div>
      <nav
        className={classnames(
          "primary pv-10 ph-5",
          styles.mobileNav,
          show && styles.isOpen
        )}
      >
        <div>
          <p
            onClick={props.closeMenu}
            className={classnames(
              styles.closeButton,
              "textWhite bold size-4 pointer"
            )}
          >
            {"<"}
          </p>
          <p className="textWhite bold size-4 pointer  mv-5">Elements</p>
          <p className="textWhite bold size-4 pointer mv-5">Utils</p>
          <p className="textWhite bold size-4 pointer mv-5">Fetch</p>
        </div>
      </nav>
    </>
  );
};

function Nav(props) {
  const { isTablet } = useWindowWidth();
  const [mobileMenu, updateMobileMenu] = useState(false);
  const toggleMobileMenu = () => updateMobileMenu(!mobileMenu);

  return (
    <>
      {mobileMenu && (
        <MobileNav isOpen={mobileMenu} closeMenu={toggleMobileMenu} />
      )}
      <nav className="row primary p-2">
        {isTablet ? (
          <div
            onClick={() => toggleMobileMenu()}
            className={classnames(
              styles.mobileButton,
              "textWhite size-3 pointer pv-3"
            )}
          >
            <div className={classnames("bold", styles.hamburger)}>-</div>
            <div className={classnames("bold", styles.hamburger)}>-</div>
            <div className={classnames("bold", styles.hamburger)}>-</div>
          </div>
        ) : (
          <div className={classnames("row", styles.desktopButtons)}>
            <Link to={"/"} className="textWhite pointer mh-2">
              Home
            </Link>
            <Link to={"/elements"} className="textWhite pointer mh-2">
              Elements
            </Link>
            <Link to={"/fetch"} className="textWhite pointer mh-2">
              Fetch
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

Nav.propTypes = {
  /**  */
};

export { Nav };
