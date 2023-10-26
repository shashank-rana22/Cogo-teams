import { Pill, cl } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { isEmpty, pascalCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const FIRST = 1;
const STATUS_COLOR_MAPPING = {
	PENDING        : '#fef3e9',
	REJECTED       : '#f37166',
	APPROVED       : '#c4dc91',
	NOT_APPLICABLE : '#fef199',
	REQUESTED      : '#fbd1a6',
	'REQUESTED BY' : '#acdadf',
};

function StakeHolderTimeline({ timeline = [] }) {
	const stakeHolders = timeline?.filter((item) => !isEmpty(item));

	return (
		<div>
			<div className={styles.heading}>
				<div>Approval</div>

				<div className={styles.red_line} />
			</div>

			<div className={styles.container}>
				{(stakeHolders || []).map((item, index) => {
					let flag = false;
					if (item?.status === 'REQUESTED BY') {
						flag = true;
					}

					const isStakeholderActive = !index
						|| ['APPROVED', 'REQUESTED BY'].includes(stakeHolders?.[index - FIRST]?.status);

					return (
						<div
							className={!isStakeholderActive
								? cl`${styles.faded_text} ${styles.section}`
								: cl`${styles.section}`}
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
										${item?.status === 'REQUESTED BY'
											? styles.approved_bg : ''} 
											${item?.status === 'PENDING' ? styles.faded_bg : ''}
											${isStakeholderActive ? styles.active_bg : ''}`}
									>
										{index}
									</div>
								)}

								{index < stakeHolders.length - FIRST ? (
									<div
										className={cl`${styles.line} 
										${(item?.status === 'APPROVED' || item?.status === 'REQUESTED BY')
											? styles.approved_bg : styles.faded_bg}`}
									/>
								) : null}
							</div>

							<div>
								<div className={styles.flex}>
									<div className={styles.center_align}>
										<div className={styles.name_text}>
											{(item?.name || '')}
										</div>
										<Pill
											size="sm"
											style={{
												background: STATUS_COLOR_MAPPING[item?.status || 'PENDING'],
											}}
											className={styles.level_status_pill}
										>
											{flag ? 'Requested By'
												: pascalCase(item?.status) || 'Pending'}
										</Pill>
									</div>
								</div>

								{item?.email || ''}

								{ item?.remarks ? (
									<div className={styles.remark_section}>
										<div className={styles.remark_heading}>Remarks</div>
										<div className={styles.remarks_text}>
											{item.remarks || '' }
										</div>
									</div>
								) : null}
							</div>

						</div>
					);
				})}
			</div>
		</div>
	);
}

export default StakeHolderTimeline;
