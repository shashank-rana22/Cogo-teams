import { Placeholder, Tooltip } from '@cogoport/components';
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
			<Tooltip
				placement="top"
				className={styles.tooltip}
				content={<span className={styles.tooltip_content}>{orgName || ''}</span>}
			>
				<div className={styledTheme.org_name}>{orgName || ''}</div>
			</Tooltip>

			<Tooltip
				placement="top"
				className={styles.tooltip}
				content={<span className={styles.tooltip_content}>{userName || ''}</span>}
			>
				<div className={styledTheme.user_name}>{userName || ''}</div>
			</Tooltip>

		</div>
	);
}

export default SelectedOrgInfo;
