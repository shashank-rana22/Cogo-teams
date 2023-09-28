import { Pill, cl } from '@cogoport/components';
import { IcMTick, IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty, pascalCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

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

function AllStakeHolderTimeline({ timeline = [] }) {
	const stakeHolders = timeline?.filter((item) => !isEmpty(item));
	const { t } = useTranslation(['incidentManagement']);
	const [showTimeline, setShowTimeline] = useState(true);
	return (
		<div>
			<div className={styles.heading}>

				<h3>{t('incidentManagement:approval')}</h3>
				<div className={styles.red_line} />

			</div>

			<div className={styles.container}>
				{(stakeHolders || []).map((item, index) => {
					let flag = false;
					if (item?.status === 'REQUESTED BY') {
						flag = true;
					}
					const isStakeholderActive = !index
					|| ['APPROVED', 'REQUESTED BY'].includes(stakeHolders[index - FIRST]?.status);
					return (
						<div
							className={cl`${index < stakeHolders.length - FIRST
								? styles.section : styles.lastContainer}
							 ${!isStakeholderActive ? styles.faded_text : ''}`}
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
										${stakeHolders[index]?.status === 'REQUESTED BY'
											? styles.approved_bg : ''} 
											${stakeHolders[index]?.status === 'PENDING' ? styles.faded_bg : ''}
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
												: pascalCase(item?.status) || t('incidentManagement:pending_status')}
										</Pill>
									</div>
								</div>
								{item?.email || ''}
								{ showTimeline && item?.remarks && (
									<div className={styles.remark_section}>
										<div className={styles.remark_heading}>{t('incidentManagement:remarks')}</div>
										<div className={styles.remarks_text}>
											{item?.remarks || '' }

										</div>
									</div>
								)}
							</div>

						</div>
					);
				})}
				{showTimeline ? (
					<IcMArrowRotateUp
						width={15}
						height={15}
						onClick={() => setShowTimeline(!showTimeline)}
						className={styles.arrow}
					/>
				) : (
					<IcMArrowRotateDown
						width={15}
						height={15}
						onClick={() => setShowTimeline(!showTimeline)}
						className={styles.arrow}
					/>
				)}
			</div>
		</div>
	);
}

export default AllStakeHolderTimeline;
