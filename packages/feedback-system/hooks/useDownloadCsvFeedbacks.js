import { useRequest } from '@cogoport/request';

const useDownloadCsvFeedbacks = ({ userId = '', key = '' }) => {
	const date = new Date();
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

	const [{ data = {} }, trigger] = useRequest({
		method : 'get',
		url    : 'list-user-feedbacks',
	}, { manual: true });

	const getUserListCsv = async () => {
		const response = await trigger({
			params: {
				download_csv : true,
				filters      : {
					...(key === 'users_under_manager' && { performed_by_id: userId }),
					created_at_greater_than: firstDay.toDateString(),
				},
			},
		});

		// eslint-disable-next-line no-undef
		window.open(response?.data, '_blank');
	};

	return {
		url: data,
		getUserListCsv,
	};
};

export default useDownloadCsvFeedbacks;
