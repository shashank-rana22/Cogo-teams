import { Modal, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
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
	bulkMode = false,
	setBulkMode = () => {},
	checkedRowsId = [],
	setCheckedRowsId = () => {},
	activeTab,
	confirmModalState,
	setConfirmModalState = () => {},
	paginationData = {},
	getNextPage,
	searchQuery,
	fetchList = () => {},
}) {
	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};
	const [selectAll, setSelectAll] = useState('');

	if (loading) {
		return <ShimmerState />;
	}

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
					bulkMode={bulkMode}
					setBulkMode={setBulkMode}
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
						fetchList={fetchList}
						checkedRowsId={checkedRowsId}
						setBulkMode={setBulkMode}
					/>
				</Modal>
			)}

			<div className={styles.list_container}>
				{list.map((item) => (
					<ListItem
						key={item.id}
						item={item}
						checkedRowsId={checkedRowsId}
						setCheckedRowsId={setCheckedRowsId}
						bulkMode={bulkMode}
						activeTab={activeTab}
						setConfirmModalState={setConfirmModalState}
					/>
				))}

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
