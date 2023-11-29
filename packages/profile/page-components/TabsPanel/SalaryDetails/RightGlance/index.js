import React from 'react';

import styles from './styles.module.css';

function RightGlancePayment({ otherInfo = {}, data = {}, loading = false }) {
	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>
				<span className={styles.personal}>AT A GLANCE</span>
				<span className={styles.detail}>Some of the important details</span>
			</div>
			<div className={styles.info_subcontainer}>
				{
				loading ? null : otherInfo.map((item) => (
					<div key={item.label} className={styles.side_label_value}>
						<span className={styles.side_label}>{item.label}</span>
						{(item.value) !== 'tax_regime'
							? <span className={styles.side_value}>{`₹${data[item.value]}`}</span>
							: <span className={styles.side_value}>{`${data[item.value]}`}</span>}
					</div>
				))
			}
			</div>
		</div>
	);
}

export default RightGlancePayment;
