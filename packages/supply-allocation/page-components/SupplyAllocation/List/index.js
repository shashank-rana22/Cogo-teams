import { Button, Pagination, Tooltip } from '@cogoport/components';
import {
	IcCBookmark,
	IcMArrowRight,
	IcMAscending,
	IcMBookmark,
	IcMDescendingSort,
	IcMInfo,
	IcMPortArrow,
	IcMDescending,
} from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';
import StyledTable from '../../../commons/StyledTable';
import useUpdateRollingFclFreightSearch from '../../../hooks/useUpdateRollingFclFreightSearch';
import styles from './styles.module.css';

const ICON_MAPPING = {
	default: <IcMDescendingSort fill="#bdbdbd" />,
	asc: <IcMAscending width={16} height={16} />,
	desc: <IcMDescending width={16} height={16} />,
};

const NEXT_STAGE_MAPPING = {
	default: 'asc',
	asc: 'desc',
	desc: 'default',
};

const KEY_STAGE_MAPPING = {
	default: undefined,
	asc: 'asc',
	desc: 'desc',
};

function List({
	data = [],
	pagination = 0,
	setPagination = () => {},
	loading = false,
	refetchListFclSearches = () => {},
	setFilters = () => {},
}) {
	const { list = [], page_limit = 10, total_count = 0 } = data || {};

	const [profitabilityStage, setProfitabilityStage] = useState('default');
	const [forVolumeStage, setForVolumeStage] = useState('default');

	const router = useRouter();
	const { updateRollingFclFreightSearch } = useUpdateRollingFclFreightSearch({
		refetchListFclSearches,
	});

	const onClickProfitabilitySort = () => {
		const nextStage = NEXT_STAGE_MAPPING[profitabilityStage];
		setProfitabilityStage(nextStage);
		setForVolumeStage('default');
		setFilters((prev) => {
			return {
				...prev,
				...(nextStage !== 'default'
					? {
							sort_by: 'profitability',
							sort_type: KEY_STAGE_MAPPING[nextStage],
					  }
					: { sort_by: undefined, sort_type: undefined }),
			};
		});
	};

	const onClickVolumeSort = () => {
		const nextStage = NEXT_STAGE_MAPPING[forVolumeStage];
		setForVolumeStage(nextStage);
		setProfitabilityStage('default');
		setFilters((prev) => {
			return {
				...prev,
				...(nextStage !== 'default'
					? {
							sort_by: 'forcasted_volume',
							sort_type: KEY_STAGE_MAPPING[nextStage],
					  }
					: { sort_by: undefined, sort_type: undefined }),
			};
		});
	};

	const columns = [
		{
			id: 'origin',
			Header: 'ORIGIN',
			accessor: ({ origin_location }) => (
				<div className={styles.origin_container}>
					<Tooltip
						content={
							<div style={{ wordBreak: 'break-word' }}>
								Reallocation required due to a change in forecasted demand
							</div>
						}
						placement="right"
					>
						<div className={styles.relative_container}>
							Attention Required!{' '}
							<IcMInfo height={8} width={8} style={{ marginLeft: '2px' }} />
						</div>
					</Tooltip>

					<Tooltip content={origin_location.display_name} placement="right">
						<div
							style={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								maxWidth: '180px',
								whiteSpace: 'nowrap',
							}}
						>
							{origin_location.display_name}
						</div>
					</Tooltip>
				</div>
			),
		},
		{
			id: 'icon',
			Header: <IcMPortArrow width={20} height={20} />,
			accessor: () => <IcMPortArrow width={20} height={20} />,
		},
		{
			id: 'destination',
			Header: 'DESTINATION',
			accessor: ({ destination_location }) => (
				<Tooltip content={destination_location?.display_name} placement="right">
					<div
						style={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							maxWidth: '180px',
							whiteSpace: 'nowrap',
						}}
					>
						{destination_location?.display_name}
					</div>
				</Tooltip>
			),
		},
		{
			id: 'avg_profitability',
			Header: (
				<div style={{ display: 'flex' }}>
					AVG PROFITABILITY{' '}
					<span
						role="presentation"
						onClick={() => onClickProfitabilitySort()}
						style={{
							display: 'flex',
							alignItems: 'center',
							marginLeft: '6px',
						}}
					>
						{ICON_MAPPING[profitabilityStage]}
					</span>
				</div>
			),
			accessor: (item) => item?.profitability,
		},
		{
			id: 'percent_fulfillment',
			Header: (
				<div>
					% FULFILLMENT
					<div style={{ fontSize: '10px', fontWeight: '400' }}>
						{' '}
						(ON BEST RATE){' '}
					</div>
				</div>
			),
			accessor: (item) => item?.fulfillment,
		},
		{
			id: 'forecasted_volume',
			Header: (
				<div style={{ display: 'flex' }}>
					FORECASTED VOLUME
					<span
						role="presentation"
						onClick={() => onClickVolumeSort()}
						style={{
							display: 'flex',
							alignItems: 'center',
							marginLeft: '6px',
						}}
					>
						{ICON_MAPPING[forVolumeStage]}
					</span>
				</div>
			),
			accessor: (item) => item?.forecasted_volume,
		},
		{
			id: 'bookmark',
			Header: '',
			accessor: (item) => {
				const { is_bookmarked = false } = item;
				return (
					<span
						role="presentation"
						style={{ cursor: 'pointer' }}
						onClick={() => {
							updateRollingFclFreightSearch({
								payload: {
									id: item.id,
									is_bookmarked: !is_bookmarked,
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
			id: 'actions',
			Header: '',
			accessor: (item) => (
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
