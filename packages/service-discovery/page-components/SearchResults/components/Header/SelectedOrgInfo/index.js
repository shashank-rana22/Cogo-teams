// import { IcMArrowDown } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SelectedOrgInfo({ org_name, user_name, setShow = () => {}, show, platformTheme = 'light' }) {
	const styledTheme = {
		container        : `${styles.container} ${styles[platformTheme]}`,
		name_container   : `${styles.name_container}${styles[platformTheme]}`,
		org_name         : `${styles.org_name} ${styles[platformTheme]} `,
		user_name        : `${styles.user_name} ${styles[platformTheme]} `,
		icon             : `${styles.icon} ${styles[platformTheme]}`,
		location_details : `${styles.location_details} ${styles[platformTheme]}`,
	};

	return (
		<div className={styledTheme.container}>
			<div className={styledTheme.name_container}>
				<div className={styledTheme.org_name}>{org_name || ''}</div>
				<div className={styledTheme.user_name}>{user_name || ''}</div>
			</div>

			{/* <div className={styles.icon}>
			<div className={styledTheme.icon}>
				<IcMArrowDown
					height={15}
					width={15}
					onClick={() => setShow((prev) => !prev)}
					style={{ rotate: show ? '180deg' : '0deg' }}
				/>
			</div> */}
		</div>
	);
}

export default SelectedOrgInfo;
