import CardItem from './CardItem';
import styles from './styles.module.css';

const dummyData = [
	{
		customer_expertise: [
			{
				id             : 'kiuhg',
				expertise_type : 'cust ex',
				condition_name : 're_activation',
				data           : [
					{
						name       : 're_activation',
						attributes : [
							{
								name          : 'score_first_completion',
								current_value : 300,
							},
							{
								name          : 'score_repetition',
								current_value : 300,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
				],
			},
			{
				id             : 'kiuhg',
				expertise_type : 'cust ex',
				condition_name : 'enrichment',
				data           : [
					{
						name       : 'enrichment',
						attributes : [
							{
								name          : 'score_upto_twenty_five_percent',
								current_value : 300,
							},
							{
								name          : 'score_upto_fifty_percent',
								current_value : 300,
							},
							{
								name          : 'score_upto_seventy_five_percent',
								current_value : 300,
							},
							{
								name          : 'score_upto_hundred_percent',
								current_value : 300,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},

						],
					},
				],
			},
			{
				id             : 'kiuhg',
				expertise_type : 'cust ex',
				condition_name : 'persona',
				data           : [
					{
						name       : 'persona',
						attributes : [
							{
								name          : 'score_first_completion',
								current_value : 300,
							},
							{
								name          : 'score_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
				],
			},
			{
				id             : 'kiuhg',
				expertise_type : 'cust ex',
				condition_name : 'conversion',
				data           : [
					{
						name       : 'conversion',
						attributes : [
							{
								name          : 'score_first_completion',
								current_value : 300,
							},
							{
								name          : 'score_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},

						],
					},
				],
			},
			{
				id             : 'kiuhg',
				expertise_type : 'cust ex',
				condition_name : 'conversion_time',
				data           : [
					{
						name       : 'conversion_time',
						attributes : [
							{
								name          : 'score_upto_three_days',
								current_value : 300,
							},
							{
								name          : 'score_from_three_to_seven_days',
								current_value : 200,
							},
							{
								name          : 'score_from_seven_to_fifteen_days',
								current_value : 200,
							},
							{
								name          : 'score_greater_fifteen_days',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},

						],
					},
				],

			},
			{
				id             : 'kiuhg',
				expertise_type : 'cust ex',
				condition_name : 'retention',
				data           : [
					{
						name       : 'retention',
						attributes : [
							{
								name          : 'score_each_retained_acc_per_month',
								current_value : 300,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},

						],
					},
				],
			},
			{
				id             : 'kiuhg',
				expertise_type : 'cust ex',
				condition_name : 'collection',
				data           : [
					{
						name       : 'collection',
						attributes : [
							{
								name          : 'before_overdue',
								current_value : 300,
							},
							{
								name          : 'score_upto_three_days',
								current_value : 300,
							},
							{
								name          : 'score_from_three_to_ten_days',
								current_value : 200,
							},
							{
								name          : 'score_greater_fifteen_days',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},

				],
			},
			{
				id             : 'kiuhg',
				expertise_type : 'cust ex',
				condition_name : 'wallet_share_increase',
				data           : [
					{
						name       : 'wallet_share_increase',
						attributes : [
							{
								name          : 'wallet_share_75_to_100',
								current_value : 300,
							},
							{
								name          : 'wallet_share_50_to_75',
								current_value : 300,
							},
							{
								name          : 'wallet_share_25_to_50',
								current_value : 200,
							},
							{
								name          : 'wallet_share_0_to_25',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},

						],

					},
				],
			},
			{
				id             : 'kiuhg',
				expertise_type : 'cust ex',
				condition_name : 'industry',
				data           : [
					{
						name       : 'industry',
						attributes : [
							{
								name          : 'score_new_account_new_industry',
								current_value : 300,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},

						],
					},

				],
			},
			{
				id             : 'kiuhg',
				expertise_type : 'cust ex',
				condition_name : 'country',
				data           : [
					{
						name       : 'country',
						attributes : [
							{
								name          : 'score_new_account_in_new_country',
								current_value : 300,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
				],
			},
			{
				id             : 'kiuhg',
				expertise_type : 'cust ex',
				condition_name : 'churn',
				data           : [
					{
						name       : 'churn',
						attributes : [
							{
								name          : 'score_deducted_on_each_churn',
								current_value : 300,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
				],
			},
		],
	},
	{
		trade_expertise: [
			{
				id             : 'sghfh',
				expertise_type : 'trade_expertise',
				condition_name : 'trade_type',
				data           : [
					{
						name       : 'import',
						attributes : [
							{
								name          : 'score_added_first_import',
								current_value : 200,
							},
							{
								name          : 'score_added_subsequent_import',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
					{
						name       : 'export',
						attributes : [
							{
								name          : 'score_added_first_export',
								current_value : 200,
							},
							{
								name          : 'score_added_subsequent_export',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
					{
						name       : 'domestic',
						attributes : [
							{
								name          : 'score_added_first_domestic',
								current_value : 200,
							},
							{
								name          : 'score_added_subsequent_domestic',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
				],
			},
			{
				id             : 'sghfh',
				expertise_type : 'trade_expertise',
				condition_name : 'shipment_mode',
				data           : [
					{
						name       : 'ocean',
						attributes : [
							{
								name          : 'score_added_first_completion',
								current_value : 200,
							},
							{
								name          : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
					{
						name       : 'air',
						attributes : [
							{
								name          : 'score_added_first_completion',
								current_value : 200,
							},
							{
								name          : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
					{
						name       : 'surface',
						attributes : [
							{
								name          : 'score_added_first_completion',
								current_value : 200,
							},
							{
								name          : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
				],
			},
			{
				id             : 'sghfh',
				expertise_type : 'trade_expertise',
				condition_name : 'shipment_type',
				data           : [
					{
						name       : 'fcl',
						attributes : [
							{
								name          : 'score_added_first_completion',
								current_value : 200,
							},
							{
								name          : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
					{
						name       : 'lcl',
						attributes : [
							{
								name          : 'score_added_first_completion',
								current_value : 200,
							},
							{
								name          : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
					{
						name       : 'air_domestic',
						attributes : [
							{
								name          : 'score_added_first_completion',
								current_value : 200,
							},
							{
								name          : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
					{
						name       : 'air_international',
						attributes : [
							{
								name          : 'score_added_first_completion',
								current_value : 200,
							},
							{
								name          : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
					{
						name       : 'ftl',
						attributes : [
							{
								name          : 'score_added_first_completion',
								current_value : 200,
							},
							{
								name          : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
					{
						name       : 'ltl',
						attributes : [
							{
								name          : 'score_added_first_completion',
								current_value : 200,
							},
							{
								name          : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
					{
						name       : 'rail_domestic',
						attributes : [
							{
								name          : 'score_added_first_completion',
								current_value : 200,
							},
							{
								name          : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
					{
						name       : 'haulage',
						attributes : [
							{
								name          : 'score_added_first_completion',
								current_value : 200,
							},
							{
								name          : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
				],
			},
			{
				id             : 'sghfh',
				expertise_type : 'trade_expertise',
				condition_name : 'trade_lanes',
				data           : [
					{
						name       : 'trade_lanes',
						attributes : [

							{
								name          : 'score_added_each_unique_lane',
								current_value : 200,
							},
							{
								name          : 'score_added_trade_lane_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
				],
			},
			{
				id             : 'sghfh',
				expertise_type : 'trade_expertise',
				condition_name : 'freight_control',
				data           : [
					{
						name       : 'freight_control',
						attributes : [
							{
								name          : 'score_controlled_shipment',
								current_value : 300,
							},
							{
								name          : 'score_freight_control_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
				],
			},
			{
				id             : 'sghfh',
				expertise_type : 'trade_expertise',
				condition_name : 'value_added_service',
				data           : [
					{
						name       : 'value_added_service',
						attributes : [
							{
								name          : 'score_value_added_service',
								current_value : 300,
							},
							{
								name          : 'score_value_added_service_repetition',
								current_value : 200,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],

					},
				],
			},

		],
	},
	{
		commodity_expertise: [
			{
				id             : 'iuuhkhg',
				expertise_type : 'commodity_expertise',
				condition_name : 'reefer',
				data           : [
					{
						name       : 'reefer',
						attributes : [
							{
								name          : 'score_first_completion_reefer',
								current_value : 100,
							},
							{
								name          : 'score_repetition_reefer',
								current_value : 50,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
				],
			},
			{
				id             : 'iuuhkhg',
				expertise_type : 'commodity_expertise',
				condition_name : 'hazardous',
				data           : [
					{
						name       : 'hazardous',
						attributes : [
							{
								name          : 'score_first_completion',
								current_value : 100,
							},
							{
								name          : 'score_repetition',
								current_value : 50,
							},
							{
								name          : 'priority',
								current_value : 'medium',
							},
						],
					},

				],
			},
			{
				id             : 'iuuhkhg',
				expertise_type : 'commodity_expertise',
				condition_name : 'general',
				data           : [
					{
						name       : 'general',
						attributes : [
							{
								name          : 'score_first_completion',
								current_value : 100,
							},
							{
								name          : 'priority',
								current_value : 'low',
							},
						],
					},
				],

			},
		],
	},
	{
		misc_expertise: [
			{
				id             : 'rfsih',
				expertise_type : 'misc_expertise',
				condition_name : 'language',
				data           : [
					{
						name     : 'language_expertise',
						controls : [
							{
								name          : 'score_once_uncommon_language',
								current_value : 100,
							},
							{
								name          : 'priority',
								current_value : 'high',
							},
						],
					},
				],
			},
		],
	},
];

function EditExpertiseParamsCard({ expertiseData }) {
	const { name = '' } = expertiseData;

	const req = dummyData.find((element) => name in element);

	return (
		<div className={styles.card_container}>
			<div className={styles.cards}>
				{/* {Object.values(req).map((res) => res.map((item) => <CardItem {...item} />))} */}

				{req[name].map((item) => <CardItem {...item} />)}
			</div>
		</div>
	);
}

export default EditExpertiseParamsCard;
