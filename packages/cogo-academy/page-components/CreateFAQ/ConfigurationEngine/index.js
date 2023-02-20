import React from 'react';

import Header from './Header.js';
import styles from './styles.module.css';
import TagComponent from './TagComponent';
import TopicComponent from './TopicComponent';

function ConfigurationEngine() {
	return (
		<div className={styles.container}>
			<Header />
			<TagComponent />
			<TopicComponent />

		</div>

	);
}

export default ConfigurationEngine;
