import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function KamLevelDetailsShow({ data }) {
	const {
		expertise_details = [],
	} = data;

	// const SCORE_MAPPING = [
	// 	{
	// 		label : 'customer_expertise_score',
	// 		value : customer_expertise_score,
	// 	},
	// 	{
	// 		label : 'trade_expertise_score',
	// 		value : trade_expertise_score,
	// 	},
	// 	{
	// 		label : 'commodity_expertise_score',
	// 		value : commodity_expertise_score,
	// 	},
	// 	{
	// 		label : 'misc_expertise_score',
	// 		value : misc_expertise_score,
	// 	},
	// ];

	const TRANSACTION_MAPPING = [
		{
			label : 'minuimum_transacting_account',
			value : 'minimum_transacting_account',
		},
		{
			label : 'retained_account_count',
			value : 'retained_account_count',
		},
		{
			label : 'retained_account_min_duration',
			value : 'retained_account_min_duration',
		},
	];
	const expertiseObject = expertise_details.map((item) => item);
	return (
		<div className={styles.level_card_container}>

			{expertiseObject.map((item) => (
				<div>
					<div className={styles.row_level}>
						{startCase(item.expertise_type)}
						{' '}
						Score
					</div>
					<div style={{ marginLeft: '8px', opacity: '0.7' }}>Score</div>
					<div className={styles.score_value}>
						{item?.threshold_score || '-'}
					</div>
					<div style={{
						border     : '1px solid #BDBDBD',
						opacity    : '0.4',
						width      : '98%',
						marginLeft : '8px',

					}}
					/>

				</div>
			))}

			<div className={styles.row_level_end}>
				<h2>Transacting Account</h2>
				<div className={styles.row_level_end_options}>
					{TRANSACTION_MAPPING.map((item) => (
						<div style={{ width: '24%' }}>
							<div>{startCase(item.label)}</div>
							<div className={styles.score_value}>
								{/* {item.value} */}

							</div>

						</div>

					))}

				</div>

			</div>

		</div>

	);
}

export default KamLevelDetailsShow;
