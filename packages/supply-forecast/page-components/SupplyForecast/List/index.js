import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

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

function List() {
	const router = useRouter();

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
				<Button onClick={() => {
					router.push('/supply-forecast/view');
				}}
				>
					View

				</Button>
			),
		},
	];

	return (
		<div className={styles.container}>

			<StyledTable
				data={data}
				columns={columns}
			/>

		</div>
	);
}
export default List;
