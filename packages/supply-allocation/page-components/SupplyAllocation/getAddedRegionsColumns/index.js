import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

const getAddedRegionsColumns = ({ source = '' }) => {
	const columns = [
		{
			id       : 'origin',
			Header   : 'ORIGIN',
			accessor : (item) => item.firstName,
		},
		{
			id       : 'DESITNATION',
			Header   : 'DESITNATION',
			accessor : (item) => item.lastName,
		},
		{
			id: 'avg_profitablity',

			Header   : 'AVG PROFITABLITY',
			accessor : (item) => item.lastName,
		},
		{
			id     : 'percent_fulfillemt',
			Header : `% FULFILLMENT
			(ON BEST RATE)`,
			accessor: (item) => item.lastName,
		},
		{
			id       : 'forecasted_volume',
			Header   : 'FORECASTED VOLUME',
			accessor : (item) => item.lastName,
		},
		{
			id       : 'actions',
			Header   : '',
			accessor : () => (
				<Button
					themeType="seceondary"
					// onClick={() => {
					// 	router.push('/supply-allocation/view');
					// }}
				>
					{source === 'add' ? 'Add to List ' : 'View'}

					{' '}
					<IcMArrowRight />

				</Button>
			),
		},
	];
	return columns;
};

export default getAddedRegionsColumns;
