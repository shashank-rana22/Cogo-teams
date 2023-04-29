import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

function useGetDndComponent() {
	const router = useRouter();

	const { query = {} } = router;

	const [{ data, loading }] = useRequest({
		method : 'get',
		url    : '/get_page_builder_dynamic_page',
		params : { id: query.id },
	}, { manual: false });

	// const { data: pageConfiguration = '' } = data || {};

	// const metaData = JSON.parse(pageConfiguration);

	return {
		loading,
		// metaData,
	};
}

export default useGetDndComponent;
