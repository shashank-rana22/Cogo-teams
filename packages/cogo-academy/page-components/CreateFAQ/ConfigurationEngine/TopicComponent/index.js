/* eslint-disable max-len */
import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import useListFaqTopics from '../hooks/useListFaqTopics';
import topicListColumns from '../TableConfigurations/topicListColumns';

import Header from './Header';
import TopicTable from './TopicTable';
import useDeleteTopic from './useDeleteTopic';

function TopicComponent({ configurationPage, setConfigurationPage, reset }) {
	const router = useRouter();

	const [searchTopicsInput, setSearchTopicssInput] = useState('');

	const {
		data,
		loading = false,
		activeTopic,
		setActiveTopic,
		topicCurrentPage,
		setTopicCurrentPage,
		fetchFaqTopic,
	} = useListFaqTopics({ searchTopicsInput });

	const {
		onClickDeleteIcon = () => {},
		showPopOver,
		setShowPopOver,
		loading:updateApiLoading,
	} = useDeleteTopic({ fetchFaqTopic });

	const onClickEditTopic = (item) => {
		setConfigurationPage('topic');
		router.push(
			`/learning/faq/create/configuration?update=topic&id=${item.id}`,
			`/learning/faq/create/configuration?update=topic&id=${item.id}`,
		);
	};

	const { listColumns = [] } = topicListColumns({
		onClickEditTopic,
		onClickDeleteIcon,
		showPopOver,
		setShowPopOver,
		updateApiLoading,
		activeTopic,
	});

	useEffect(() => {
		setTopicCurrentPage(1);
	}, [activeTopic, setTopicCurrentPage]);

	return (
		<div>
			<Header
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
				activeTopic={activeTopic}
				setActiveTopic={setActiveTopic}
				searchTopicsInput={searchTopicsInput}
				setSearchTopicssInput={setSearchTopicssInput}
				reset={reset}
			/>
			<TopicTable
				columns={listColumns}
				activeTopic={activeTopic}
				data={data}
				topicsLoading={loading}
				topicCurrentPage={topicCurrentPage}
				setTopicCurrentPage={setTopicCurrentPage}
				reset={reset}
				setConfigurationPage={setConfigurationPage}
			/>

		</div>
	);
}

export default TopicComponent;
