import { useState } from 'react';

import useListFaqStats from '../../hooks/useListFaqStats';

import AllQuestionCardView from './AllQuestionCardView';
import AllTopicCardView from './AllTopicCardView';
import Filter from './Filter';

function Questions() {
	const props = useListFaqStats({});
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
