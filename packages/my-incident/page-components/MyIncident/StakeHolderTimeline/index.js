import { Popover, Pill, cl } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const FIRST = 1;

const STATUS_COLOR_MAPPING = {
	PENDING        : '#fbd1a6',
	REJECTED       : '#f37166',
	APPROVED       : '#c4dc91',
	NOT_APPLICABLE : '#fef199',
	REQUESTED      : '#fbd1a6',
};

function StakeHolderTimeline({ timeline = [], isStatusPill = {} }) {
	const stakeHolders = timeline?.filter((item) => !isEmpty(item));
	return (
		<div>
			<div className={styles.heading}>
				<h3>Approval</h3>
				{isStatusPill?.display ? (
					<Pill
						size="md"
						style={{
							background: STATUS_COLOR_MAPPING[isStatusPill?.value || 'PENDING'],
						}}
						className={styles.status_pill}
					>
						{isStatusPill?.value || 'Pending'}
					</Pill>
				) : null}
			</div>

			<div className={styles.container}>
				{(stakeHolders || []).map((item, index) => {
					const isStakeholderActive = !index || stakeHolders[index - FIRST]?.status === 'APPROVED';
					return (
						<div
							className={cl`${styles.section} ${!isStakeholderActive ? styles.faded_text : ''}`}
							key={item?.key}
						>
							<div className={styles.inner_div}>
								{item?.status === 'APPROVED' ? (
									<div
										className={cl`${styles.circle} ${styles.approved_bg}`}
									>
										<IcMTick />
									</div>
								) : (
									<div
										className={cl`${styles.circle} 
										${!isStakeholderActive ? styles.faded_bg : styles.active_bg}`}
									>
										{index + FIRST}
									</div>
								)}

								{index < stakeHolders.length - FIRST ? (
									<div
										className={cl`${styles.line} 
										${item?.status === 'APPROVED' ? styles.approved_bg : styles.faded_bg}`}
									/>
								) : null}
							</div>

							{item?.name || '-'}

							<div className={styles.flex}>

								{item?.email || '-'}

								<Pill
									size="sm"
									style={{
										background: STATUS_COLOR_MAPPING[item?.status || 'PENDING'],
									}}
									className={styles.level_status_pill}
								>
									{item?.status || 'Pending'}
								</Pill>
							</div>

							<div className={styles.popover_section}>
								<Popover
									trigger="mouseenter"
									placement="bottom"
									render={item?.remarks || 'No Remarks'}
								>
									<span>Remarks</span>
								</Popover>
							</div>

						</div>
					);
				})}
			</div>
		</div>
	);
}

export default StakeHolderTimeline;
