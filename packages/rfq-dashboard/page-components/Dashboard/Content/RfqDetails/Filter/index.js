import { Checkbox, Button, Select } from '@cogoport/components';

import { SORT_OPTIONS } from '../../../../../constants';
import useBulkUpdateRfqState from '../../../../../hooks/useBulkUpdateRfqState';

import styles from './styles.module.css';

function Filter({ data, filterStore, setFilterStore, checkedItems, selectAll, setCheckedItems, setSelectAll }) {
	const handleSelectAll = () => {
		setSelectAll(!selectAll);
		setCheckedItems(!selectAll ? data : []);
	};
	const { bulkUpdateRfqState } = useBulkUpdateRfqState();
	const handleApproveRfq = () => {
		const payload = checkedItems.map((item) => item.id);
		bulkUpdateRfqState({ payload });
	};

	return (
		<div className={styles.container}>
			<div className={styles.checkbox_field}>
				<Checkbox
					label="Select All"
					checked={selectAll}
					onChange={handleSelectAll}
				/>
				<Button onClick={handleApproveRfq}>
					Approve Selected (
					{checkedItems.length}
					)
				</Button>
			</div>
			<Select
				size="sm"
				prefix="Sort By : "
				options={SORT_OPTIONS}
				value={filterStore.sortBy}
				onChange={(val) => setFilterStore((prev) => ({ ...prev, sortBy: val }))}
			/>
		</div>
	);
}

export default Filter;
