import { Input, Select } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { useTranslation } from 'next-i18next';
import { useEffect, useState, useCallback, useRef } from 'react';

import styles from './styles.module.css';

function Filter({ hookSetters = () => {}, filters }) {
	const { t } = useTranslation(['milestone']);

	const setValueRef = useRef();
	setValueRef.current = (name, e) => {
		hookSetters.setFilters((prev) => ({ ...prev, [name]: e, page: 1 }));
	};
	const setValue = useCallback((name, e) => {
		hookSetters.setFilters((prev) => ({ ...prev, [name]: e, page: 1 }));
	}, [hookSetters]);

	const [inputValue, setInputValue] = useState('');
	const { query, debounceQuery } = useDebounceQuery();
	const debouncedQuery = useCallback(debounceQuery, [debounceQuery]);

	useEffect(() => {
		debouncedQuery(inputValue);
	}, [inputValue, debouncedQuery, setValue]);

	useEffect(() => {
		setValueRef.current('search_term', query);
	}, [query]);

	return (
		<div className={styles.container}>
			<AsyncSelect
				name="shipping_line_id"
				placeholder={t('milestone:filter_opertor_placeholder')}
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
				placeholder={t('milestone:filter_source_placeholder')}
				options={[
					{ label: t('milestone:filter_source_opt_1'), value: 'tracking_job' },
					{ label: t('milestone:filter_source_opt_2'), value: 'default' },
					{ label: t('milestone:filter_source_opt_3'), value: 'ldb' },
				]}
				style={{ width: '200px' }}
				onChange={(e) => setValue('source', e)}
				value={filters.source}
				isClearable
			/>
			<Select
				name="status"
				placeholder={t('milestone:filter_status_placeholder')}
				style={{ width: '200px' }}
				onChange={(e) => setValue('status', e)}
				value={filters.status}
				options={[
					{ label: t('milestone:filter_status_opt_1'), value: 'active' },
					{ label: t('milestone:filter_status_opt_2'), value: 'inactive' },
					{ label: t('milestone:filter_status_opt_3'), value: 'unmapped' },
				]}
				isClearable
			/>
			<Input
				name="search_term"
				placeholder={t('milestone:filter_search_placeholder')}
				style={{ width: '320px' }}
				onChange={(e) => setInputValue(e)}
				value={inputValue}
				isClearable
			/>
		</div>
	);
}
export default Filter;
