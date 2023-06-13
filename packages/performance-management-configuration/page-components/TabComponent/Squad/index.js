import { useState } from 'react';

import Header from './Header';
import styles from './styles.module.css';
import TableComponent from './TableComponent';

function Squad() {
	const [search, setSearch] = useState('');
	return (
		<div className={styles.container}>
			<Header search={search} setSearch={setSearch} />
			<TableComponent />
		</div>
	);
}

export default Squad;
