import { Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const FIRST = 1;

const STATUS_COLOR_MAPPING = {
	PENDING        : '#fbd1a6',
	REJECTED       : '#f37166',
	APPROVED       : '#c4dc91',
	NOT_APPLICABLE : '#fef199',
};

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
								style={{ background: STATUS_COLOR_MAPPING[item?.status] }}
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
