import { useEffect, useRef, useState } from "react";
import BottomMobileMenu from "./BottomMobileMenu";
import TopMobileMenu from "./TopMobileMenu";
import styles from "../css/Dashboard.module.css";

function SidebarMobile() {
	const [menusVisible, setMenusVisible] = useState(true);
	const previousScrollY = useRef(0);

	useEffect(() => {
		previousScrollY.current = window.scrollY;

		function handleScroll() {
			const currentScrollY = window.scrollY;
			const scrollDelta = currentScrollY - previousScrollY.current;

			if (currentScrollY <= 0) {
				setMenusVisible(true);
			} else if (Math.abs(scrollDelta) > 3) {
				setMenusVisible(scrollDelta < 0);
			}

			previousScrollY.current = currentScrollY;
		}

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className={styles.sidebarMobile}>
			<TopMobileMenu visible={menusVisible} />
			<BottomMobileMenu visible={menusVisible} />
		</div>
	);
}

export default SidebarMobile;