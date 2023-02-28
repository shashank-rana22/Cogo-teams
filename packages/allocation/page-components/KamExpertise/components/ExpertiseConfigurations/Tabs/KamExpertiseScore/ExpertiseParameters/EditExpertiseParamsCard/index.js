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

		],
	},
	{
		trade_expertise: [
			{
				name  : 'trade_type',
				extra : [
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
				],
			},
			{
				name     : 'freight_control',
				controls : [
					{
						name          : 'score_controlled_shipment',
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
				name     : 'trade_lanes',
				controls : [
					{
						name          : 'score_unique_lane',
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
		commodity_expertise: [
			{
				name     : 'reefer',
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
];

function EditExpertiseParamsCard({ expertiseData }) {
	const req = dummyData.find((element) => 'customer_expertise' in element);

	return (
		<div className={styles.card_container}>
			<div className={styles.cards}>
				{req?.customer_expertise?.map((item) => <CardItem {...item} />)}

			</div>
		</div>
	);
}

export default EditExpertiseParamsCard;
