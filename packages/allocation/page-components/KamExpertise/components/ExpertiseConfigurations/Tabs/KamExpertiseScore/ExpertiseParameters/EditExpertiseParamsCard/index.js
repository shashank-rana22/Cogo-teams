import React from 'react';

import CardItem from './CardItem';
import styles from './styles.module.css';

const dummyData = [
	{
		customer_expertise: [
			{
				name     : 're_activation',
				controls : [
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
			{
				name     : 'enrichment',
				controls : [
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
			{
				name     : 'persona',
				controls : [
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
			{
				name     : 'conversion',
				controls : [
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
			{
				name     : 'conversion_time',
				controls : [
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
			{
				name     : 'retention',
				controls : [
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
			{
				name     : 'collection',
				controls : [
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
			{
				name     : 'wallet_share_increase',
				controls : [
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
			{
				name     : 'industry',
				controls : [
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
			{
				name     : 'country',
				controls : [
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
			{
				name     : 'churn',
				controls : [
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
	{
		// trade_expertise: [
		// 	{
		// 		name     : 'trade_type',
		// 		controls : [

		// 			{
		// 				name          : 'trade_type_drop',
		// 				current_value : 'import',
		// 			},
		// 			{
		// 				name          : 'score_added_first_import',
		// 				current_value : 200,
		// 			},
		// 			{
		// 				name          : 'score_added_subsequent_import',
		// 				current_value : 200,
		// 			},
		// 			{
		// 				name          : 'priority',
		// 				current_value : 'high',
		// 			},

		// 		],

		// 	},
		// 	{
		// 		name     : 'shipment_mode',
		// 		controls : [

		// 			{
		// 				name          : 'shipment_mode_drop',
		// 				current_value : 'ocean',
		// 			},
		// 			{
		// 				name          : 'score_added_first_completion',
		// 				current_value : 200,
		// 			},
		// 			{
		// 				name          : 'score_added_shipment_repetition',
		// 				current_value : 200,
		// 			},
		// 			{
		// 				name          : 'priority',
		// 				current_value : 'high',
		// 			},

		// 		],

		// 	},
		// 	{
		// 		name     : 'shipment_type',
		// 		controls : [

		// 			{
		// 				name          : 'shipment_type_drop',
		// 				current_value : 'fcl',
		// 			},
		// 			{
		// 				name          : 'score_first_completion_shipment_type',
		// 				current_value : 200,
		// 			},
		// 			{
		// 				name          : 'score_shipment_type_repetition',
		// 				current_value : 200,
		// 			},
		// 			{
		// 				name          : 'priority',
		// 				current_value : 'high',
		// 			},

		// 		],

		// 	},
		// 	{
		// 		name     : 'trade_lanes',
		// 		controls : [

		// 			{
		// 				name          : 'score_added_each_unique_lane',
		// 				current_value : 200,
		// 			},
		// 			{
		// 				name          : 'score_added_trade_lane_repetition',
		// 				current_value : 200,
		// 			},
		// 			{
		// 				name          : 'priority',
		// 				current_value : 'high',
		// 			},

		// 		],

		// 	},
		// 	{
		// 		name     : 'freight_control',
		// 		controls : [
		// 			{
		// 				name          : 'score_controlled_shipment',
		// 				current_value : 300,
		// 			},
		// 			{
		// 				name          : 'score_freight_control_repetition',
		// 				current_value : 200,
		// 			},
		// 			{
		// 				name          : 'priority',
		// 				current_value : 'high',
		// 			},

		// 		],

		// 	},
		// 	{
		// 		name     : 'value_added_service',
		// 		controls : [
		// 			{
		// 				name          : 'score_value_added_service',
		// 				current_value : 300,
		// 			},
		// 			{
		// 				name          : 'score_value_added_service_repetition',
		// 				current_value : 200,
		// 			},
		// 			{
		// 				name          : 'priority',
		// 				current_value : 'high',
		// 			},

		// 		],

		// 	},

		// ],
		trade_expertise: [
			{
				name   : 'trade_type',
				extras : [

					{
						type     : 'ocean',
						controls : [
							// {
							// 	extra_name    : 'trade_type_ocean',
							// 	current_value : 200,
							// },
							{
								extra_name    : 'score_added_first_completion',
								current_value : 200,
							},
							{
								extra_name    : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								extra_name    : 'priority',
								current_value : 'high',
							},
						],
					},
					{
						type     : 'air',
						controls : [
							{
								extra_name    : 'score_added_first_completion',
								current_value : 200,
							},
							{
								extra_name    : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								extra_name    : 'priority',
								current_value : 'high',
							}],
					},
					{
						type     : 'air',
						controls : [
							{
								extra_name    : 'score_added_first_completion',
								current_value : 200,
							},
							{
								extra_name    : 'score_added_shipment_repetition',
								current_value : 200,
							},
							{
								extra_name    : 'priority',
								current_value : 'high',
							}],
					},

				],

			},
			// {
			// 	name   : 'shipment_mode',
			// 	extras : [

			// 		{
			// 			type     : 'ocean',
			// 			controls : [
			// 				{
			// 					name          : 'score_added_first_completion',
			// 					current_value : 200,
			// 				},
			// 				{
			// 					name          : 'score_added_shipment_repetition',
			// 					current_value : 200,
			// 				},
			// 				{
			// 					name          : 'priority',
			// 					current_value : 'high',
			// 				}],
			// 		},
			// 		{
			// 			type     : 'air',
			// 			controls : [
			// 				{
			// 					name          : 'score_added_first_completion',
			// 					current_value : 200,
			// 				},
			// 				{
			// 					name          : 'score_added_shipment_repetition',
			// 					current_value : 200,
			// 				},
			// 				{
			// 					name          : 'priority',
			// 					current_value : 'high',
			// 				}],
			// 		},
			// 		{
			// 			type     : 'domestic',
			// 			controls : [
			// 				{
			// 					name          : 'score_added_first_completion',
			// 					current_value : 200,
			// 				},
			// 				{
			// 					name          : 'score_added_shipment_repetition',
			// 					current_value : 200,
			// 				},
			// 				{
			// 					name          : 'priority',
			// 					current_value : 'high',
			// 				}],
			// 		},

			// 	],

			// },
			// {
			// 	name     : 'shipment_mode',
			// 	controls : [

			// 		{
			// 			name          : 'shipment_mode_drop',
			// 			current_value : 'ocean',
			// 		},
			// 		{
			// 			name          : 'score_added_first_completion',
			// 			current_value : 200,
			// 		},
			// 		{
			// 			name          : 'score_added_shipment_repetition',
			// 			current_value : 200,
			// 		},
			// 		{
			// 			name          : 'priority',
			// 			current_value : 'high',
			// 		},

			// 	],

			// },
			// {
			// 	name     : 'shipment_type',
			// 	controls : [

			// 		{
			// 			name          : 'shipment_type_drop',
			// 			current_value : 'fcl',
			// 		},
			// 		{
			// 			name          : 'score_first_completion_shipment_type',
			// 			current_value : 200,
			// 		},
			// 		{
			// 			name          : 'score_shipment_type_repetition',
			// 			current_value : 200,
			// 		},
			// 		{
			// 			name          : 'priority',
			// 			current_value : 'high',
			// 		},

			// 	],

			// },
			// {
			// 	name     : 'trade_lanes',
			// 	controls : [

			// 		{
			// 			name          : 'score_added_each_unique_lane',
			// 			current_value : 200,
			// 		},
			// 		{
			// 			name          : 'score_added_trade_lane_repetition',
			// 			current_value : 200,
			// 		},
			// 		{
			// 			name          : 'priority',
			// 			current_value : 'high',
			// 		},

			// 	],

			// },
			// {
			// 	name     : 'freight_control',
			// 	controls : [
			// 		{
			// 			name          : 'score_controlled_shipment',
			// 			current_value : 300,
			// 		},
			// 		{
			// 			name          : 'score_freight_control_repetition',
			// 			current_value : 200,
			// 		},
			// 		{
			// 			name          : 'priority',
			// 			current_value : 'high',
			// 		},

			// 	],

			// },
			// {
			// 	name     : 'value_added_service',
			// 	controls : [
			// 		{
			// 			name          : 'score_value_added_service',
			// 			current_value : 300,
			// 		},
			// 		{
			// 			name          : 'score_value_added_service_repetition',
			// 			current_value : 200,
			// 		},
			// 		{
			// 			name          : 'priority',
			// 			current_value : 'high',
			// 		},

			// 	],

			// },

		],
	},
	{
		commodity_expertise: [
			{
				name     : 'reefer',
				controls : [
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
			{
				name     : 'hazardous',
				controls : [
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
			{
				name     : 'general',
				controls : [
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
	{
		misc_expertise: [
			{
				name     : 'language',
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
];

function EditExpertiseParamsCard({ expertiseData }) {
	const { name = '' } = expertiseData;

	const req = dummyData.find((element) => name in element);

	return (
		<div className={styles.card_container}>
			<div className={styles.cards}>
				{Object.values(req).map((res) => res.map((item) => <CardItem {...item} />))}
			</div>
		</div>
	);
}

export default EditExpertiseParamsCard;
