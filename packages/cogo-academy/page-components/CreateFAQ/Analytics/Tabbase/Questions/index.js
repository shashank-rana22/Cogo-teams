import { useState } from 'react';

import AllQuestionCardView from './AllQuestionCardView';
import AllTopicCardView from './AllTopicCardView';
import Filter from './Filter';

function Questions({ props }) {
	const [selectedItem, setSelectedItem] = useState('All_Questions');

	return (
		<div>
			<Filter selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
			{selectedItem === 'All_Questions' ? <AllQuestionCardView {...props?.data} />
				: <AllTopicCardView />}
		</div>

	);
}

export default Questions;
