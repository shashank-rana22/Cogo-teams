import { Modal, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';

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

	if (isEmpty(list) && !loading) {
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
				{list.map((item) => (
					<ListItem
						key={item.id}
						item={item}
						checkedRowsId={checkedRowsId}
						setCheckedRowsId={setCheckedRowsId}
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
