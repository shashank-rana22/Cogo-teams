import { startCase } from '@cogoport/utils';

const distributionColumns = [
	{
		Header   : 'WARMTH',
		accessor : ({ warmth = '' }) => (
			<section>
				{startCase(warmth)}
			</section>
		),
	},
	{
		Header   : 'RANGE',
		accessor : ({ lower_limit = 0, upper_limit = 0 }) => (
			<section>
				{lower_limit}
				-
				{upper_limit}
			</section>
		),
	},
	{
		Header   : 'CURRENT NUMBER OF ACCOUNTS',
		accessor : ({ numberOfAccounts = 0 }) => (
			<section>
				{numberOfAccounts}
			</section>
		),
	},
];

export default distributionColumns;
