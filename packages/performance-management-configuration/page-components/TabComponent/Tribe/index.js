import { useState } from 'react';

import Header from '../../../commons/CommonHeader';

import styles from './styles.module.css';

function Tribe() {
	const [search, setSearch] = useState('');

	return (
		<div className={styles.container}>
			<Header setSearch={setSearch} search={search} label="Tribe" />
		</div>
	);
}

export default Tribe;
