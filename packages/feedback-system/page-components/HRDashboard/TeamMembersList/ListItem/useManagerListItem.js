import { useRequest } from '@cogoport/request';

const useManagerListItem = ({ item }) => {
	const months = ['January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	const d = new Date();

	const [{ data = {}, loading = false }] = useRequest({
		method : 'get',
		url    : 'list-user-feedbacks',
		params : {
			ManagerID : item.manager_id || '',
			Month     : months[d.getMonth()],
			Year      : d.getFullYear(),
		},
	}, { manual: false });

	return { data, loading };
};

export default useManagerListItem;
