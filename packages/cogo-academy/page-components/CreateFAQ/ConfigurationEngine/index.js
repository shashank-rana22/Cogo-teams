import AudienceComponent from './AudienceComponent';
import CreateForm from './CreateComponent';
import CreateUserForm from './CreateUserForm';
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
		return (<CreateUserForm setConfigurationPage={setConfigurationPage} />);
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
