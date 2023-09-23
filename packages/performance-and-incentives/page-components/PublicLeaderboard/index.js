import { useState } from 'react';

import Body from './components/Body';
import Header from './components/Header';
import styles from './styles.module.css';

function PublicDashboard() {
	const [view, setView] = useState('kam_wise');

	return (
		<div className={styles.container}>
			<Header view={view} setView={setView} />

			<Body view={view} />
		</div>
	);
}

export default PublicDashboard;
