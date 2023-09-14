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
	default : <IcMDescendingSort fill="#bdbdbd" />,
	asc     : <IcMAscending width={16} height={16} />,
	desc    : <IcMDescending width={16} height={16} />,
};

const NEXT_STAGE_MAPPING = {
	default : 'asc',
	asc     : 'desc',
	desc    : 'default',
};

const KEY_STAGE_MAPPING = {
	default : undefined,
	asc     : 'asc',
	desc    : 'desc',
};

function List({
	data = [],
	pagination = 0,
	setPagination = () => {},
	loading = false,
	refetchListFclSearches = () => {},
	setSortFilters = () => {},
}) {
	const { list = [], page_limit = 10, total_count = 0 } = data || {};

	const router = useRouter();

	const [profitabilityStage, setProfitabilityStage] = useState('default');
	const [forVolumeStage, setForVolumeStage] = useState('default');

	const { updateRollingFclFreightSearch } = useUpdateRollingFclFreightSearch({
		refetchListFclSearches,
	});

	const onClickProfitabilitySort = () => {
		const nextStage = NEXT_STAGE_MAPPING[profitabilityStage];
		setProfitabilityStage(nextStage);
		setForVolumeStage('default');
		setSortFilters((prev) => ({
			...prev,
			...(nextStage !== 'default'
				? {
					sort_by   : 'profitability',
					sort_type : KEY_STAGE_MAPPING[nextStage],
				}
				: { sort_by: undefined, sort_type: undefined }),
		}));
	};

	const onClickVolumeSort = () => {
		const nextStage = NEXT_STAGE_MAPPING[forVolumeStage];
		setForVolumeStage(nextStage);
		setProfitabilityStage('default');
		setSortFilters((prev) => ({
			...prev,
			...(nextStage !== 'default'
				? {
					sort_by   : 'forecasted_volume',
					sort_type : KEY_STAGE_MAPPING[nextStage],
				}
				: { sort_by: undefined, sort_type: undefined }),
		}));
	};

	const columns = [
		{
			id       : 'origin',
			Header   : <div style={{ display: 'flex' }}>Origin</div>,
			accessor : ({ origin_location, is_attention_required }) => (
				<div className={styles.origin_container}>
					{is_attention_required
						? (
							<Tooltip
								content={(
									<div style={{ wordBreak: 'break-word', color: ' #bf291e' }}>
										Reallocation required due to a change in forecasted demand
									</div>
								)}
								placement="bottom"
								caret={false}
							>
								<div className={styles.relative_container}>
									Attention Required!
									{' '}
									<IcMInfo height={8} width={8} style={{ marginLeft: '2px' }} />
								</div>
							</Tooltip>
						) : null}

					<Tooltip content={origin_location.display_name} placement="bottom">
						<div
							style={{
								overflow     : 'hidden',
								textOverflow : 'ellipsis',
								maxWidth     : '180px',
								whiteSpace   : 'nowrap',
								textAlign    : 'start',
							}}
						>
							{origin_location.display_name}
						</div>
					</Tooltip>
				</div>
			),
		},
		{
			id       : 'icon',
			Header   : '',
			accessor : () => <IcMPortArrow width={20} height={20} />,
		},
		{
			id       : 'destination',
			Header   : <div style={{ display: 'flex' }}>Destination</div>,
			accessor : ({ destination_location }) => (
				<Tooltip content={destination_location?.display_name} placement="bottom">
					<div
						style={{
							overflow     : 'hidden',
							textOverflow : 'ellipsis',
							maxWidth     : '180px',
							whiteSpace   : 'nowrap',
							textAlign    : 'start',
						}}
					>
						{destination_location?.display_name}
					</div>
				</Tooltip>
			),
		},
		{
			id     : 'avg_profitability',
			Header : (
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					Avg Profitability
					{' '}
					<span
						role="presentation"
						onClick={() => onClickProfitabilitySort()}
						style={{
							display    : 'flex',
							alignItems : 'center',
							marginLeft : '6px',
							cursor     : 'pointer',
						}}
					>
						{ICON_MAPPING[profitabilityStage]}
					</span>
				</div>
			),
			accessor: (item) => `${item?.profitability} %`,
		},
		{
			id     : 'percent_fulfillment',
			Header : (
				<div>
					% Fulfillment
					<div style={{ fontSize: '10px', fontWeight: '400' }} />
				</div>
			),
			accessor: (item) => `${item?.fulfillment} %`,
		},
		{
			id     : 'forecasted_volume',
			Header : (
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					Forecasted Vol
					<span
						role="presentation"
						onClick={() => onClickVolumeSort()}
						style={{
							display    : 'flex',
							alignItems : 'center',
							marginLeft : '6px',
							cursor     : 'pointer',
						}}
					>
						{ICON_MAPPING[forVolumeStage]}
					</span>
				</div>
			),
			accessor: ({ forecasted_volume = 0 }) => (
				<div className={styles.volume}>
					{forecasted_volume}
					{' '}
					TEU
				</div>
			),
		},
		{
			id       : 'bookmark',
			Header   : '',
			accessor : ({ is_bookmarked = false, id = '' }) => (
				<span
					role="presentation"
					style={{ cursor: 'pointer' }}
					onClick={() => {
						updateRollingFclFreightSearch({
							payload: {
								id,
								is_bookmarked: !is_bookmarked,
							},
						});
					}}
				>
					{is_bookmarked ? (
						<IcCBookmark width={16} height={16} />
					) : (
						<IcMBookmark width={16} height={16} />
					)}
				</span>
			),
		},
		{
			id       : 'actions',
			Header   : '',
			accessor : ({ id = '' }) => (
				<Button
					themeType="secondary"
					onClick={() => {
						router.push(`/supply-allocation/view/${id}`);
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

			{total_count > page_limit ? (
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
