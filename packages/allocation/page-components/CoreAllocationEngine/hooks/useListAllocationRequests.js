import { Button, Checkbox, Popover, Tooltip, Badge, Pill } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect, useCallback, useMemo } from 'react';

import Actions from '../components/AllocationRequests/List/Actions';
import styles from '../components/AllocationRequests/List/styles.module.css';
import REQUEST_STATUS_COLOR_MAPPING from '../constants/request-status-color-mapping';

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
		sort_by                        : 'created_at',
		sort_type                      : 'desc',
		page_limit                     : 10,
		page                           : 1,
		data_required                  : true,
		organization_sub_type_required : true,
		filters                        : {
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
			accessor : ({ service, partner }) => {
				const { service_type: toggleValue } = params.filters || {};

				const pathname = toggleValue === 'organization'
					? `/${partner?.id}/details/demand/${service.id}` : `/${partner?.id}/prm/${service.id}`;

				return (
					<Tooltip content={(
						<div className={styles.tooltip_text}>
							{service.business_name || null}
						</div>
					)}
					>
						<a href={pathname} target="_blank" rel="noopener noreferrer">
							<div className={styles.business_name}>
								{service?.business_name || '___'}
							</div>
						</a>
					</Tooltip>
				);
			},
		},
		{
			key      : 'sub_type',
			Header   : 'Sub Type',
			accessor : ({ sub_type }) => <div className={styles.sub_type}>{startCase(sub_type || '___')}</div>,
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
			key      : 'partner',
			Header   : 'Partner',
			accessor : ({ partner: entity_partner }) => (
				<div className={styles.value_container}>
					{entity_partner?.business_name || '___'}
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
					<div>
						{old_stakeholder?.name || '___'}
						{old_stakeholder?.block_access && <Pill size="md" color="red">Blocked</Pill>}
					</div>
					<div className={styles.role_name}>{old_stakeholder?.role_name || '___'}</div>
				</div>
			),
		},
		{
			key      : 'requested_agent',
			Header   : 'Requested Agent',
			accessor : ({ user }) => (
				<div className={styles.value_container}>
					<div>
						{user?.name || '___'}
						{user?.block_access && <Pill size="md" color="red">Blocked</Pill>}
					</div>
					<div className={styles.role_name}>{user?.role_name || '___'}</div>
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
							{formatDate({
								date       : created_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							}) || '___'}

							<div className={styles.created_time}>
								{formatDate({
									date       : created_at,
									timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
									formatType : 'time',
								}) || '___'}
							</div>
						</div>
					) : '___'}
				</div>
			),
		},
		{
			key      : 'updated_at',
			Header   : 'Updated At',
			accessor : ({ updated_at }) => (
				<div>
					{updated_at ? (
						<div className={styles.created_date}>
							{formatDate({
								date       : updated_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							}) || '___'}

							<div className={styles.created_time}>
								{formatDate({
									date       : updated_at,
									timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
									formatType : 'time',
								}) || '___'}
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
			key      : 'status',
			Header   : 'Status',
			accessor : ({ status }) => (status ? (
				<Pill
					size="md"
					color={REQUEST_STATUS_COLOR_MAPPING?.[status]}
				>
					{startCase(status)}
				</Pill>
			) : '___'),
		},
		{
			key      : 'action',
			Header   : 'Action',
			accessor : (item) => {
				const { id, status: requestStatus } = item;

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
								style={(checkedRowsId.includes(id) || requestStatus !== 'pending')
									? { pointerEvents: 'none' } : {}}
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
