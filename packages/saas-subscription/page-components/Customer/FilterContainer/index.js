import { Input, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function FilterContainer({ setGlobalFilters, refetchUserStats }) {
	const [searchTerm, setSearchTerm] = useState();
	const { debounceQuery, query } = useDebounceQuery();

	useEffect(() => {
		if (query !== null) {
			setGlobalFilters((prev) => ({
				...prev,
				page   : 1,
				search : query,
			}));
			refetchUserStats(query);
		}
	}, [query]);

	useEffect(() => {
		if (searchTerm !== null) {
			debounceQuery(searchTerm);
		}
	}, [searchTerm]);

	return (
		<div className={styles.container}>
			<Input
				size="sm"
				placeholder="Search By Id"
				prefix={<IcMSearchlight />}
				value={searchTerm}
				onChange={setSearchTerm}
				className={styles.input_box}
			/>
			<Button themeType="accent">Assign Plan</Button>
		</div>
	);
}

export default FilterContainer;
