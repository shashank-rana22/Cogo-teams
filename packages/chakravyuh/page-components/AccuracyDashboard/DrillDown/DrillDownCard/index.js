import { Button, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function DrillDownCard({ data = {}, isMainCard = false, delay = 2, handleClick = () => {}, animate = false }) {
	return (
		<div
			style={{ animationDelay: `${delay}s` }}
			className={cl`${styles.container} ${isMainCard ? styles.main_card : styles.secondary_card}
		 ${styles[data.parent]} ${animate ? styles.animate : ''}`}
		>
			<div className={styles.flex_between}>
				<p className={styles.card_name}>{startCase(data?.action_type)}</p>
				{isMainCard && <h3 className={styles.rate_amount}>{data?.rates_count}</h3>}
			</div>
			<div className={styles.flex_between}>
				<p className={styles.drop_off}>{data?.drop}</p>
				{isMainCard
					? <Button themeType="linkUi" onClick={() => handleClick(data.parent)}>View Dropoff</Button>
					: <h3 className={styles.rate_amount}>{data?.rates_count}</h3>}
			</div>
		</div>
	);
}

export default DrillDownCard;
