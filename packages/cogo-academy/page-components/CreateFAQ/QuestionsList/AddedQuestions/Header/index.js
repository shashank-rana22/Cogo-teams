import React from 'react';

import SearchInput from '../../../../../commons/SearchInput';

import FilterPopover from './FilterPopover';
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

			<div className={styles.filter_popover}>
				<FilterPopover />
			</div>
		</div>
	);
}

export default Header;
