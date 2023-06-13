import { useState } from 'react';

import Header from '../../../commons/CommonHeader';

// import styles from './styles.module.css';
import TableComponent from './TableComponent';

function Squad() {
	const [search, setSearch] = useState('');
	return (
		<div>
			<Header search={search} setSearch={setSearch} label="Squad" />
			<TableComponent />
		</div>
	);
}

export default Squad;
