import cl from '@cogoport/components/src/utils/classname-processor';
import { IcMOverflowLine } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import GitLogo from './github.svg';
import styles from './styles.module.css';

function Topbar({
	className,
	style,
	logo = null,
	socials = {},
	showMobileNav = false,
	onClickMobileNav = () => {},
}) {
	const { github } = socials;

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

			<div className={styles.actions_container}>
				{github && (
					<a rel="noreferrer" target="_blank" href="https://github.com/Cogoport/packages-icons">
						<GitLogo className={styles.actions_svg} />
					</a>
				)}
			</div>
		</div>
	);
}
export default Topbar;
