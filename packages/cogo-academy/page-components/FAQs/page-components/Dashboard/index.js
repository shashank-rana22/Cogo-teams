import React, { useState } from 'react';

import PopularTags from '../PopularTags';
import SearchInput from '../SearchInput';
import TopicList from '../TopicList';

function Dashboard({ tabTitle }) {
	const [searchState, setSearchState] = useState('');

	return (
		<div style={{ marginTop: 12 }}>
			<SearchInput								// TODOs
				value={searchState}
				onChange={(val) => setSearchState(val)}
				size="md"
				placeholder="Search for a keyword or a question"
			/>

			<PopularTags />
			<TopicList tabTitle={tabTitle} searchState={searchState} />
		</div>
	);
}

export default Dashboard;
