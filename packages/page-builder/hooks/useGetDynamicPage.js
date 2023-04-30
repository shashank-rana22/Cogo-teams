import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

let metaData = {
	id      : 0,
	layouts : [],
	style   : {
		backgroundSize: 'cover',
	},
};

function useGetDynamicPage() {
	const router = useRouter();

	const { query = {} } = router;

	const [{ data, loading }] = useRequest({
		method : 'get',
		url    : '/get_page_builder_dynamic_page',
		params : { id: query.id },
	}, { manual: false });

	const { data: initialPageData = {} } = data || {};

	if (initialPageData && initialPageData.meta_data) {
		metaData = JSON.parse(initialPageData.meta_data);
	}

	return {
		loading,
		initialPageData,
		metaData,
	};
}

export default useGetDynamicPage;
