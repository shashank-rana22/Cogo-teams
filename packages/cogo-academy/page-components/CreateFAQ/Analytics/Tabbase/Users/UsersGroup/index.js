import AllTopic from './AllTopics';
import useAllAudience from './useAllAudience';

function UsersGroup() {
	const props = useAllAudience();
	const { data } = props;

	return data?.list.map((items) => (<AllTopic props={items} />));
}

export default UsersGroup;
