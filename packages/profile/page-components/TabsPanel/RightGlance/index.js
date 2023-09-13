import React from 'react';

import DetailsCard from '../DetailsCard';

import styles from './styles.module.css';

function RightGlance({ otherInfo = {}, data = {}, loading = false }) {
	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>
				<span className={styles.personal}>AT A GLANCE</span>
				<span className={styles.detail}>Some of the important details</span>
			</div>
			<div className={styles.info_container}>
				<DetailsCard details={otherInfo} isGrid={false} data={data} loading={loading} />
			</div>
		</div>
	);
}

export default RightGlance;
