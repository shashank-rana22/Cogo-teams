import { Button, Toggle } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import SearchInput from '../../../../../common/SearchInput';

import ConfigFilters from './ConfigFilters';
import styles from './styles.module.css';

function Header(props) {
	const { t } = useTranslation(['allocation']);

	const {
		onClickCreateReqBtn,
		disabled,
		params,
		setParams,
		onChangeParams,
		debounceQuery,
		searchValue,
		setSearchValue,
		onClearSelection,
		applyBulkFilter,
		checkedRowsId,
		setShowModal,
		isCreateDisabled,
	} = props;

	const { service_type: toggleValue, id } = params.filters || {};

	const isBulkUpdateMode = !isEmpty(checkedRowsId);

	const selectedItemsForUpdate = isBulkUpdateMode ? checkedRowsId.length : '';

	return (
		<>
			<div className={styles.container}>
				<Toggle
					name="allocation_type"
					size="md"
					offLabel={t('allocation:allocation_type_off_label')}
					onLabel={t('allocation:allocation_type_on_label')}
					checked={toggleValue === 'partner'}
					onChange={(e) => onChangeParams({
						filters:
					{
						status       : 'pending',
						service_type : e?.target?.checked ? 'partner' : 'organization',
					},
					})}
					disabled={disabled}
				/>

				<div className={styles.filter_container}>
					<div className={styles.search_container}>
						<SearchInput
							size="sm"
							placeholder={t('allocation:search_placeholder_org_name')}
							setGlobalSearch={setSearchValue}
							debounceQuery={debounceQuery}
							value={searchValue}
							disabled={disabled}
						/>
					</div>

					<ConfigFilters
						params={params}
						setParams={setParams}
						disabled={disabled}
					/>

					<Button
						size="md"
						themeType="primary"
						onClick={onClickCreateReqBtn}
						disabled={disabled || isCreateDisabled}
					>
						{t('allocation:create_button_label')}
					</Button>
				</div>
			</div>

			<div className={styles.bulk_update_container}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Button
						size="sm"
						themeType="secondary"
						disabled={!isBulkUpdateMode}
						onClick={applyBulkFilter}
					>
						{t('allocation:apply_bulk_filter_button_label')}
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

							<Button
								size="md"
								themeType="linkUi"
								onClick={onClearSelection}
								style={{ backgroundColor: '#F8F2E7', padding: 0 }}
							>
								{t('allocation:clear_selection_button_label')}
							</Button>
						</div>
					)}
				</div>

				<Button
					size="sm"
					themeType="secondary"
					disabled={isEmpty(id)}
					onClick={() => setShowModal(true)}
				>
					{t('allocation:approve_all_button_label')}
					{' '}
					{selectedItemsForUpdate}
				</Button>

			</div>

		</>
	);
}

export default Header;
