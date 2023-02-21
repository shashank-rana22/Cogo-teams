import React, { useState } from 'react';

import CreateForm from './CreateComponent';
import Header from './Header.js';
import styles from './styles.module.css';
import TagComponent from './TagComponent';
import TopicComponent from './TopicComponent';

function ConfigurationEngine() {
	const [configurationPage, setConfigurationPage] = useState('dashboard');

	return (
		<div className={styles.container}>
			{configurationPage === 'dashboard'
				? (
					<div>
						<Header />
						<TagComponent
							configurationPage={configurationPage}
							setConfigurationPage={setConfigurationPage}
						/>
						<TopicComponent
							configurationPage={configurationPage}
							setConfigurationPage={setConfigurationPage}
						/>
					</div>
				) : <CreateForm viewType={configurationPage} setConfigurationPage={setConfigurationPage} />}

		</div>

	);
}

export default ConfigurationEngine;
