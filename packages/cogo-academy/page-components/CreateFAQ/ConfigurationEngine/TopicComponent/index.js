import useListFaqTopics from '../hooks/useListFaqTopics';
import topicListColumns from '../TableConfigurations/topicListColumns';

import Header from './Header';
import TopicTable from './TopicTable';

function TopicComponent({ configurationPage, setConfigurationPage }) {
	const { data, topicCurrentPage, setTopicCurrentPage } = useListFaqTopics();

	return (
		<div>
			<Header
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
			/>
			<TopicTable
				columns={topicListColumns}
				data={data}
				topicCurrentPage={topicCurrentPage}
				setTopicCurrentPage={setTopicCurrentPage}
			/>

		</div>
	);
}

export default TopicComponent;
