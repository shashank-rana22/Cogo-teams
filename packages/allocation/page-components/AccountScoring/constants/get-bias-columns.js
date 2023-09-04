const getBiasColumns = ({ t = () => {} }) => [
	{
		Header   : t('allocation:age'),
		accessor : ({ lower_limit = '', upper_limit = '' }) => (
			<section>
				{lower_limit}
				-
				{upper_limit}
			</section>
		),
	},
	{
		Header   : t('allocation:multiplier'),
		accessor : ({ score = 0 }) => (
			<section>
				{score}
			</section>
		),
	},
];

export default getBiasColumns;
