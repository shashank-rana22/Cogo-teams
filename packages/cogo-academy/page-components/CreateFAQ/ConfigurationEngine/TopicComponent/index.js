/* eslint-disable max-len */
import useListFaqTopics from '../hooks/useListFaqTopics';
import topicListColumns from '../TableConfigurations/topicListColumns';

import Header from './Header';
import TopicTable from './TopicTable';

function TopicComponent({ configurationPage, setConfigurationPage }) {
	const { data, loading = false, activeTopic, setActiveTopic, topicCurrentPage, setTopicCurrentPage } = useListFaqTopics();

	return (
		<div>
			<Header
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
				activeTopic={activeTopic}
				setActiveTopic={setActiveTopic}
			/>
			<TopicTable
				columns={topicListColumns}
				data={data}
				topicsLoading={loading}
				topicCurrentPage={topicCurrentPage}
				setTopicCurrentPage={setTopicCurrentPage}
			/>

		</div>
	);
}

export default TopicComponent;
