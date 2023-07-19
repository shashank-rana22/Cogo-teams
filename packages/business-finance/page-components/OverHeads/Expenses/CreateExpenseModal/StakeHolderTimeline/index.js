import React from 'react';

import styles from './styles.module.css';

const FIRST = 1;

function StakeHolderTimeline({ timeline = [] }) {
	return (
		<div className={styles.container}>
			{timeline.map((item, index) => (
				<div className={styles.section} key={item.key}>
					<div className={styles.inner_div}>
						<div className={styles.circle}>{index + FIRST}</div>
						{index < timeline.length - FIRST ? (
							<div
								className={styles.line}
							/>
						) : null}
					</div>

					<div
						className={styles.faded_text}
					>
						{item.name}
					</div>
					<div
						className={styles.faded_text}
					>
						{item?.email}
					</div>
					<div
						className={styles.faded_text}
					>
						{item?.remarks}
					</div>
				</div>
			))}
		</div>
	);
}

export default StakeHolderTimeline;
