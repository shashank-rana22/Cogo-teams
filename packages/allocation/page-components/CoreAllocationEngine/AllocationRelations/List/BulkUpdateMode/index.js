import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function BulkUpdateMode({
	checkedRowsId = [],
	setCheckedRowsId = () => {},
	confirmModalState,
	setConfirmModalState = () => {},
	params,
	setParams = () => {},
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

	const selectedItemsForUpdate = !isEmpty(checkedRowsId) ? checkedRowsId.length : '';

	return (
		<div className={styles.bulk_update_container}>
			<div style={{ display: 'flex', alignItems: 'center' }}>

				<Button
					size="sm"
					themeType="secondary"
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
				themeType="secondary"
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
