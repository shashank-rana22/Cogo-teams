import React from 'react';

import { personalInfo } from '../../../utils/info';
import { otherPersonalInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';

function PersonalDetails({ data = {}, loading = false }) {
	const info = personalInfo;
	const otherInfo = otherPersonalInfo;

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>
				<div className={styles.flex}>
					<div className={styles.heading}>
						<span className={styles.personal}>PERSONAL DETAILS</span>
						<span className={styles.detail}>View and manage employee details</span>
					</div>
				</div>
				<div className={styles.info_container}>
					{info.map(({ heading, details }) => (
						<DetailsCard heading={heading} details={details} data={data} loading={loading} key={heading} />
					))}
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} data={data} loading={loading} />
		</div>
	);
}

export default PersonalDetails;
