import CreateForm from './CreateComponent';
import Header from './Header.js';
import useConfigurationEngine from './hooks/useConfigurationEngine';
import styles from './styles.module.css';
import TagComponent from './TagComponent';
import TopicComponent from './TopicComponent';

function ConfigurationEngine() {
	const {
		configurationPage = '',
		setConfigurationPage = () => {},
		onClickSaveButton = () => {},
		control,
		handleSubmit = () => {},
		errors = {},
		onClickTagSaveButton = () => {},
	} = useConfigurationEngine();

	return (
		<div className={styles.container}>
			{configurationPage === 'dashboard'
				? (
					<div>
						<Header />
						<TagComponent
							configurationPage={configurationPage}
							setConfigurationPage={configurationPage}
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
