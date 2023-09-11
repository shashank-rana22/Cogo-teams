import React from 'react';

import { statutoryInfo } from '../../../utils/info';
import { otherStatuoryInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';

function StatutoryDetails() {
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
					<DetailsCard heading={info.heading} details={info.details} />
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} />
		</div>
	);
}

export default StatutoryDetails;
