import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function HeaderCompoment({
	setSerialId = () => {}, setFilter = () => {},
	setShowWeekData = () => {},
}) {
	const handleClick = () => {
		setFilter({
			service           : 'fcl_freight',
			status            : 'pending',
			releventToMeValue : true,
			page              : 1,
			daily_stats       : true,
			assign_to_id      : '',
			rates             : '',
			value             : '',
			revert            : '',
			opt               : '',
		});
		setSerialId('');
		setShowWeekData(false);
	};
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className={styles.title}>Apply Filter</div>
				<div className={styles.desc}>(These filters will be applied throughout the page)</div>
			</div>
			<div className={styles.button}>
				<Button
					size="sm"
					onClick={handleClick}
				>
					Reset All
				</Button>
			</div>
		</div>
	);
}

export default HeaderCompoment;
