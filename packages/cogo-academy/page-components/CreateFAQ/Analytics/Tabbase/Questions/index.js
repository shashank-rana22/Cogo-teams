import { useEffect, useState } from 'react';

import AllQuestionCardView from './AllQuestionCardView';
import AllTopicCardView from './AllTopicCardView';
import Filter from './Filter';

function Questions({ props = {}, date = '', setDate = () => {} }) {
	const [selectedItem, setSelectedItem] = useState('All_Questions');

	const { refetchStats = () => {} } = props || {};

	useEffect(() => {
		if (selectedItem === 'All_Questions') {
			refetchStats();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedItem]);

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
