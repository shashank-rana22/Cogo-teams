import { Button, Pagination, Tooltip } from '@cogoport/components';
import { IcCBookmark, IcMArrowRight, IcMBookmark, IcMInfo, IcMPortArrow } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import StyledTable from '../../../commons/StyledTable';
import useUpdateRollingFclFreightSearch from '../../../hooks/useUpdateRollingFclFreightSearch';

import styles from './styles.module.css';

function List({
	data = [],
	pagination = 0,
	setPagination = () => {},
	loading = false,
	refetchListFclSearches = () => {},
}) {
	const { list = [], page_limit = 10, total_count = 0 } = data || {};

	const router = useRouter();
	const { updateRollingFclFreightSearch } = useUpdateRollingFclFreightSearch({ refetchListFclSearches });

	const columns = [
		{
			id       : 'origin',
			Header   : 'ORIGIN',
			accessor : ({ origin_location }) => (
				<div className={styles.origin_container}>
					<Tooltip
						content={(
							<div
								style={{ wordBreak: 'break-word' }}
							>
								Reallocation required due to a change in forecasted demand
							</div>
						)}
						placement="right"
					>
						<div className={styles.relative_container}>
							Attention Required!
							{' '}
							<IcMInfo height={8} width={8} style={{ marginLeft: '2px' }} />
						</div>
					</Tooltip>

					{origin_location.display_name}
				</div>
			),
		},
		{
			id       : 'icon',
			Header   : <IcMPortArrow width={20} height={20} />,
			accessor : () => <IcMPortArrow width={20} height={20} />,
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
			id     : 'percent_fulfillment',
			Header : (
				<div>
					% FULFILLMENT
					<div style={{ fontSize: '10px', fontWeight: '400' }}>
						{' '}
						(ON BEST RATE)
						{' '}
					</div>
				</div>
			),
			accessor: (item) => item.firstName,
		},
		{
			id       : 'forecasted_volume',
			Header   : 'FORECASTED VOLUME',
			accessor : (item) => item.firstName,
		},
		{
			id       : 'bookmark',
			Header   : '',
			accessor : (item) => {
				const { is_bookmarked = false } = item;
				return (
					<span
						role="presentation"
						style={{ cursor: 'pointer' }}
						onClick={() => {
							updateRollingFclFreightSearch({
								payload: {
									id            : item.id,
									is_bookmarked : !is_bookmarked,
								},
							});
						}}
					>
						{is_bookmarked ? <IcCBookmark /> : <IcMBookmark />}
					</span>
				);
			},
		},
		{
			id       : 'actions',
			Header   : '',
			accessor : (item) => (
				<Button
					themeType="secondary"
					onClick={() => {
						router.push(`/supply-allocation/view/${item.id}`);
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

			{total_count ? (
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
			) : null}
		</div>
	);
}

export default List;
