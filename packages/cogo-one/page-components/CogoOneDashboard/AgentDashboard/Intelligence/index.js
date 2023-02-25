import React from 'react';

import LoaderIntelligence from '../LoaderIntelligence';

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

						{loading
							? <LoaderIntelligence />
							: (
								<>
									<div className={styles.dot} />
									<div className={styles.improvement_text}>{[item]}</div>
								</>
							)}

					</div>
				))
			}
			</div>
		</div>
	);
}

export default Intelligence;
