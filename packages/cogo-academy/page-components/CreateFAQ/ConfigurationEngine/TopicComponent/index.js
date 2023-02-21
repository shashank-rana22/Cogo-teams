import Header from './Header';
import TopicTable from './TopicTable';

function TopicComponent({ configurationPage, setConfigurationPage }) {
	return (
		<div>
			<Header
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
			/>
			<TopicTable />

		</div>
	);
}

export default TopicComponent;
