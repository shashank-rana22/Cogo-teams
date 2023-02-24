import { Checkbox, Tooltip, Pill, Popover } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useAllocationRequest } from '@cogoport/request';
import { startCase, format, isEmpty } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import ActionContent from '../components/AllocationRelations/List/ActionContent';
import styles from '../components/AllocationRelations/List/styles.module.css';

const useAllocationRelations = () => {
	const [showActions, setShowActions] = useState(null);

	const [activeTab, setActiveTab] = useState('active');
	const [selectAll, setSelectAll] = useState(false);

	const [checkedRowsId, setCheckedRowsId] = useState([]);

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState();
	const [confirmModalState, setConfirmModalState] = useState({
		type                  : '',
		relationData          : {},
		showConfirmationModal : false,
		showApproveAllButton  : false,
	});

	const [showCreateRelationModal, setShowCreateRelationModal] = useState(false);

	const [params, setParams] = useState({
		sort_type  : 'desc',
		sort_by    : 'expiry_date',
		page_limit : 10,
		page       : 1,
		filters    : {
			status : 'active',
			q      : searchQuery || undefined,
		},
		data_required: true,
	});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/relations',
		method  : 'get',
		authkey : 'get_allocation_relations',
		params,
	}, { manual: false });

	useEffect(() => {
		setParams((prevParams) => ({
			...prevParams,
			filters: {
				...prevParams.filters,
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	const { list = [], ...paginationData } = data || {};

	const currentPageListIds = useMemo(() => list.map(({ id }) => id), [list]);

	const selectAllHelper = (listArgument = []) => {
		const isRowsChecked = currentPageListIds.every((id) => listArgument.includes(id));
		if (isRowsChecked !== selectAll) {
			setSelectAll(isRowsChecked);
		}
	};

	useEffect(() => {
		if (isEmpty(currentPageListIds)) {
			return;
		}

		selectAllHelper(checkedRowsId);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPageListIds]);

	const getNextPage = (newPage) => {
		setParams((previousParams) => {
			let newParams = {};
			newParams = {
				...previousParams,
				page: newPage,
			};

			return newParams;
		});
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

	const onClearSelection = () => {
		setCheckedRowsId([]);

		setSelectAll(false);

		setConfirmModalState((prev) => ({
			...prev,
			showApproveAllButton: false,
		}));

		setParams((previousParams) => ({
			...(previousParams || {}),
			filters: {
				...((previousParams || {}).filters || {}),
				id: undefined,
			},
		}));
	};

	const columns = [
		{
			id     : 'check',
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
			showInTabs: ['pending'],
		},
		{
			id       : 'business_name',
			Header   : 'Business Name',
			accessor : ({ organization = '' }) => (
				<Tooltip content={startCase(organization.business_name.toLowerCase())} placement="bottom">
					<div className={styles.tooltip_text}>
						{startCase(organization.business_name.toLowerCase()) || '___'}
					</div>
				</Tooltip>
			),
			showInTabs: ['active', 'pending'],
		},
		{
			id       : 'user',
			Header   : 'User',
			accessor : ({ user_id = '' }) => (
				<div className={styles.name_container}>
					<div className={styles.tooltip_text}>{startCase((user_id.name || '___').toLowerCase())}</div>

					<div className={`${styles.lower_label} ${styles.email_id}`}>
						{(user_id.email || '___').toLowerCase()}
					</div>
				</div>
			),
			showInTabs: ['active', 'pending'],
		},
		{
			id       : 'stakeholder',
			Header   : 'Stakeholder',
			accessor : ({ stakeholder_id = '', stakeholder_type = '' }) => (
				<div className={styles.name_container}>
					<div className={styles.tooltip_text}>{startCase((stakeholder_id.name || '___').toLowerCase())}</div>

					<div className={`${styles.lower_label} ${styles.email_id}`}>
						{startCase(stakeholder_type || '___')}
					</div>
				</div>
			),
			showInTabs: ['active', 'pending'],
		},
		{
			id       : 'reason',
			Header   : 'Reason',
			accessor : ({ reason = '' }) => (
				<Tooltip placement="bottom" content={(reason || '___')}>
					<div className={styles.reason_text}>{(reason || '___')}</div>
				</Tooltip>
			),
			showInTabs: ['active', 'pending'],
		},
		{
			id       : 'created_by',
			Header   : 'Created By',
			accessor : ({ created_by = '' }) => (
				<div className={styles.name_container}>
					<div className={styles.tooltip_text}>

						{(created_by.name || '___')}
					</div>
				</div>
			),
			showInTabs: ['active', 'pending'],
		},
		{
			id       : 'expiry_date',
			Header   : 'Expiry Date',
			accessor : ({ expiry_date = '' }) => (
				<div className={styles.expiry_date}>
					<div>
						{(expiry_date)
							? format((expiry_date), 'dd MMM yyyy') : '___'}
					</div>

					<div className={styles.expiry_time}>
						{(expiry_date)
							? format((expiry_date), 'hh:mm aaa') : '___'}
					</div>
				</div>
			),
			showInTabs: ['active', 'pending'],
		},
		{
			id       : 'relation_type',
			Header   : 'Relation Type',
			accessor : ({ relation_type = '' }) => (
				<Pill size="sm" color={relation_type === 'remove' ? 'red' : 'green'}>

					{relation_type ? startCase(relation_type) : '___'}
				</Pill>
			),
			showInTabs: ['active', 'pending'],
		},
		{
			id       : 'actions',
			Header   : 'Actions',
			accessor : (item) => {
				const { id = '' } = item;
				const onClickCta = (workflow) => {
					setShowActions(false);
					setConfirmModalState(() => ({
						type                  : workflow,
						relationData          : item,
						showConfirmationModal : true,
					}));
				};

				return (
					<Popover
						placement="left"
						interactive
						visible={showActions === id}
						render={(
							<ActionContent
								activeTab={activeTab}
								onClickCta={onClickCta}
							/>
						)}
						onClickOutside={() => setShowActions(null)}
					>

						<div
							className={styles.svg_container}
							style={checkedRowsId.includes(id) ? { pointerEvents: 'none' } : {}}
						>
							<IcMOverflowDot
								height={16}
								width={16}
								onClick={() => setShowActions(() => (showActions === id ? null : id))}
							/>
						</div>
					</Popover>
				);
			},
			showInTabs: ['active', 'pending'],
		},
	];

	return {
		loading,
		list,
		paginationData,
		params,
		setParams,
		showCreateRelationModal,
		setShowCreateRelationModal,
		fetchList: refetch,
		checkedRowsId,
		setCheckedRowsId,
		activeTab,
		setActiveTab,
		confirmModalState,
		setConfirmModalState,
		getNextPage,
		searchValue,
		setSearchValue,
		debounceQuery,
		searchQuery,
		columns,
		setSelectAll,
		onClearSelection,
	};
};

export default useAllocationRelations;
