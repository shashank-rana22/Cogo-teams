import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function index() {
	return (
		<div className={styles.container}>
			<div>
				<p style={{ fontSize: '18px' }}>
					Current Configuration :&nbsp;
					<b>Version 2</b>
				</p>
				<div className={styles.left_container}>
					<p style={{ fontSize: '14px', marginRight: '34px' }}>
						Published on :&nbsp;
						<b>31st January, 2023</b>
					</p>
					<p style={{ fontSize: '14px' }}>
						Published by :&nbsp;
						<b>CogoParth</b>
					</p>
				</div>
			</div>
			<div className={styles.button_container}>
				<Button size="md" themeType="secondary" className={styles.button}>View Badges</Button>
				<Button size="md" themeType="secondary" className={styles.button}>View Events</Button>
				<Button size="md" themeType="secondary" className={styles.button}>View All Configs</Button>
				<Button size="md" themeType="primary" className={styles.button}>Configure Now</Button>
			</div>
		</div>
	);
}

export default index;
