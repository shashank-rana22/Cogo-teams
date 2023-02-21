import { Checkbox, Popover, Tooltip, Badge } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import Actions from '../page-components/CoreAllocationEngine/AllocationRequests/List/Actions';
import styles from '../page-components/CoreAllocationEngine/styles.module.css';

const useListAllocationRequests = () => {
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
		},
	});

	const apiData = useAllocationRequest({
		url     : '/requests',
		method  : 'get',
		authkey : 'get_allocation_requests',
		params,
	}, { manual: false });

	const [{ loading, data }, refetch] = apiData;

	const onChangeParams = useCallback((values = {}) => {
		setParams((pv) => ({
			...pv,
			...values,
		}));
	}, []);

	useEffect(() => {
		if (searchQuery) {
			setParams((pv) => ({
				...pv,
				filters: {
					...pv.filters,
					q: searchQuery || undefined,
				},
			}));
		}
	}, [searchQuery]);

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

	const onSelectAll = (val) => {
		const listIds = (data.list || []).map(({ id }) => id);

		setCheckedRowsId((previousIds) => {
			let newCheckedRowsIds = previousIds;

			if (val) {
				listIds.forEach((listId) => {
					if (!previousIds.includes(listId)) {
						newCheckedRowsIds.push(listId);
					}
				});
			} else {
				newCheckedRowsIds = previousIds.filter((previousId) => !listIds.includes(previousId));
			}

			return newCheckedRowsIds;
		});
	};

	const onChangeCheckbox = (e) => {
		if (!e.target.checked) {
			setCheckedRowsId([]);
			setSelectAll('');
			if (!isEmpty(checkedRowsId)) {
				setParams((pv) => ({
					...pv,
					filters: {
						...(pv.filters || {}),
						id: undefined,
					},
				}));
			}
		}
	};

	const onClearSelection = () => {
		setCheckedRowsId([]);

		setParams((pv) => ({
			...pv,
			filters: {
				...(pv.filters || {}),
				id: undefined,
			},
		}));

		setSelectAll(false);
	};

	const onItemChangeInChips = (val) => {
		setSelectAll(val);
		onSelectAll(val);
	};

	const columns = [
		{
			id     : 'checkbox',
			key    : 'checkbox',
			Header : <Checkbox
				label=""
				checked={selectAll}
				onChange={
			(e) => onItemChangeInChips(e?.target?.checked)
}
				className={styles.select_all_checkbox}
			/>,
			accessor: ({ id }) => {
				const isSelected = checkedRowsId.includes(id);

				return (
					<Checkbox
						label=""
						checked={isSelected}
						onChange={() => {
							if (!isSelected) {
								setCheckedRowsId([...checkedRowsId, id]);
							} else {
								setCheckedRowsId(checkedRowsId.filter((rowId) => rowId !== id));
							}
						}}
						className={styles.bulk_select_checkbox}
					/>
				);
			},
		},
		{
			key      : 'id',
			Header   : 'Serial Id',
			accessor : ({ service }) => (service?.serial_id
				? <Badge color="blue" size="lg" text={service.serial_id} /> : '___'),
		},
		{
			key      : 'service_type',
			Header   : 'Organization',
			accessor : ({ service }) => service?.business_name || '___',
		},
		{
			key      : 'service_user',
			Header   : 'User',
			accessor : ({ service_user }) => (
				<div>
					{service_user?.name}
					<div className={styles.email_id}>{service_user?.email || '___'}</div>
				</div>
			),
		},
		{
			key      : 'stakeholder_type',
			Header   : 'Stakeholder Type',
			accessor : ({ stakeholder_type }) => startCase(stakeholder_type || '___'),
		},
		{
			key      : 'requested_agent',
			Header   : 'Requested Agent',
			accessor : ({ user }) => (
				<div>
					{user?.name}
					{' '}
					<div className={styles.email_id}>{user?.email || '___'}</div>
				</div>
			),
		},
		{
			key      : 'created_by',
			Header   : 'Requested By',
			accessor : ({ created_by }) => created_by?.name || '___',
		},
		{
			key      : 'reason',
			Header   : 'Reason',
			accessor : ({ reason }) => (
				<Tooltip content={reason} placement="top">
					<span className={styles.reason}>
						{reason || '___'}
					</span>
				</Tooltip>
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
								onClick={() => setPopoverId((pv) => (pv === id ? null : id))}
								role="presentation"
							>
								<IcMOverflowDot height={16} width={16} />
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
		onChangeCheckbox,
		onSelectAll,
		selectAll,
		checkedRowsId,
		setCheckedRowsId,
		onItemChangeInChips,
		showModal,
		setShowModal,
		onCloseModal,
		requestStatusItem,
		setRequestStatusItem,
	};
};

export default useListAllocationRequests;
