import { Button, Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

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
		label: 'Misc Expertise',
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

function KamLevelDetailsShow({ data = {}, listLoading, setEditMode }) {
	const transacting_accounts = data?.list?.['Transacting Accounts'];

	return (
		<>
			<Button
				themeType="secondary"
				className={styles.delete_button}
				onClick={() => {
					setEditMode(true);
				}}
			>
				Edit
			</Button>
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
							{listLoading ? (<Placeholder height="30px" width="300px" />)
								: ((data?.list?.[item.label]?.[0].threshold_score)?.toLocaleString('en-IN') || '-')}

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
									{listLoading && <Placeholder height="30px" width="250" />}

									{transacting_accounts && !listLoading
									&& (transacting_accounts.find((account) => account.threshold_score_type
									=== item.label)?.threshold_score?.toLocaleString('en-IN') || '-')}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
export default KamLevelDetailsShow;
