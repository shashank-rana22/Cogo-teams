import useListFaqTopic from '../../../../../FAQs/hooks/useListFaqTopic';

import AllTopic from './AllTopics';

function AllTopicCardView() {
	const props = useListFaqTopic();
	const { data } = props;

	return data?.list.map((items) => (<AllTopic props={items} />));
}

export default AllTopicCardView;
