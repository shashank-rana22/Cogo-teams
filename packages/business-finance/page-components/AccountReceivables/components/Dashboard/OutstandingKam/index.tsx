import { Tooltip, Table } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import EmptyState from '../../../../commons/EmptyStateDocs';
import { OutstandingKamColumn } from '../../../configs/OutstandingKamColumns';

import styles from './styles.module.css';

function OutStandingKam({ kamOutstandingData, kamOutstandingLoading }) {
	return (
		<div className={styles.container}>
			<div className={styles.styled_container}>
				<div
					className={styles.overall_outstanding_container}
				>
					<div
						className={styles.outstanding_container}
					>
						<div
							className={styles.styled_text}
						>
							Outstanding
						</div>

					</div>
					<div className={styles.styled_kam_text}>
						By KAM
						<Tooltip
							content="KAM outstanding amount and invoices."
							placement="top"
						>
							<div className={styles.icon}><IcMInfo /></div>
						</Tooltip>
					</div>

				</div>

			</div>
			<div style={{ padding: '20px', width: '74%' }}>

				<div className={styles.service_stats}>
					<div>
						<div className={styles.table}>
							<Table
								columns={OutstandingKamColumn}
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
