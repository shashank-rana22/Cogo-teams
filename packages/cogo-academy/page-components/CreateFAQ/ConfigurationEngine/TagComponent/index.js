import Header from './Header';
import TagsTable from './TagsTable';

function TagComponent({ configurationPage, setConfigurationPage }) {
	return (
		<div>
			<Header
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
			/>
			<TagsTable />

		</div>
	);
}

export default TagComponent;
