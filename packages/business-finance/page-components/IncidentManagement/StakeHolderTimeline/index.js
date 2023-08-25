import { Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const FIRST = 1;

function StakeHolderTimeline({ timeline = [] }) {
	const stakeHolders = timeline?.filter((item) => !isEmpty(item));
	return (
		<div style={{ marginTop: '28px' }}>
			<h3>Approval</h3>
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

						<div>
							{item?.name || '-'}
						</div>
						<div style={{ display: 'flex' }}>
							<div>
								{item?.email || '-'}
							</div>
							<div
								className={styles.status}
							>
								{item?.status || 'PENDING'}
							</div>
						</div>

						<div className={styles.popover_section}>
							<Popover placement="bottom" render={item?.remarks || 'No remarks'}>
								<span>Remarks</span>
							</Popover>
						</div>

					</div>
				))}
			</div>
		</div>
	);
}

export default StakeHolderTimeline;
