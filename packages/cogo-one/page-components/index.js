import React, { useState } from 'react';

import Conversations from './Conversations';
import Customers from './Customers';
import styles from './styles.module.css';
import Tabs from './Tabs';

function CogoOne() {
	const [activeTab, setActiveTab] = useState('open');
	return (
		<>
			<div className={styles.header}>Cogo One</div>
			<div className={styles.layout_container}>
				<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
				<Customers />
				<Conversations />
			</div>
		</>
	);
}

export default CogoOne;
