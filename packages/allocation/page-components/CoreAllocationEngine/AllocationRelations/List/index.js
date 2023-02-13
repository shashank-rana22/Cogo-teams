import { Modal, Pagination, Chips, Button, Checkbox } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import LoadingState from '../../../../common/LoadingState';

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
	// setActiveTab = () => {},
}) {
	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};
	const [selectAll, setSelectAll] = useState('');
	const [workflowName, setWorkflowName] = useState(false);

	if (loading) {
		return <LoadingState />;
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

	const applyBulkFilter = async () => {
		setConfirmModalState((prev) => ({
			...prev,
			showApproveAllButton: true,
		}));
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
		const listIds = list.map(({ id }) => id);

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
		if (e.target.checked === false) {
			setCheckedRowsId([]);
			setConfirmModalState((prev) => ({
				...prev,
				showApproveAllButton: e.target.checked,
			}));
			if ((checkedRowsId || []).length !== 0) {
				setParams((p) => ({
					...p,
					filters: {
						...((p || {}).filters || {}),
						id: undefined,
					},
				}));
			}
		}
		setBulkMode(e.target.checked);
	};

	const onClearSelection = () => {
		setCheckedRowsId([]);

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

		setSelectAll('');
	};

	const onClickClose = () => {
		setWorkflowName(null);
		setConfirmModalState((prev) => ({
			...prev,
			showConfirmationModal : false,
			type                  : '',
		}));
	};

	return (
		<div>

			{activeTab === 'pending' ? (
				<>
					<div className={styles.bulk_update_container}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Checkbox
								label="Bulk update mode"
								value="bulkMode"
								style={{ paddingLeft: '0px' }}
								onChange={(e) => onChangeCheckbox(e)}
							/>
							<Button
								size="sm"
								themeType="accent"
								disabled={!bulkMode || checkedRowsId.length === 0}
								onClick={() => applyBulkFilter()}
							>
								{' '}
								APPLY BULK FILTER

							</Button>
						</div>

						<Button
							size="sm"
							themeType="primary"
							disabled={!confirmModalState.showApproveAllButton}
							onClick={() => {
								setConfirmModalState(() => ({
									type                  : 'approve_all',
									relationData          : {},
									showConfirmationModal : true,
								}));
							}}
						>
							{' '}
							APPROVE ALL

						</Button>
					</div>
					{(checkedRowsId.length > 0 && bulkMode) && (
						<div className={styles.selection_text}>
							<div className={styles.text}>
								{' '}
								You have selected
								{' '}
								{checkedRowsId.length}
								{' '}
								row(s)

							</div>

							<Button
								size="md"
								themeType="linkUi"
								onClick={() => onClearSelection()}
								style={{ backgroundColor: '#F8F2E7', padding: '0px', color: '' }}
							>
								clear selection

							</Button>
						</div>
					)}
					<div>

						<Chips
							selectedItems={selectAll}
							items={[{ children: 'Select All', key: 'select_all', disabled: !bulkMode }]}
							onItemChange={(val) => {
								setSelectAll(val);
								onSelectAll(val);
							}}
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
								onClick={onClickClose}
								confirmModalState={confirmModalState}
								setConfirmModalState={setConfirmModalState}
								// fetchList={fetchList}
								checkedRowsId={checkedRowsId}
							/>
						</Modal>
					)}
				</>

			) : null}

			<div className={styles.list_container}>
				{list.map((item = {}) => (
					<ListItem
						key={item.id}
						item={item}
						bulkMode={bulkMode}
						setBulkMode={setBulkMode}
						checkedRowsId={checkedRowsId}
						setCheckedRowsId={setCheckedRowsId}
						activeTab={activeTab}
						confirmModalState={confirmModalState}
						setConfirmModalState={setConfirmModalState}
						onClickClose={onClickClose}
						workflowName={workflowName}
						setWorkflowName={setWorkflowName}
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
