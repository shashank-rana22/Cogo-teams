import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Search({ searchQuestion = '', setSearchQuestion = () => {}, debounceQuery = () => {} }) {
	const onSearch = (inputValue) => {
		setSearchQuestion(inputValue);
		debounceQuery(inputValue);
	};

	return (
		<div className={styles.container}>
			<Input
				size="md"
				placeholder="Search for a Question"
				onChange={onSearch}
				value={searchQuestion}
				suffix={(
					<div className={styles.icon_container}>
						<IcMSearchlight />
					</div>
				)}
				style={{ width: 300, height: '32px' }}
			/>
		</div>
	);
}

export default Search;
