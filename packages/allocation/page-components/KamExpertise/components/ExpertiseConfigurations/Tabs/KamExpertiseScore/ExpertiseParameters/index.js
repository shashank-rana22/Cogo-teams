import React from 'react';

const expertiseParametersControls = {
	customer_expertise: {
		re_activation: {
			name     : 're_activation',
			controls : [
				{
					name  : 'score_first_completion',
					type  : 'number',
					label : 'Score creadited on first completion',
				},
				{
					name  : 'score_repetition',
					type  : 'number',
					label : 'Score credited on repetition',
				},
				{
					name    : 'priority',
					type    : 'select',
					label   : 'Priority',
					options : [
						{ value: 'high', label: 'High' },
						{ value: 'medium', label: 'Medium' },
						{ value: 'low', label: 'Low' },
					],
				},

			],

		},
		enrichment: {
			name     : 'enrichment',
			controls : [
				{
					name  : 'score_first_completion',
					type  : 'number',
					label : 'Score on 25% completion',
				},
				{
					name  : 'score_repetition',
					type  : 'number',
					label : 'Score on 50% completion',
				},
				{
					name  : 'score_repetition',
					type  : 'number',
					label : 'Score on 75% completion',
				},
				{
					name  : 'score_repetition',
					type  : 'number',
					label : 'Score on 100% completion',
				},
				{
					name    : 'priority',
					type    : 'select',
					label   : 'Priority',
					options : [
						{ value: 'high', label: 'High' },
						{ value: 'medium', label: 'Medium' },
						{ value: 'low', label: 'Low' },
					],
				},

			],

		},
		persona: {
			name     : 'persona',
			controls : [
				{
					name  : 'score_first_completion',
					type  : 'number',
					label : 'Score creadited on first completion',
				},
				{
					name  : 'score_repetition',
					type  : 'number',
					label : 'Score credited on repetition',
				},
				{
					name    : 'priority',
					type    : 'select',
					label   : 'Priority',
					options : [
						{ value: 'high', label: 'High' },
						{ value: 'medium', label: 'Medium' },
						{ value: 'low', label: 'Low' },
					],
				},

			],

		},

	},

};

function ExpertiseParameters({ expertiseData }) {
	console.log('expertiseData', expertiseData);
	return (
		<div>ExpertiseParameters</div>
	);
}

export default ExpertiseParameters;
