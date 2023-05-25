import { Button, Checkbox, Popover, Tooltip, Badge } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format, isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect, useCallback, useMemo } from 'react';

import Actions from '../components/AllocationRequests/List/Actions';
import styles from '../components/AllocationRequests/List/styles.module.css';

const useListAllocationRequests = () => {
	const { profile: { authParams } } = useSelector((state) => state);
	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');
	const [selectAll, setSelectAll] = useState(false);
	const [checkedRowsId, setCheckedRowsId] = useState([]);
	const [popoverId, setPopoverId] = useState(null);
	const [requestStatusItem, setRequestStatusItem] = useState({});
	const [showModal, setShowModal] = useState(false);

	const onCloseModal = () => {
		setShowModal(false);
	};

	const [params, setParams] = useState({
		sort_by       : 'created_at',
		sort_type     : 'desc',
		page_limit    : 10,
		page          : 1,
		data_required : true,
		filters       : {
			status       : 'pending',
			service_type : 'organization',
			q            : searchQuery || undefined,
		},
	});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/requests',
		method  : 'get',
		authkey : 'get_allocation_requests',
		params,
	}, { manual: false });

	const { list = [] } = data || {};

	const currentPageListIds = useMemo(() => list.map(({ id }) => id), [list]);

	const selectAllHelper = (listArgument = []) => {
		const isRowsChecked = currentPageListIds.every((id) => listArgument.includes(id));
		if (isRowsChecked !== selectAll) {
			setSelectAll(isRowsChecked);
		}
	};

	useEffect(() => {
		refetch();
	}, [authParams, refetch]);

	useEffect(() => {
		if (isEmpty(currentPageListIds)) {
			return;
		}

		selectAllHelper(checkedRowsId);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPageListIds]);

	const onChangeParams = useCallback((values = {}) => {
		setParams((previousParams) => ({
			...previousParams,
			...values,
		}));
	}, []);

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...previousParams.filters,
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	useEffect(() => {
		onChangeParams({ page: 1 });
		setSelectAll(false);
		setCheckedRowsId([]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params?.filters?.service_type]);

	const applyBulkFilter = async () => {
		setParams({
			...params,
			page    : 1,
			filters : {
				...params.filters,
				id : checkedRowsId,
				q  : searchQuery || undefined,
			},
		});
	};

	const onClearSelection = () => {
		setCheckedRowsId([]);

		setParams((previousParams) => ({
			...previousParams,
			page    : 1,
			filters : {
				...(previousParams.filters || {}),

				id: undefined,
			},
		}));

		setSelectAll(false);
	};

	const onChangeBodyCheckbox = (event, id) => {
		setCheckedRowsId((previousIds) => {
			let newCheckedIds = [];

			if (event.target.checked) {
				newCheckedIds = [...previousIds, id];
			} else {
				newCheckedIds = previousIds.filter((selectedId) => selectedId !== id);
			}

			selectAllHelper(newCheckedIds);

			return newCheckedIds;
		});
	};

	const onChangeTableHeadCheckbox = (event) => {
		setCheckedRowsId((previousIds) => {
			let newCheckedRowsIds = [...previousIds];

			if (event.target.checked) {
				newCheckedRowsIds = [...newCheckedRowsIds, ...currentPageListIds];
			} else {
				newCheckedRowsIds = previousIds.filter((id) => !currentPageListIds.includes(id));
			}

			setSelectAll(event.target.checked);

			return [...new Set(newCheckedRowsIds)];
		});
	};

	const columns = [
		{
			id     : 'checkbox',
			key    : 'checkbox',
			Header : <Checkbox
				checked={selectAll}
				onChange={(event) => onChangeTableHeadCheckbox(event)}
				disabled={loading}
			/>,
			accessor: ({ id = '' }) => (
				<Checkbox
					checked={checkedRowsId.includes(id)}
					onChange={(event) => onChangeBodyCheckbox(event, id)}
				/>

			),
		},
		{
			key      : 'id',
			Header   : 'Serial Id',
			accessor : ({ service }) => (service?.serial_id
				? <Badge color="blue" size="lg" text={service.serial_id} /> : '___'),
		},
		{
			key      : 'organization',
			Header   : 'Organization',
			accessor : ({ service }) => (
				<Tooltip content={(
					<div className={styles.tooltip_text}>
						{service.business_name || null}
					</div>
				)}
				>
					<div className={styles.business_name}>{service?.business_name || '___'}</div>
				</Tooltip>
			),
		},
		{
			key      : 'service_user',
			Header   : 'User',
			accessor : ({ service_user }) => (
				<div className={styles.value_container}>
					{startCase(service_user?.name || '___')}
					<div className={styles.email_id}>{service_user?.email || '___'}</div>
				</div>
			),
		},
		{
			key      : 'stakeholder_type',
			Header   : 'Stakeholder Type',
			accessor : ({ stakeholder_type }) => (
				<div className={styles.value_container}>
					{startCase(stakeholder_type || '___')}
				</div>
			),
		},
		{
			key      : 'previous_agent',
			Header   : 'Previous Agent',
			accessor : ({ old_stakeholder }) => (
				<div className={styles.value_container}>
					{old_stakeholder?.name || '___'}
					<div className={styles.email_id}>{old_stakeholder?.email || '___'}</div>
				</div>
			),
		},
		{
			key      : 'requested_agent',
			Header   : 'Requested Agent',
			accessor : ({ user }) => (
				<div className={styles.value_container}>
					{user?.name || '___'}
					<div className={styles.email_id}>{user?.email || '___'}</div>
				</div>
			),
		},
		{
			key      : 'created_by',
			Header   : 'Requested By',
			accessor : ({ created_by }) => (
				<div className={styles.value_container}>
					{startCase(created_by?.name || '___')}
				</div>
			),
		},
		{
			key      : 'created_at',
			Header   : 'Requested At',
			accessor : ({ created_at }) => (
				<div>
					{created_at	 ? (
						<div className={styles.created_date}>
							{format(created_at, 'dd MMM yyyy') || '___'}

							<div className={styles.created_time}>
								{format(created_at, 'hh:mm aaa') || '___'}
							</div>
						</div>
					) : '___'}
				</div>
			),
		},
		{
			key      : 'reason',
			Header   : 'Reason',
			accessor : ({ reason }) => (
				<Tooltip content={<div className={styles.tooltip_text}>{reason}</div>} placement="top">
					<div className={styles.reason}>
						{reason || '___'}
					</div>
				</Tooltip>
			),
		},
		{
			key      : 'booking_confirmation_proof',
			Header   : 'Booking Confirmation Proof',
			accessor : ({ booking_confirmation_proof }) => (
				<div className={styles.value_container}>
					{booking_confirmation_proof
						? (
							<Button
								size="md"
								themeType="link"
								onClick={() => window.open(booking_confirmation_proof, '_blank')}
							>
								View Proof
							</Button>
						)
						: '___'}
				</div>
			),
		},
		{
			key      : 'action',
			Header   : 'Action',
			accessor : (item) => {
				const { id } = item;

				return (
					<div className={styles.content_container}>
						<Popover
							visible={popoverId === id}
							placement="left"
							interactive
							render={(
								<Actions onClickCta={({ status }) => {
									setRequestStatusItem({
										status,
										allocation_request_id: item.id,
									});
									setPopoverId(null);
								}}
								/>
							)}
							onClickOutside={() => setPopoverId(null)}
						>
							<div
								className={styles.svg_container}
								style={checkedRowsId.includes(id) ? { pointerEvents: 'none' } : {}}
							>
								<IcMOverflowDot
									height={16}
									width={16}
									onClick={() => setPopoverId((pv) => (pv === id ? null : id))}
								/>
							</div>
						</Popover>
					</div>
				);
			},
		},
	];

	return {
		data,
		columns,
		loading,
		refetch,
		params,
		setParams,
		onChangeParams,
		debounceQuery,
		searchValue,
		setSearchValue,
		onClearSelection,
		applyBulkFilter,
		selectAll,
		checkedRowsId,
		setCheckedRowsId,
		showModal,
		setShowModal,
		onCloseModal,
		requestStatusItem,
		setRequestStatusItem,
	};
};

export default useListAllocationRequests;
