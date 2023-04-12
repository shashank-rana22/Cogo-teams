import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import AudienceComponent from './AudienceComponent';
import CreateAudienceForm from './CreateAudienceForm';
import CreateForm from './CreateComponent';
import Header from './Header';
import useCreateFaq from './hooks/useCreateFaq';
import KeywordsComponent from './KeywordsComponent';
import styles from './styles.module.css';
import TagComponent from './TagComponent';
import TopicComponent from './TopicComponent';

const CONFIGURATION_MAPPING = {
	audience : CreateAudienceForm,
	tag      : CreateForm,
	topic    : CreateForm,
};

function ConfigurationEngine() {
	const [activeTab, setActiveTab] = useState('audience_groups');

	const props = useCreateFaq();

	const {
		configurationPage = '',
		setConfigurationPage = () => {},
		reset,
	} = props;

	if (['audience', 'tag', 'topic'].includes(configurationPage)) {
		const Component = CONFIGURATION_MAPPING[configurationPage];
		return (
			<Component
				{...props}
			/>
		);
	}

	return (
		<div className={styles.container}>

			<Header />

			<Tabs
				themeType="primary"
				fullWidth
				activeTab={activeTab}
				onChange={setActiveTab}
			>
				<TabPanel name="audience_groups" title="Audience Groups">
					<AudienceComponent
						configurationPage={configurationPage}
						setConfigurationPage={setConfigurationPage}
					/>
				</TabPanel>

				<TabPanel name="tags" title="Tags">
					<TagComponent
						configurationPage={configurationPage}
						setConfigurationPage={setConfigurationPage}
						reset={reset}
					/>
				</TabPanel>

				<TabPanel name="topics" title="Topics">
					<TopicComponent
						configurationPage={configurationPage}
						setConfigurationPage={setConfigurationPage}
						reset={reset}
					/>
				</TabPanel>

				<TabPanel name="keywords" title="Keywords">
					<KeywordsComponent
						configurationPage={configurationPage}
						setConfigurationPage={setConfigurationPage}
						reset={reset}
					/>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default ConfigurationEngine;
