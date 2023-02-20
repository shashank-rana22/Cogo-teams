import { Button, Checkbox } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function BulkUpdateMode({
	list,
	checkedRowsId = [],
	setCheckedRowsId = () => {},
	confirmModalState,
	setConfirmModalState = () => {},
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

	const onItemChangeInChips = (val) => {
		setSelectAll(val);
		onSelectAll(val);
	};

	const selectedItemsForUpdate = !isEmpty(checkedRowsId) ? checkedRowsId.length : '';

	return (
		<div className={styles.bulk_update_container}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Checkbox
					label="Select All"
					checked={selectAll}
					onChange={
						(e) => onItemChangeInChips(e?.target?.checked)
}
					className={styles.select_all_checkbox}
				/>

				<Button
					size="sm"
					themeType="primary"
					disabled={isEmpty(checkedRowsId)}
					onClick={applyBulkFilter}
				>
					Apply bulk filter
					{' '}
				</Button>

				{!isEmpty(checkedRowsId) && (
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
								Clear Selection
							</Button>
						</div>
					</div>
				)}
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
				APPROVE ALL
				{' '}
				{selectedItemsForUpdate}
			</Button>
		</div>
	);
}

export default BulkUpdateMode;
