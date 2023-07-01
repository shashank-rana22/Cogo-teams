import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function SelectedOrgInfo({ orgName = '', userName = '', platformTheme = 'light', loading = false }) {
	const styledTheme = {
		container : `${styles.container} ${styles[platformTheme]}`,
		org_name  : `${styles.org_name} ${styles[platformTheme]} `,
		user_name : `${styles.user_name} ${styles[platformTheme]} `,
	};

	if (loading) {
		return (
			<div className={styledTheme.container}>
				<Placeholder height="25px" width="150px" margin="0px 0px 6px 0px" />
				<Placeholder height="25px" width="100px" />
			</div>
		);
	}

	return (
		<div className={styledTheme.container}>
			<div className={styledTheme.org_name}>{orgName || ''}</div>

			<div className={styledTheme.user_name}>{userName || ''}</div>

		</div>
	);
}

export default SelectedOrgInfo;
