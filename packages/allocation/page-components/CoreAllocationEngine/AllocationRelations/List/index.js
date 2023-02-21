import { Modal, Pagination, Table, Tooltip, Pill } from '@cogoport/components';
import { isEmpty, startCase, format } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import ShimmerState from '../../../../common/ShimmerState';

import BulkUpdateMode from './BulkUpdateMode';
import ListItem from './ListItem';
import styles from './styles.module.css';
import UserActions from './UserActions';

function List({
	list,
	loading,
	params,
	setParams = () => {},
	checkedRowsId = [],
	setCheckedRowsId = () => {},
	activeTab,
	confirmModalState,
	setConfirmModalState = () => {},
	paginationData = {},
	getNextPage,
	searchQuery,
}) {
	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};
	const [selectAll, setSelectAll] = useState(false);

	const columns = [
		{
			Header   : 'Business Name',
			accessor : ({ organization = '' }) => (
				<Tooltip content={startCase(organization.business_name.toLowerCase())} placement="bottom">
					<div className={styles.tooltip_text}>
						{startCase(organization.business_name.toLowerCase()) || '-'}
					</div>
				</Tooltip>
			),
			flex : 1.25,
			tab  : ['active', 'pending'],
		},
		{
			Header   : 'User',
			accessor : ({ user_id = '' }) => (
				<div className={styles.name_container}>
					<div className={styles.tooltip_text}>{startCase((user_id.name || '').toLowerCase())}</div>

					<div className={`${styles.lower_label} ${styles.email_id}`}>
						{(user_id.email || '').toLowerCase()}
					</div>
				</div>
			),
			flex : 1.25,
			tab  : ['active', 'pending'],
		},
		{
			Header   : 'Reason',
			accessor : ({ reason = '' }) => (
				<Tooltip placement="bottom" content={(reason || '___')}>
					<div className={styles.reason_text}>{(reason || '___')}</div>
				</Tooltip>
			),
			flex : 1.0,
			tab  : ['active', 'pending'],
		},
		{
			Header   : 'Create By',
			accessor : ({ created_by = '' }) => (
				<div className={styles.name_container}>
					<div className={styles.tooltip_text}>

						{(created_by.name || '___')}
					</div>
				</div>
			),
			flex : 1,
			tab  : ['active', 'pending'],
		},
		{
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
			flex : 0.75,
			tab  : ['active', 'pending'],
		},
		{
			Header   : 'Relation Type',
			accessor : ({ relation_type = '' }) => (
				<Pill size="sm" color={relation_type === 'remove' ? 'red' : 'green'}>

					{relation_type ? startCase(relation_type) : '-'}
				</Pill>
			),
			flex : 1,
			tab  : ['active'],
		},
	];

	// if (loading) {
	// 	return <ShimmerState />;
	// }

	if (isEmpty(list)) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={280}
					width={440}
					emptyText="No records found"
					textSize="24px"
					flexDirection="column"
				/>
			</div>
		);
	}

	const onClickClose = () => {
		setConfirmModalState((prev) => ({
			...prev,
			showConfirmationModal : false,
			type                  : '',
		}));
	};

	const onChangeCheckbox = (e) => {
		if (!e.target.checked) {
			setCheckedRowsId([]);
			setSelectAll('');
			setConfirmModalState((prev) => ({
				...prev,
				showApproveAllButton: e.target.checked,
			}));

			if ((!isEmpty(checkedRowsId))) {
				setParams((p) => ({
					...p,
					filters: {
						...((p || {}).filters || {}),
						id: undefined,
					},
				}));
			}
		}
	};

	return (
		<div>
			{activeTab === 'pending' ? (
				<BulkUpdateMode
					list={list}
					checkedRowsId={checkedRowsId}
					setCheckedRowsId={setCheckedRowsId}
					confirmModalState={confirmModalState}
					setConfirmModalState={setConfirmModalState}
					params={params}
					setParams={setParams}
					selectAll={selectAll}
					setSelectAll={setSelectAll}
					searchQuery={searchQuery}
				/>
			) : null}

			{confirmModalState.showConfirmationModal && (
				<Modal
					show={confirmModalState.showConfirmationModal}
					placement="top"
					closeOnOuterClick={false}
					onClose={onClickClose}
				>
					<UserActions
						confirmModalState={confirmModalState}
						setConfirmModalState={setConfirmModalState}
						checkedRowsId={checkedRowsId}
						onResettingBulkMode={() => onChangeCheckbox({ target: { checked: false } })}
					/>
				</Modal>
			)}

			<div className={styles.list_container}>
				{/* {list.map((item) => (
					<ListItem
						key={item.id}
						item={item}
						checkedRowsId={checkedRowsId}
						setCheckedRowsId={setCheckedRowsId}
						activeTab={activeTab}
						setConfirmModalState={setConfirmModalState}
					/>
				))} */}
				<div className={styles.table_container}>
					<Table className={styles.request_table} data={list} columns={columns} />
				</div>
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>

			</div>
		</div>

	);
}

export default List;
