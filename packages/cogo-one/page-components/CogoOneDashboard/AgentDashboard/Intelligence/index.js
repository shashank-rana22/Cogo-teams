import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const apiData = [
	'Your chat reply time was 2min slower than your peers',
	'Work on reaching out to more customers ',
	'Your chat reply time was 10 min slower than your peers',
	'Your chat reply time was 10 min slower than your peers',

];

function Intelligence({ loading = false }) {
	return (
		<div className={styles.container}>
			<div className={styles.improvement}>Improvements:</div>
			<div className={styles.box}>
				{
				apiData.map((item) => (
					<div className={styles.improvement_text_box}>
						<div><div className={styles.dot} /></div>
						{loading
							? <Placeholder height="40px" width="320px" />
							: <div className={styles.improvement_text}>{[item]}</div>}

					</div>
				))
			}
			</div>
		</div>
	);
}

export default Intelligence;
