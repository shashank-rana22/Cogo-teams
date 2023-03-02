import React from 'react';

import LoaderIntelligence from '../LoaderIntelligence';

import styles from './styles.module.css';

// const Data = [
// 	'Your chat reply time was 2min slower than your peers',
// 	'Work on reaching out to more customers ',
// ];

function Intelligence({ loading = false }) {
	return (
		<div className={styles.container}>
			<div className={styles.improvement}>
				Improvements:
			</div>
			<div className={styles.box}>
				<div className={styles.improvement_text_box}>
					{
						loading
							? <LoaderIntelligence />
							: (
								<>
									<div className={styles.dot} />
									<div className={styles.improvement_text}>
										Your chat reply time was
										{/* <span className={styles.time_durations_value}>
											{(data[item] || 0) >= 60 ? ((data[item] || 0) / 60).toFixed(2)
    						   : (data[item] || 0)}
										</span>
										<span>{(data[itemKey] || 0) >= 60 ? 'hr' : 'min'}</span> */}
										{' 12 min '}
										slower than your peers
									</div>

								</>

							)
					}
				</div>
				<div className={styles.improvement_text_box}>
					<div className={styles.dot} />
					<div className={styles.improvement_text}>Work on reaching out to more customers</div>
				</div>
			</div>
		</div>
	);
}

export default Intelligence;
