import { Popover, Pill } from '@cogoport/components';
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

function StakeHolderTimeline({ timeline = [], isStatusPill = {} }) {
	const stakeHolders = timeline?.filter((item) => !isEmpty(item));
	const { t } = useTranslation(['incidentManagement']);
	return (
		<div>
			<div className={styles.heading}>
				<h3>{t('incidentManagement:approval')}</h3>
				{isStatusPill?.display ? (
					<Pill
						size="md"
						style={{
							background : STATUS_COLOR_MAPPING[isStatusPill?.value || 'PENDING'],
							marginLeft : '12px',
						}}
					>
						{isStatusPill?.value || t('incidentManagement:pending_status')}
					</Pill>
				) : null}
			</div>

			<div className={styles.container}>
				{(stakeHolders || []).map((item, index) => {
					const isStakeholderActive = !index || stakeHolders[index - FIRST]?.status === 'APPROVED';
					return (
						<div
							className={styles.section}
							key={item.key}
							style={!isStakeholderActive ? {
								color: '#bdbdbd',
							} : {}}
						>
							<div className={styles.inner_div}>
								{item.status === 'APPROVED' ? (
									<div
										className={styles.circle}
										style={{ background: '#F68B21' }}
									>
										<IcMTick />
									</div>
								) : (
									<div
										className={styles.circle}
										style={!isStakeholderActive ? {
											background: '#bdbdbd',
										} : {
											background: '#000',
										}}
									>
										{index + FIRST}
									</div>
								)}

								{index < stakeHolders.length - FIRST ? (
									<div
										className={styles.line}
										style={item.status === 'APPROVED' ? {
											background: '#F68B21',
										} : {
											background: '#bdbdbd',
										}}
									/>
								) : null}
							</div>

							{item?.name || '-'}

							<div style={{ display: 'flex' }}>

								{item?.email || '-'}

								<Pill
									size="sm"
									style={{
										background : STATUS_COLOR_MAPPING[item?.status || 'PENDING'],
										margin     : '0',
										marginLeft : '4px',
									}}
								>
									{item?.status || t('incidentManagement:pending_status')}
								</Pill>
							</div>

							<div className={styles.popover_section}>
								<Popover
									trigger="mouseenter"
									placement="bottom"
									render={item?.remarks || t('incidentManagement:no_remarks')}
								>
									<span>{t('incidentManagement:remarks')}</span>
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
