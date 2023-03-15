import useListFaqTopic from '../../../../../FAQs/hooks/useListFaqTopic';

import AllTopic from './AllTopics';

function AllTopicCardView() {
	const props = useListFaqTopic();
	const { data } = props;
	console.log(data, 'props');
	return (
		<div>
			{data?.list.map((items) => (<AllTopic props={items} />))}

		</div>
	);
}

export default AllTopicCardView;
