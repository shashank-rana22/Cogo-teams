import { useRequest } from '@cogoport/request';

const useManagerListItem = ({ item }) => {
	const months = ['January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	const d = new Date();

	const [{ data = {}, loading = false }] = useRequest({
		method : 'get',
		url    : 'list-user-feedbacks',
		params : {
			filters: {
				ManagerID : item.manager_id || '',
				month     : months[d.getMonth()],
				year      : d.getFullYear(),
			},
		},
	}, { manual: false });

	return { data, loading };
};

export default useManagerListItem;
