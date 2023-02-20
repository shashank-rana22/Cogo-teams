import { Chips, Button, Checkbox } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function BulkUpdateMode({
	list,
	checkedRowsId = [],
	setCheckedRowsId = () => {},
	confirmModalState,
	setConfirmModalState = () => {},
	bulkMode = false,
	setBulkMode = () => {},
	params,
	setParams = () => {},
	selectAll,
	setSelectAll = () => {},
	searchQuery,
}) {
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

	return (
		<>
			<div className={styles.bulk_update_container}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Checkbox
						label="Bulk update mode"
						checked={bulkMode}
						style={{ paddingLeft: '0px' }}
						onChange={(e) => onChangeCheckbox(e)}
					/>
					<Button
						size="sm"
						themeType="primary"
						disabled={!bulkMode || isEmpty(checkedRowsId)}
						onClick={() => applyBulkFilter()}
					>
						{' '}
						Apply Bulk Filter
						{!isEmpty(checkedRowsId) ? ` (${checkedRowsId.length})` : ''}
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
					Approve All
					{!isEmpty(checkedRowsId) ? `(${checkedRowsId.length})` : ''}
				</Button>
			</div>
			{(!isEmpty(checkedRowsId) && bulkMode) && (
				<div className={styles.selection_text}>
					<div className={styles.text}>
						{' '}
						You have selected
						{' '}
						{checkedRowsId.length}
						{' '}
						row(s)

					</div>

					<div className={styles.clear_selection_button_container}>
						<Button
							size="md"
							themeType="linkUi"
							onClick={() => onClearSelection()}
							style={{ backgroundColor: '#F8F2E7', padding: '0px', color: '' }}
						>
							clear selection
						</Button>
					</div>

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
		</>
	);
}

export default BulkUpdateMode;
