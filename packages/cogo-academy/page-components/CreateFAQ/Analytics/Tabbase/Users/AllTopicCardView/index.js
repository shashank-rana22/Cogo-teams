import AllTopic from './AllTopics';
import useAllTopicCardView from './useAllTopicCardView';

function AllTopicCardView() {
	const props = useAllTopicCardView();
	const { data } = props;

	return data?.list.map((items) => (<AllTopic props={items} />));
}

export default AllTopicCardView;
