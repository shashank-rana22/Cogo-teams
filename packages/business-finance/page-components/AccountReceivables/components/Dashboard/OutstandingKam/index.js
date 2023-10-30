import { Tooltip, Table } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import EmptyState from '../../../commons/EmptyStateDocs';
import { outstandingKamColumn } from '../../../configs/OutstandingKamColumns';

import styles from './styles.module.css';

function OutStandingKam({ kamOutstandingData, kamOutstandingLoading, entityCode }) {
	const { t = () => '' } = useTranslation(['accountRecievables']);

	return (
		<div className={styles.container}>
			<div className={styles.styled_container}>
				<div
					className={styles.overall_outstanding_container}
				>
					<div
						className={styles.styled_text}
					>
						{t('outstanding_by_KAM')}
					</div>

					<div className={styles.styled_kam_text}>
						<Tooltip
							content={(
								<div className={styles.tooltip}>
									{t('outstanding_by_KAM_tooltip')}
								</div>
							)}
							placement="top"
						>
							<div className={styles.icon}><IcMInfo height="18px" width="18px" /></div>
						</Tooltip>
					</div>

				</div>

			</div>
			<div className={styles.table_width}>

				<div className={styles.service_stats}>
					<div>
						<div className={styles.table}>
							<Table
								columns={outstandingKamColumn({ entityCode, t })}
								data={kamOutstandingData || [{}]}
								loading={kamOutstandingLoading}
							/>

							{kamOutstandingData?.length === 0 && <EmptyState />}
						</div>
					</div>

				</div>
			</div>

		</div>
	);
}

export default OutStandingKam;
