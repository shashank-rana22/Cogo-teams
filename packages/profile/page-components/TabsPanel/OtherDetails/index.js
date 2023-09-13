import React from 'react';

import { otherInfo } from '../../../utils/info';
import { otherDocumentsInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';

function OtherDetails({ data = {}, loading = false }) {
	const info = otherInfo;
	const otherInformation = otherDocumentsInfo;

	return (
		<div className={styles.tab_content}>

			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>OTHER DETAILS</span>
					<span className={styles.detail}>View and manage employee details</span>
				</div>
				<div className={styles.info_container}>
					<DetailsCard heading={info.heading} details={info.details} data={data} loading={loading} />
				</div>
			</div>
			<RightGlance otherInfo={otherInformation} data={data} loading={loading} />
		</div>
	);
}

export default OtherDetails;
