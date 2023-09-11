import React from 'react';

import { otherInfo } from '../../../utils/info';
import { otherOtherInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';

function OtherDetails({ data = {} }) {
	const info = otherInfo;
	const otherInformation = otherOtherInfo;

	return (
		<div className={styles.tab_content}>

			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>OTHER DETAILS</span>
					<span className={styles.detail}>View and manage employee details</span>
				</div>
				<div className={styles.info_container}>
					<DetailsCard heading={info.heading} details={info.details} data={data} />
				</div>
			</div>
			<RightGlance otherInfo={otherInformation} data={data} />
		</div>
	);
}

export default OtherDetails;
