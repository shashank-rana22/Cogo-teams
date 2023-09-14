import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

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
	const { t } = useTranslation(['allocation']);

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
					{t('allocation:apply_bulk_filter_button_label')}
					{' '}
				</Button>

				{!isEmpty(checkedRowsId) && (
					<div className={styles.selection_text}>
						<div className={styles.text}>
							{' '}
							{t('allocation:selection_text')}
							{' '}
							{checkedRowsId.length}
							{' '}
							{t('allocation:rows_label')}
						</div>

						<div className={styles.clear_selection_button_container}>
							<Button
								size="sm"
								themeType="linkUi"
								onClick={() => onClearSelection()}
							>
								{t('allocation:clear_selection_button_label')}
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
				{t('allocation:approve_all_button_label')}
				{' '}
				{selectedItemsForUpdate}
			</Button>
		</div>
	);
}

export default BulkUpdateMode;
