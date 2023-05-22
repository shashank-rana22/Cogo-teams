import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SearchType() {
	return (
		<div>
			<Input
				size="xl"
				prefix={(
					<IcMSearchlight
						width={16}
						height={16}
						className={styles.search_icon}
					/>
				)}
				placeholder="Search here..."
				// value={searchValue}
				// onChange={(e) => setSearchValue(e.target.value)}s
			/>
		</div>
	);
}

export default SearchType;
