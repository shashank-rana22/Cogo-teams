import { Checkbox, Tooltip, Pill, Popover } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useAllocationRequest } from '@cogoport/request';
import { startCase, format } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import ActionContent from '../page-components/CoreAllocationEngine/AllocationRelations/List/ListItem/ActionContent';
import styles from '../page-components/CoreAllocationEngine/AllocationRelations/List/styles.module.css';

const useAllocationRelations = () => {
	const [showActions, setShowActions] = useState(null);

	const [activeTab, setActiveTab] = useState('active');

	const [listItem, setListItem] = useState({});

	const [checkedRowsId, setCheckedRowsId] = useState([]);

	console.log('checkedRowsId', checkedRowsId);

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

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
		page_limit : 5,
		page       : 1,
		filters    : {
			status : 'active',
			q      : searchQuery || undefined,
		},
		data_required: true,
	});

	const [searchValue, setSearchValue] = useState(params.filters?.q);

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/relations',
		method  : 'get',
		authkey : 'get_allocation_relations',
		params,
	}, { manual: false });

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

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

	const onChangeBodyCheckbox = (event, id) => {
		if (event.target.checked) {
			setCheckedRowsId([...checkedRowsId, id]);
		} else {
			setCheckedRowsId(checkedRowsId.filter((selectedId) => selectedId !== id));
		}
	};

	const onChangeTableHeadCheckbox = (event) => {
		const currentPageListIds = list.map(({ id }) => id);

		setCheckedRowsId((previousIds) => {
			let newCheckedRowsIds = previousIds;

			if (event.target.checked) {
				currentPageListIds.forEach((listId) => {
					if (!previousIds.includes(listId)) {
						newCheckedRowsIds.push(listId);
					}
				});
			} else {
				newCheckedRowsIds = previousIds.filter((previousId) => !currentPageListIds.includes(previousId));
			}

			return newCheckedRowsIds;
		});
	};

	const isHeaderChecked = () => {
		let checked = true;

		const currentPageListIds = list.map(({ id }) => id);

		currentPageListIds.forEach((selectedId) => {
			checked = checked && checkedRowsId.include(selectedId);
		});

		return checked;
	};

	const columns = [
		{
			id     : 'check',
			Header : (
				<Checkbox
					checked={isHeaderChecked}
					onChange={onChangeTableHeadCheckbox}
				/>
			),
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
						{startCase(organization.business_name.toLowerCase()) || '-'}
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
					<div className={styles.tooltip_text}>{startCase((user_id.name || '').toLowerCase())}</div>

					<div className={`${styles.lower_label} ${styles.email_id}`}>
						{(user_id.email || '').toLowerCase()}
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

					{relation_type ? startCase(relation_type) : '-'}
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
						onClickOutside={() => {
							setShowActions(null);
							setListItem({});
						}}
					>

						<div className={styles.svg_container}>
							<IcMOverflowDot
								height={16}
								width={16}
								onClick={() => {
									setShowActions(() => (showActions === id ? null : id));
									setListItem(() => (showActions === id ? {} : item));
								}}
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
	};
};

export default useAllocationRelations;
