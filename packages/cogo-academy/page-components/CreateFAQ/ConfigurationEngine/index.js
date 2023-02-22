import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import CreateForm from './CreateComponent';
import Header from './Header.js';
import useCreateFaqTag from './hooks/useCreateFaqTag';
import useCreateFaqTopic from './hooks/useCreateFaqTopic';
import styles from './styles.module.css';
import TagComponent from './TagComponent';
import TopicComponent from './TopicComponent';

function ConfigurationEngine() {
	const [configurationPage, setConfigurationPage] = useState('dashboard');

	const { onClickSaveButton } = useCreateFaqTopic();

	const { onClickSaveButton: onClickTagSaveButton } = useCreateFaqTag();

	const { control, handleSubmit, formState: { errors } } = useForm();

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
				) : (
					<CreateForm
						viewType={configurationPage}
						setConfigurationPage={setConfigurationPage}
						onClickSaveButton={onClickSaveButton}
						control={control}
						handleSubmit={handleSubmit}
						errors={errors}
						onClickTagSaveButton={onClickTagSaveButton}
					/>
				)}

		</div>

	);
}

export default ConfigurationEngine;
