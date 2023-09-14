import { startCase } from '@cogoport/utils';

const distributionColumns = ({ t }) => [
	{
		Header   : t('allocation:distribution_columns_warmth'),
		accessor : ({ warmth = '' }) => (
			<section>
				{startCase(warmth)}
			</section>
		),
	},
	{
		Header   : t('allocation:distribution_columns_range'),
		accessor : ({ lower_limit = 0, upper_limit = 0 }) => (
			<section>
				{lower_limit}
				-
				{upper_limit}
			</section>
		),
	},
	{
		Header   : t('allocation:distribution_columns_current_number_of_accounts'),
		accessor : ({ warmth_count = 0 }) => (
			<section>
				{warmth_count}
			</section>
		),
	},
];

export default distributionColumns;
