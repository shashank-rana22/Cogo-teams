import React from 'react';

import NotInOffice from './NotInOffice';
import styles from './styles.module.css';
import TimeSummary from './TimeSummary';

function YourBoard() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				YOUR BOARD
			</div>
			<div className={styles.sub_heading}>
				At a glance view of important stuff
			</div>
			<TimeSummary />
			<NotInOffice />
		</div>
	);
}

export default YourBoard;
