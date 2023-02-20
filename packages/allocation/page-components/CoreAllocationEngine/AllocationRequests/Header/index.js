import { Chips, Checkbox, Button, Toggle } from '@cogoport/components';
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
		onChangeCheckbox,
		bulkMode,
		selectAll,
		onItemChangeInChips,
		checkedRowsId,
		setShowModal,
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
						Create
					</Button>
				</div>
			</div>

			<div className={styles.bulk_update_container}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Checkbox
						label="Bulk update mode"
						checked={bulkMode}
						style={{ paddingLeft: '0px' }}
						onChange={(e) => onChangeCheckbox(e)}
						disabled={disabled}
					/>

					<Button
						size="sm"
						themeType="accent"
						disabled={!bulkMode || !isBulkUpdateMode}
						onClick={applyBulkFilter}
					>
						Apply Bulk Filter
					</Button>
				</div>

				<Button
					size="sm"
					themeType="primary"
					disabled={isEmpty(id)}
					onClick={() => setShowModal(true)}
				>
					Approve All
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
					key={bulkMode}
					selectedItems={selectAll}
					items={[{
						children : 'Select All',
						key      : 'select_all',
						disabled : !bulkMode,
					}]}
					onItemChange={onItemChangeInChips}
				/>
			</div>

		</>
	);
}

export default Header;
