import { Checkbox, Button, Select } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';

import { SORT_OPTIONS } from '../../../../../constants';
import useBulkUpdateRfqState from '../../../../../hooks/useBulkUpdateRfqState';

import styles from './styles.module.css';

function Filter({
	data, filterStore, setFilterStore, checkedItems,
	selectAll, setCheckedItems, setSelectAll, getRfqsForApproval,
}) {
	const { bulkUpdateRfqState, loading } = useBulkUpdateRfqState({ getRfqsForApproval, setCheckedItems });

	const handleSelectAll = () => {
		setCheckedItems(!selectAll ? data : []);
		setSelectAll((prevSelectAll) => !prevSelectAll);
	};

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
				<Button
					onClick={handleApproveRfq}
					disabled={checkedItems.length === 0 || loading}
				>
					<IcMTick width="22px" height="22px" />
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
				onChange={(val) => setFilterStore((prev) => ({
					...prev,
					sortBy: val,
				}))}
			/>
		</div>
	);
}

export default Filter;
