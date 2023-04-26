import { Input, Select } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { useEffect, useState, useMemo ,useCallback} from 'react';

import styles from './styles.module.css';

function Filter({ hookSetters = () => {}, filters }) {
	const setValue = (name, e) => {
		hookSetters.setFilters((prev) => ({ ...prev, [name]: e }));
	};
	const [inputValue, setInputValue] = useState('');
	const { query, debounceQuery } = useDebounceQuery();
	const debouncedQuery = useCallback(debounceQuery, [debounceQuery]);
	useEffect(() => {
	  debouncedQuery(inputValue);
	}, [inputValue, debouncedQuery]);
	
	useMemo(() => {
		setValue('search_term', query);
	}, [query]);
	return (
		<div className={styles.container}>
			<AsyncSelect
				name="shipping_line_id"
				label="Shipping Line"
				placeholder="Enter Shipping Line"
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
				placeholder="Select Source"
				options={[
                	{ label: 'Tracking Job', value: 'tracking_job' },
                	{ label: 'Default', value: 'default' },
                	{ label: 'LDB', value: 'ldb' },
				]}
				style={{ width: '200px' }}
				onChange={(e) => setValue('source', e)}
				value={filters.source}
				isClearable
			/>
			<Select
				name="status"
				placeholder="Select Status"
				style={{ width: '200px' }}
				onChange={(e) => setValue('status', e)}
				value={filters.status}
				options={[
                	{ label: 'Active', value: 'active' },
                	{ label: 'Inactive', value: 'inactive' },
                	{ label: 'Unmapped', value: 'unmapped' },
				]}
				isClearable
			/>
			<Input
				name="search_term"
				placeholder="Search by Milestone/Standard Milestone"
				style={{ width: '320px' }}
				onChange={(e) => setInputValue(e)}
				value={inputValue}
				isClearable
			/>
		</div>
	);
}
export default Filter;
