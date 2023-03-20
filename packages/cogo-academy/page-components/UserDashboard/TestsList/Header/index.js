import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ searchInput, debounceQuery }) {
	const handleSearchQuery = (obj) => {
		debounceQuery(obj);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Tests</div>

			<div className={styles.input_container}>
				<Input
					size="sm"
					placeholder="Search for Test Name/Topic"
					value={searchInput}
					suffix={<div className={styles.icon_container}><IcMSearchlight /></div>}
					onChange={handleSearchQuery}
				/>
			</div>
		</div>
	);
}

export default Header;
