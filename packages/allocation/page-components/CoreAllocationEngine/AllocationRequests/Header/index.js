import { Checkbox, Button, Toggle } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import SearchInput from '../../../../common/SearchInput';

import ConfigFilters from './ConfigFilters';
import styles from './styles.module.css';

function Header(props) {
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
		selectAll,
		onItemChangeInChips,
		checkedRowsId,
		setShowModal,
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
					offLabel="Organization"
					onLabel="Partner"
					value={toggleValue}
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
							placeholder="Search by Organization name / User name"
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
						themeType="accent"
						onClick={onClickCreateReqBtn}
						disabled={disabled}
					>
						CREATE REQUEST
					</Button>
				</div>
			</div>

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
						themeType="accent"
						disabled={!isBulkUpdateMode}
						onClick={applyBulkFilter}
					>
						APPLY BULK FILTER
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

							<Button
								size="md"
								themeType="linkUi"
								onClick={onClearSelection}
								style={{ backgroundColor: '#F8F2E7', padding: 0 }}
							>
								Clear Selection
							</Button>
						</div>
					)}
				</div>

				<Button
					size="sm"
					themeType="primary"
					disabled={isEmpty(id)}
					onClick={() => setShowModal(true)}
				>
					APPROVE ALL
					{' '}
					{selectedItemsForUpdate}
				</Button>

			</div>

		</>
	);
}

export default Header;
