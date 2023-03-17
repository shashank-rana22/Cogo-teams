import AllTopic from './AllTopics';
import useAllTopicCardView from './useAllTopicCardView';

function AllTopicCardView({ date = '', setDate = () => {} }) {
	const props = useAllTopicCardView({ date, setDate });
	const { data } = props;

	return data?.list.map((items) => (<AllTopic props={items} />));
}

export default AllTopicCardView;
