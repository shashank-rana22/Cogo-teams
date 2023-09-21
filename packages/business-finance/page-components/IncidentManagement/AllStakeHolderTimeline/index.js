import { Pill, cl } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
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

function AllStakeHolderTimeline({ timeline = [] }) {
	const stakeHolders = timeline?.filter((item) => !isEmpty(item));
	const { t } = useTranslation(['incidentManagement']);
	return (
		<div>
			<div className={styles.heading}>

				<h3>{t('incidentManagement:approval')}</h3>
				<div className={styles.red_line} />

			</div>

			<div className={styles.container}>
				{(stakeHolders || []).map((item, index) => {
					const isStakeholderActive = !index
					|| ['APPROVED', 'REQUESTER'].includes(stakeHolders[index - FIRST]?.status);
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
										${stakeHolders[index]?.status === 'REQUESTER'
											? styles.approved_bg : ''} 
											${stakeHolders[index]?.status === 'PENDING' ? styles.faded_bg : ''}
											${isStakeholderActive ? styles.active_bg : ''}`}
									>
										{index}
									</div>
								)}

								{index < stakeHolders.length ? (
									<div
										className={cl`${styles.line} 
										${(item?.status === 'APPROVED' || item?.status === 'REQUESTER')
											? styles.approved_bg : styles.faded_bg}`}
									/>
								) : null}
							</div>
							<div className={styles.flex}>

								{item?.name || '-'}
								<Pill
									size="sm"
									style={{
										background: STATUS_COLOR_MAPPING[item?.status || 'PENDING'],
									}}
									className={styles.level_status_pill}
								>
									{item?.status || t('incidentManagement:pending_status')}
								</Pill>
							</div>
							{item?.email || '-'}

							<div className={styles.remark_section}>
								<div>{t('incidentManagement:remarks')}</div>
								<div className={styles.remarks_text}>
									{item?.remarks || t('incidentManagement:no_remarks') }
								</div>
							</div>

						</div>
					);
				})}
			</div>
		</div>
	);
}

export default AllStakeHolderTimeline;
