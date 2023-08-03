const percentileColumns = [
	{
		Header   : 'PERCENTILE RANGE',
		accessor : ({ lower_limit = 0, upper_limit = 0 }) => (
			<section>
				{lower_limit}
				-
				{upper_limit}
			</section>
		),
	},
	{
		Header   : 'BIAS SCORE',
		accessor : ({ score = 0 }) => (
			<section>
				{score}
			</section>
		),
	},
];

export default percentileColumns;
