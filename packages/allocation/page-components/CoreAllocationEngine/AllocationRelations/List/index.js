import { Modal, Pagination, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../common/EmptyState';

import BulkUpdateMode from './BulkUpdateMode';
import styles from './styles.module.css';
import UserActions from './UserActions';

function List({
	list,
	loading,
	params,
	columns,
	setParams = () => {},
	checkedRowsId = [],
	setCheckedRowsId = () => {},
	activeTab,
	confirmModalState,
	setConfirmModalState = () => {},
	paginationData = {},
	searchQuery,
	setSelectAll = () => {},
	getNextPage = () => {},
}) {
	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	const modifiedColumns = columns.filter((col) => col.showInTabs.includes(activeTab));

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
					setSelectAll={setSelectAll}
					searchQuery={searchQuery}
				/>
			) : null}

			<div className={styles.list_container}>
				<div className={styles.table_container}>

					<Table className={styles.request_table} data={list} columns={modifiedColumns} loading={loading} />
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
					/>
				</Modal>
			)}
		</div>

	);
}

export default List;
