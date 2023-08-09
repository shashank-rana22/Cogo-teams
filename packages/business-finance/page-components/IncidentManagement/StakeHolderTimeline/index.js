import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const FIRST = 1;

function StakeHolderTimeline({ timeline = [] }) {
	const stakeHolders = timeline?.filter((item) => !isEmpty(item));
	return (
		<div className={styles.container}>
			{(stakeHolders || []).map((item, index) => (
				<div className={styles.section} key={item.key}>
					<div className={styles.inner_div}>
						<div className={styles.circle}>{index + FIRST}</div>
						{index < stakeHolders.length - FIRST ? (
							<div
								className={styles.line}
							/>
						) : null}
					</div>

					<div
						className={styles.faded_text}
					>
						{item?.name || '-'}
					</div>
					<div
						className={styles.faded_text}
					>
						{item?.email || '-'}
					</div>
					<div
						className={styles.faded_text}
					>
						{item?.remarks || ' '}
					</div>
					<div
						className={styles.status}
					>
						{item?.status || 'PENDING'}
					</div>
				</div>
			))}
		</div>
	);
}

export default StakeHolderTimeline;
