const biasColumns = [
	{
		Header   : 'AGE',
		accessor : ({ lower_limit = '', upper_limit = '' }) => (
			<section>
				{lower_limit}
				-
				{upper_limit}
			</section>
		),
	},
	{
		Header   : 'MULTIPLIER',
		accessor : ({ score = 0 }) => (
			<section>
				{score}
			</section>
		),
	},
];

export default biasColumns;
