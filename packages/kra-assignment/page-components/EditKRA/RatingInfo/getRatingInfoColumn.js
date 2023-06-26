import { startCase } from '@cogoport/utils';

function getRatingInfoColumn() {
	return [
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
}

export default getRatingInfoColumn;
