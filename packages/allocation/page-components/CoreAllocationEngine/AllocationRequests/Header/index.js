import { Chips, Checkbox, Button, Toggle } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import SearchInput from '../../../../common/SearchInput';

import ConfigFilters from './ConfigFilters';
import styles from './styles.module.css';

function Header(props) {
	const {
		onClickCreateReqBtn,
		loading,
		params,
		setParams,
		onChangeParams,
		debounceQuery,
		searchValue,
		setSearchValue,
		onClearSelection,
		applyBulkFilter,
		onChangeCheckbox,
		bulkMode,
		selectAll,
		onItemChangeInChips,
		checkedRowsId,
	} = props;

	const { service_type: toggleValue, id } = params.filters || {};

	const isBulkUpdateMode = !isEmpty(checkedRowsId);

	return (
		<>
			<div className={styles.container}>
				<Toggle
					name="allocation_type"
					size="md"
					offLabel="Organization"
					onLabel="Partner"
					disabled={loading}
					value={toggleValue}
					onChange={(e) => onChangeParams({
						filters:
					{ service_type: e?.target?.checked ? 'partner' : 'organization' },
					})}
				/>

				<div className={styles.filter_container}>
					<div className={styles.search_container}>
						<SearchInput
							size="sm"
							placeholder="Search by Organization name / User name"
							setGlobalSearch={setSearchValue}
							debounceQuery={debounceQuery}
							value={searchValue}
							disabled={loading}
						/>
					</div>

					<ConfigFilters
						params={params}
						setParams={setParams}
						disabled={loading}
					/>

					<Button
						size="md"
						themeType="accent"
						disabled={loading}
						onClick={onClickCreateReqBtn}
					>
						CREATE REQUEST
					</Button>
				</div>
			</div>

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
						disabled={!bulkMode || !isBulkUpdateMode}
						onClick={applyBulkFilter}
					>
						APPLY BULK FILTER
					</Button>
				</div>

				<Button
					size="sm"
					themeType="primary"
					disabled={isEmpty(id)}
					// onClick={() => {
					// 	setConfirmModalState(() => ({
					// 		type                  : 'approve_all',
					// 		relationData          : {},
					// 		showConfirmationModal : true,
					// 	}));
					// }}
				>
					APPROVE ALL
				</Button>
			</div>

			<div>
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

						<Button
							size="md"
							themeType="linkUi"
							onClick={() => onClearSelection()}
							style={{ backgroundColor: '#F8F2E7', padding: 0 }}
						>
							clear selection
						</Button>
					</div>
				)}

				<Chips
					selectedItems={selectAll}
					items={[{
						children : 'Select All',
						key      : 'select_all',
						disabled : !bulkMode,
					}]}
					onItemChange={onItemChangeInChips}
				/>
			</div>

			{/* // Todo modal for confirmation */}
		</>
	);
}

export default Header;
