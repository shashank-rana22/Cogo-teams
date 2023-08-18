import { Loader } from '@cogoport/components';
import React from 'react';

import styles from '../../styles.module.css';

function Body({
	loading,
	contentLoader,
}) {
	if (loading || contentLoader) {
		return (
			<>
				<div className={styles.loader_container}>
					<Loader style={{ height: 64, width: 64 }} themeType="primary" />
					<div className={styles.loading_text}>
						Loading...
					</div>
				</div>
				<div className={styles.info_text}>
					Please wait while we Generate the list of KAMs applicable for this Objective
				</div>
			</>
		);
	}

	return (
		<>
			<div className={styles.loader_container}>
				<div className={styles.loading_text}>
					Your list is being generated
				</div>
			</div>
			<div className={styles.info_text}>
				A list of KAMs is being generated on the basis of this
				Objective. Click on
				{' '}
				<b>‘View List’</b>
				{' '}
				in the table to view and download the list.
			</div>
		</>
	);
}

export default Body;
