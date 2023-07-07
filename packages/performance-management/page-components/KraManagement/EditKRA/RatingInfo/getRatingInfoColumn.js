import { startCase } from '@cogoport/utils';

const ratingInfoColumn = [
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

export default ratingInfoColumn;
