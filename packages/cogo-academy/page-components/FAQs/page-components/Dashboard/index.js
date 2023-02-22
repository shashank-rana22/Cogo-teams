import React from 'react';

import PopularTags from '../PopularTags';
import SearchInput from '../SearchInput';
import TopicList from '../TopicList';

function Dashboard({ tabTitle }) {
	return (
		<div style={{ marginTop: 12 }}>
			<SearchInput								// TODOs
				value=""
				onChange=""
				size="md"
				placeholder="Search for a keyword or a question"
			/>

			<PopularTags />
			<TopicList tabTitle={tabTitle} />
		</div>
	);
}

export default Dashboard;
