import React from 'react';

import { statutoryInfo } from '../../../utils/info';
import { otherStatuoryInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';

function StatutoryDetails({ loading = false }) {
	const info = statutoryInfo;
	const otherInfo = otherStatuoryInfo;

	return (
		<div className={styles.tab_content}>

			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>STATUTORY DETAILS</span>
					<span className={styles.detail}>View and manage employee details</span>
				</div>
				<div className={styles.info_container}>
					<DetailsCard heading={info.heading} details={info.details} loading={loading} />
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} loading={loading} />
		</div>
	);
}

export default StatutoryDetails;
