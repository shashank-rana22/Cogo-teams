import React from 'react';

import BlDoTimeLineItem from './BlDoTimeLineItem';
import styles from './styles.module.css';

function BlDoTimeline() {
	return (
		<div className={styles.div_container}>
			<div className={styles.container}>
				<BlDoTimeLineItem />
			</div>
		</div>
	);
}

export default BlDoTimeline;
