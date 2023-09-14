import { useRequestPublic } from '@/packages/request';

const MAX_NEWS = 3;

const useGetNews = () => {
	const [{ loading, data }] = useRequestPublic({
		method : 'get',
		url    : '/datastore/tables/Notifications/rows',
		params : {
			published  : true,
			limit      : MAX_NEWS,
			sortOption : 'date',
		},
	}, { manual: false });

	return {
		loading, data: data?.rows || [],
	};
};

export default useGetNews;
