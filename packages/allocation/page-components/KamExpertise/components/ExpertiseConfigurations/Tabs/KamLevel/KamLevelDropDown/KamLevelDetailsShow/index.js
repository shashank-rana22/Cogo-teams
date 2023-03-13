import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function KamLevelDetailsShow({ data = {} }) {
	const transacting_accounts = data && data.list && data.list['Transacting Accounts'];
	const COLUMN_MAPPING = [
		{
			label: 'Customer Expertise',
		},
		{
			label: 'Trade Expertise',
		},
		{
			label: 'Commodity Expertise',
		},
		{
			label: 'x',
		},

	];
	const TRANSACTION_MAPPING = [
		{
			label: 'Minimum Transacting Accounts',
		},
		{
			label: 'Retained Account Count',
		},
		{
			label: 'Retained Account Min Duration',
		},
	];
	return (
		<div className={styles.level_card_container}>
			{COLUMN_MAPPING.map((item) => (
				<div>
					<div className={styles.row_level}>
						{startCase(item.label)}
						{' '}
						Score
					</div>
					<div style={{ marginLeft: '8px', opacity: '0.7' }}>Score</div>
					<div className={styles.score_value}>
						{data && data.list
						&& data.list[item.label]
						&& data.list[item.label][0]
						&& data.list[item.label][0].threshold_score
							? data.list[item.label][0].threshold_score : '-'}
					</div>
					<div className={styles.border_class} />
				</div>
			))}
			<div className={styles.row_level_end}>
				<h2>Transacting Account</h2>
				<div className={styles.row_level_end_options}>
					{TRANSACTION_MAPPING.map((item) => (
						<div style={{ width: '24%' }}>
							<div>{startCase(item.label)}</div>
							<div className={styles.score_value}>
								{transacting_accounts
									? transacting_accounts.find((account) => account.threshold_score_type
									=== item.label)?.threshold_score || '-' : '-'}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
export default KamLevelDetailsShow;
