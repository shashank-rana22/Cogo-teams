import React from 'react';

import { happyIcon, neutralIcon, angryIcon } from '../../constants';

import styles from './styles.module.css';

function Statisfaction() {
	return (

		<div className={styles.statisfaction_box}>
			<div className={styles.heading}>User Satisfaction</div>
			<div className={styles.sub_section}>
				<div className={styles.icon_plus_number}>
					<div><img src={happyIcon} alt="Happy" /></div>
					<div className={styles.customers_numbers}>20</div>
				</div>
				<div className={styles.label}>Happy customers</div>
			</div>

			<div className={styles.sub_section}>
				<div className={styles.icon_plus_number}>
					<div><img src={neutralIcon} alt="Neutal" /></div>
					<div className={styles.customers_numbers}>20</div>
				</div>
				<div className={styles.label}>Neutral customers</div>
			</div>

			<div className={styles.sub_section}>
				<div className={styles.icon_plus_number}>
					<div><img src={angryIcon} alt="Angry" /></div>
					<div className={styles.customers_numbers}>20</div>
				</div>
				<div className={styles.label}>Angry customers</div>
			</div>
		</div>

	);
}

export default Statisfaction;
