import cl from '@cogoport/components/src/utils/classname-processor';
import { IcMOverflowLine } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Topbar({
	className,
	style,
	logo = null,
	showMobileNav = false,
	onClickMobileNav = () => {},
}) {
	const router = useRouter();

	return (
		<div style={style} className={cl`${styles.container} ${className}`}>
			{showMobileNav && (
				<button onClick={onClickMobileNav} type="button" className={styles.nav_button}>
					<IcMOverflowLine />
				</button>
			)}

			{logo && (
				<div
					tabIndex={0}
					role="button"
					className={styles.logo_container}
					onClick={() => router.push('/')}
				>
					{logo}
				</div>
			)}

		</div>
	);
}
export default Topbar;
