import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useMemo } from 'react';

import StyledTable from '../../../commons/StyledTable';

import styles from './styles.module.css';

const data = [
	{
		firstName : 'tandy',
		lastName  : 'miller',

	},
	{
		firstName : 'tandy',
		lastName  : 'miller',

	},
	{
		firstName : 'joe',
		lastName  : 'dirte',
	},
	{
		firstName : 'joe',
		lastName  : 'dirte',
	},
];

function List({ source = '' }) {
	const router = useRouter();

	const columns = useMemo(() => [
		{
			id       : 'origin',
			Header   : 'ORIGIN',
			accessor : (item) => item.firstName,
		},
		{
			id       : 'destination',
			Header   : 'DESTINATION',
			accessor : (item) => item.lastName,
		},
		{
			id       : 'avg_profitability',
			Header   : 'AVG PROFITABILITY',
			accessor : (item) => item.firstName,
		},
		{
			id       : 'percent_fulfillment',
			Header   : '% FULFILLMENT (ON BEST RATE)',
			accessor : (item) => item.firstName,
		},
		{
			id       : 'forecasted_volume',
			Header   : 'FORECASTED VOLUME',
			accessor : (item) => item.firstName,
		},
		{
			id       : 'actions',
			Header   : '',
			accessor : () => (
				<Button
					themeType="secondary"
					onClick={() => {
						router.push('/supply-allocation/view');
					}}
				>

					{source === 'add' ? 'Add to List' : 'View'}
					{' '}
					<IcMArrowRight />
				</Button>
			),
		},
	], [source, router]);

	return (
		<div className={styles.container}>
			<StyledTable data={data} columns={columns} />
		</div>
	);
}

export default List;
