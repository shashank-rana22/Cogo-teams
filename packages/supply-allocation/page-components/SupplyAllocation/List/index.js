import { Button } from '@cogoport/components';
import { IcMArrowRight, IcMPortArrow } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import StyledTable from '../../../commons/StyledTable';

import styles from './styles.module.css';

function List({ data = [] }) {
	const router = useRouter();

	const columns = [
		{
			id       : 'origin',
			Header   : 'ORIGIN',
			accessor : ({ origin_location }) => (
				<div>
					{ origin_location?.display_name}

				</div>
			),
		},
		{

			id       : 'icon',
			Header   : <IcMPortArrow width={30} height={30} />,
			accessor : () => <IcMPortArrow width={30} height={30} />,

		},
		{
			id       : 'destination',
			Header   : 'DESTINATION',
			accessor : ({ destination_location }) => (
				<div>{ destination_location?.display_name}</div>
			),
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
					View
					<IcMArrowRight />
				</Button>
			),
		},
	];

	return (
		<div className={styles.container}>
			<StyledTable data={data?.list} columns={columns} />
		</div>
	);
}

export default List;
