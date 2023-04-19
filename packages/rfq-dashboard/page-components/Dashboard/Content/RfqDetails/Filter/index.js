import { Checkbox, Button, Select } from '@cogoport/components';

import styles from './styles.module.css';

function Filter({ filterStore, setFilterStore }) {
	return (
		<div className={styles.container}>
			<div className={styles.checkbox_field}>
				<Checkbox label="Select All" value="a1" />
				<Button>Approve Selected</Button>
			</div>
			<Select
				size="sm"
				prefix="Sort By : "
				options={[{ label: 'Newest Arrival', value: 'newest' }, { label: 'old Arrival', value: 'old' }]}
				value={filterStore.sortBy}
				onChange={(val) => setFilterStore((prev) => ({ ...prev, sortBy: val }))}
			/>
		</div>
	);
}

export default Filter;
