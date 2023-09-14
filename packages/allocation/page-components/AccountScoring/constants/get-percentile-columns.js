const getPercentileColumns = ({ t = () => {} }) => [
	{
		Header   : t('allocation:percentile_range'),
		accessor : ({ lower_limit = 0, upper_limit = 0 }) => (
			<section>
				{lower_limit}
				-
				{upper_limit}
			</section>
		),
	},
	{
		Header   : t('allocation:bias_score'),
		accessor : ({ score = 0 }) => (
			<section>
				{score}
			</section>
		),
	},
];

export default getPercentileColumns;
