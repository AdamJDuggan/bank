// React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// 3rd party
import classnames from "classnames";

// Styles
import styles from "./index.module.scss";

// Hooks
import useWindowWidth from "../../hooks/useWindowWidth";
import useShowHide from "../../hooks/useShowHide";

// Routes
import routes from "../../routes/routes";

const mobileLinkStyles = "pb-3";
const desktopLinkStypes = "mh-3 ";

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
          <div onClick={props.closeMenu} className={styles.mobileMenuItems}>
            <Link
              to={routes.HOME}
              className={classnames(styles.menuItem, mobileLinkStyles)}
            >
              Home
            </Link>
            <Link
              to={routes.SPORT}
              className={classnames(styles.menuItem, mobileLinkStyles)}
            >
              Sport
            </Link>
            <Link
              to={routes.ABACUS}
              className={classnames(styles.menuItem, mobileLinkStyles)}
            >
              Abacus
            </Link>
            <Link
              to={routes.ELEMENTS}
              className={classnames(styles.menuItem, mobileLinkStyles)}
            >
              Elements
            </Link>
            <Link
              to={routes.HOOKS}
              className={classnames(styles.menuItem, mobileLinkStyles)}
            >
              Hooks
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

function Nav(props) {
  const { isTablet } = useWindowWidth();
  const [mobileMenu, updateMobileMenu] = useState(false);
  const toggleMobileMenu = () => updateMobileMenu(!mobileMenu);
  useEffect(() => {
    console.log("hit");
    updateMobileMenu(false);
  }, [window.location.href]);

  return (
    <>
      {mobileMenu && (
        <MobileNav isOpen={mobileMenu} closeMenu={toggleMobileMenu} />
      )}
      <nav className={classnames(styles.desktopNav, "row primary p-4")}>
        {isTablet ? (
          <div
            onClick={() => toggleMobileMenu()}
            className={classnames(
              styles.mobileButton,
              "textWhite size-3 pointer"
            )}
          >
            <div className={classnames("bold", styles.hamburger)}>-</div>
            <div className={classnames("bold", styles.hamburger)}>-</div>
            <div className={classnames("bold", styles.hamburger)}>-</div>
          </div>
        ) : (
          <div className={classnames("row", styles.desktopButtons)}>
            <Link
              to={routes.HOME}
              className={classnames(styles.menuItem, desktopLinkStypes)}
            >
              Home
            </Link>
            <Link
              to={routes.SPORT}
              className={classnames(styles.menuItem, desktopLinkStypes)}
            >
              Sport
            </Link>
            <Link
              to={routes.ELEMENTS}
              className={classnames(styles.menuItem, desktopLinkStypes)}
            >
              Abacus
            </Link>
            <Link
              to={routes.ELEMENTS}
              className={classnames(styles.menuItem, desktopLinkStypes)}
            >
              Elements
            </Link>
            <Link
              to={routes.HOOKS}
              className={classnames(styles.menuItem, desktopLinkStypes)}
            >
              Hooks
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export { Nav };
