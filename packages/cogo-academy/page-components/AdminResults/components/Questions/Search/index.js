import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Search({ searchQuestion = '', setSearchQuestion = () => {} }) {
	return (
		<div className={styles.container}>
			<Input
				size="md"
				placeholder="Search for a Question"
				value={searchQuestion}
				onChange={(search) => setSearchQuestion(search)}
				suffix={(
					<div className={styles.icon_container}>
						<IcMSearchlight />
					</div>
				)}
				style={{ width: 300 }}
			/>
		</div>
	);
}

export default Search;
