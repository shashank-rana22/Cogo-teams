import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function BulkUpdateMode({
	checkedRowsId = [],
	confirmModalState,
	setConfirmModalState = () => {},
	params,
	setParams = () => {},
	searchQuery,
	onClearSelection = () => {},
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

	const selectedItemsForUpdate = !isEmpty(checkedRowsId) ? checkedRowsId.length : '';

	return (
		<div className={styles.bulk_update_container}>
			<div className={styles.left_container}>
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
								size="sm"
								themeType="linkUi"
								onClick={() => onClearSelection()}
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
