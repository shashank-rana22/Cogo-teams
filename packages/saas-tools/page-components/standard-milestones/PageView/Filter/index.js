import { Select } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';

import styles from './styles.module.css';

function Filter({ hookSetters = () => {}, filters }) {
	const setValue = (name, e) => {
		hookSetters.setFilters((prev) => ({ ...prev, [name]: e }));
	};
	return (
		<div className={styles.container}>
			<AsyncSelect
				name="shipping_line_id"
				label="Shpping Line"
				placeholder="Enter Shpping Line"
				asyncKey="shipping_lines"
				labelKey="business_name"
				valueKey="id"
				multiple
				onChange={(e) => setValue('shipping_line_id', e)}
				style={{ width: '300px' }}
				value={filters.shipping_line_id}
				isClearable
			/>

			<Select
				name="source"
				label="Source"
				placeholder="Enter Source"
				options={[
					{ label: 'Tracking Job', value: 'tracking_job' },
					{ label: 'Default', value: 'default' },
				]}
				style={{ width: '150px' }}
				onChange={(e) => setValue('source', e)}
				value={filters.source}
				isClearable

			/>
			<Select
				name="status"
				placeholder="Enter Source"
				style={{ width: '150px' }}
				onChange={(e) => setValue('status', e)}
				value={filters.status}
				options={[
					{ label: 'Active', value: 'active' },
					{ label: 'Inactive', value: 'inactive' },
					{ label: 'Unmapped', value: 'unmapped' },
				]}
				isClearable
			/>

		</div>
	);
}
export default Filter;
