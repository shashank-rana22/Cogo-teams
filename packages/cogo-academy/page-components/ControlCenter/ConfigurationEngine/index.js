import AudienceComponent from './AudienceComponent';
import CreateAudienceForm from './CreateAudienceForm';
import CreateForm from './CreateComponent';
import Header from './Header';
import useCreateFaq from './hooks/useCreateFaq';
import styles from './styles.module.css';
import TagComponent from './TagComponent';
import TopicComponent from './TopicComponent';

const CONFIGURATION_MAPPING = {
	audience : CreateAudienceForm,
	tag      : CreateForm,
	topic    : CreateForm,
};

function ConfigurationEngine() {
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
