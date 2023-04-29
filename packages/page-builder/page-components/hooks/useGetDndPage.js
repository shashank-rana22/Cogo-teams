import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

function useGetDndPage() {
	const router = useRouter();

	const { query = {} } = router;

	const [{ loading, data }] = useRequest({
		url    : '/get_page_builder_dynamic_page',
		method : 'get',
		params : {
			filters: {
				id: query.id,
			},

		},
	}, { manual: false });

	const { list = [] } = data || {};

	return {
		metaData: list[0],
		loading,
	};
}

export default useGetDndPage;
