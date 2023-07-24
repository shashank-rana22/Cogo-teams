import { startCase } from '@cogoport/utils';

const RATING_INFO_COLUMN = [
	{
		Header   : 'Achieved Value Range',
		accessor : (item) => (
			<div>
				{startCase(item?.value) || '-'}
			</div>
		),
	},
	{
		Header   : 'Rating',
		accessor : (item) => (
			<div>
				{startCase(item?.rating_value) || '-'}
			</div>
		),
	},

];

export default RATING_INFO_COLUMN;
