import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function InfoCard({ handleClose = () => {} }) {
	const onClick = (e) => {
		e.stopPropagation();
		handleClose();
	};

	return (
		<div className={styles.infoCard}>
			<IcMCross onClick={onClick} className={styles.close_icon} />
			<p>Number of rates appeared on spot search</p>
		</div>
	);
}

export default InfoCard;
