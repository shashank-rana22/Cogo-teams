import { useState } from 'react';

import AllQuestionCardView from './AllQuestionCardView';
import AllTopicCardView from './AllTopicCardView';
import Filter from './Filter';

function Questions({ props = {}, date = '', setDate = () => {} }) {
	const [selectedItem, setSelectedItem] = useState('All_Questions');

	return (
		<div>
			<Filter
				selectedItem={selectedItem}
				setSelectedItem={setSelectedItem}
				date={date}
				setDate={setDate}
			/>
			{selectedItem === 'All_Questions' ? (
				<AllQuestionCardView
					props={props?.data}

				/>
			)
				: <AllTopicCardView />}
		</div>
	);
}

export default Questions;
