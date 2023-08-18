const SELECT_OPERATOR_OPTIONS = [
	{
		name  : 'and',
		value : 'and',
		label : (
			<p>
				Do you want the Objective to consider both requirements together as
				{' '}
				<b>‘And’</b>
				{' '}
				options.
				In such a case, Leads confirming to both the requirements will only be considered.
			</p>
		),
	},
	{
		name  : 'or',
		value : 'or',
		label : (
			<p>
				Or as
				{' '}
				<b>‘Or’</b>
				{' '}
				options. In this case,
				Leads confirming to any of the mentioned requirements will be considered.
			</p>
		),
	},
];

export default SELECT_OPERATOR_OPTIONS;
