import React from 'react';

import PopularTags from '../PopularTags';
import SearchInput from '../SearchInput';
import TopicList from '../TopicList';

function Dashboard(Tab) {
	return (
		<div className="heading-container">
			<br />
			<SearchInput
				value=""
				onChange=""
				size="md"
				placeholder="Search for a keyword or a question"
			/>
			<PopularTags />
			<TopicList Tabtitle={Tab.Tabtitle} />

		</div>
	);
}

export default Dashboard;
