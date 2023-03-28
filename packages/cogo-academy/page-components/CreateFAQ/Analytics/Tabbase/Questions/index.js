import { useEffect, useState } from 'react';

import AllQuestionCardView from './AllQuestionCardView';
import AllTopicCardView from './AllTopicCardView';
import Filter from './Filter';

function Questions(props) {
	const [selectedItem, setSelectedItem] = useState('All_Questions');

	const { refetchStats = () => {}, date = {}, setDate = () => {} } = props || {};

	useEffect(() => {
		if (selectedItem === 'All_Questions') {
			refetchStats();
		}
	}, [refetchStats, selectedItem]);

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
				: <AllTopicCardView date={date} setDate={setDate} />}
		</div>
	);
}

export default Questions;
