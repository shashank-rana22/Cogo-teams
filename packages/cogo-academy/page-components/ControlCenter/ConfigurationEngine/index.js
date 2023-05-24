import { Tabs, TabPanel } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
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

const TABS_MAPPING = {
	audience_groups : AudienceComponent,
	tags            : TagComponent,
	topics          : TopicComponent,
	keywords        : KeywordsComponent,
};

function ConfigurationEngine() {
	const [activeTab, setActiveTab] = useState('audience_groups');

	const props = useCreateFaq();

	const { configurationPage = '' } = props;

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
				{Object.keys(TABS_MAPPING).map((keys) => {
					const Component = TABS_MAPPING[keys];
					return (
						<TabPanel name={keys} title={startCase(keys || '')}>
							<Component
								{...props}
							/>
						</TabPanel>
					);
				})}

			</Tabs>
		</div>
	);
}

export default ConfigurationEngine;
