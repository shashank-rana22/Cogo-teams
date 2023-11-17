import React from 'react';

import FilterContainer from './FilterContainer';
import styles from './styles.module.css';

function Header({
	setFilterParams = () => {},
	filterParams = {},
}) {
	return (
		<div className={styles.header_container}>
			<h3>SME Dashboard</h3>
			<FilterContainer
				setFilterParams={setFilterParams}
				filterParams={filterParams}
			/>
		</div>
	);
}

export default Header;
