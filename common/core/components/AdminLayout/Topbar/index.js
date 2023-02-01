import { cl } from '@cogoport/components';
import { IcMOverflowLine, IcMCross } from '@cogoport/icons-react';
import React from 'react';

import { LOGO } from '../../../constants/logo';

import styles from './styles.module.css';

function Topbar({
	className,
	showMobileNav = false,
	onClickMobileNav = () => {},
	showMobileNavbar = false,
}) {
	return (
		<div className={cl`${styles.container} ${className}`}>
			{showMobileNav && (
				<button onClick={onClickMobileNav} type="button" className={styles.nav_button}>
					{showMobileNavbar ? <IcMCross /> : <IcMOverflowLine />}
				</button>
			)}

			<div className={styles.brand_logo}>
				<img
					className={styles.logo}
					src={LOGO.LARGE}
					alt="Logo Cogoport"
				/>
			</div>

		</div>
	);
}
export default Topbar;
