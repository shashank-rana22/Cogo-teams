/* eslint-disable max-len */
import { useState } from 'react';

import useListFaqTopics from '../hooks/useListFaqTopics';
import topicListColumns from '../TableConfigurations/topicListColumns';

import Header from './Header';
import TopicTable from './TopicTable';

function TopicComponent({ configurationPage, setConfigurationPage }) {
	const [searchTopicsInput, setSearchTopicssInput] = useState('');
	const { data, loading = false, activeTopic, setActiveTopic, topicCurrentPage, setTopicCurrentPage } = useListFaqTopics({ searchTopicsInput });

	return (
		<div>
			<Header
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
				activeTopic={activeTopic}
				setActiveTopic={setActiveTopic}
				searchTopicsInput={searchTopicsInput}
				setSearchTopicssInput={setSearchTopicssInput}
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
