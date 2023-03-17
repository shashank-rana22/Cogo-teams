import AllUsers from './AllUsers';
import useAllAudience from './useAllAudience';

function UsersGroup() {
	const props = useAllAudience();
	const { data } = props;

	return data?.list.map((items) => (<AllUsers props={items} />));
}

export default UsersGroup;
