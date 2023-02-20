import { IcMArrowDown } from '@cogoport/icons-react';
import React from 'react';

import SearchInput from '../../../../../commons/SearchInput';

import styles from './styles.module.css';

function Header({ searchInput, setSearchInput }) {
	return (
		<div className={styles.container}>
			<div className={styles.search}>
				<SearchInput
					value={searchInput}
					onChange={setSearchInput}
					size="md"
					placeholder="Search a question"
				/>
			</div>

			<div className={styles.filters}>
				Filter by tags
				{' '}
				<IcMArrowDown width={16} height={16} />
			</div>
		</div>
	);
}

export default Header;
