import { useState } from 'react';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function PageView({ setShowDetail }) {
	const [activeTab, setActiveTab] = useState();
	return (
		<div className={styles.container}>
			<Header activeTab={activeTab} setActiveTab={setActiveTab} />
			<List setShowDetail={setShowDetail} />
		</div>
	);
}

export default PageView;
