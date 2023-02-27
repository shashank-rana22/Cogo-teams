import AudienceComponent from './AudienceComponent';
import CreateAudienceForm from './CreateAudienceForm';
import CreateForm from './CreateComponent';
import Header from './Header.js';
import useCreateFaq from './hooks/useCreateFaq';
import styles from './styles.module.css';
import TagComponent from './TagComponent';
import TopicComponent from './TopicComponent';

function ConfigurationEngine() {
	const {
		createFaqComponent,
		configurationPage = '',
		setConfigurationPage = () => {},
		control,
		handleSubmit = () => {},
		errors = {},
		setValue,
		reset,
	} = useCreateFaq();

	if (configurationPage === 'audience') {
		return (
			<CreateAudienceForm
				setConfigurationPage={setConfigurationPage}
			/>
		);
	}

	if (['tag', 'topic'].includes(configurationPage)) {
		return (
			<CreateForm
				viewType={configurationPage}
				setConfigurationPage={setConfigurationPage}
				control={control}
				handleSubmit={handleSubmit}
				errors={errors}
				createFaqComponent={createFaqComponent}
				setValue={setValue}
				reset={reset}
			/>
		);
	}

	return (

		<div className={styles.container}>
			<Header />

			<AudienceComponent
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
			/>

			<TagComponent
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
				reset={reset}
			/>

			<TopicComponent
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
				reset={reset}
			/>

		</div>

	);
}

export default ConfigurationEngine;
