import { Button, Pagination } from '@cogoport/components';
import { IcMArrowRight, IcMPortArrow } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import StyledTable from '../../../commons/StyledTable';

import styles from './styles.module.css';

function List({ data = [], pagination = 0, setPagination = () => {}, loading }) {
	const { list = [], page_limit = 10, total_count = 4 } = data;
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
				<div>{destination_location?.display_name}</div>
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
			accessor : (item) => (
				<Button
					themeType="secondary"
					onClick={() => {
						router.push(
							`/supply-allocation/view/${item.id}`,
						);
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

			<StyledTable data={list} columns={columns} loading={loading} />

			<div className={styles.pagination_container}>
				<Pagination
					className="md"
					totalItems={total_count}
					currentPage={pagination}
					pageSize={page_limit}
					onPageChange={setPagination}
					type="table"
				/>
			</div>

		</div>
	);
}

export default List;
