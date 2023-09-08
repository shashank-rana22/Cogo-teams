import { useRequest } from '@cogoport/request';

function useGetPreApproveCreditDetails({ detail = {} }) {
	const { importer_exporter = {} } = detail || {};

	const [{ data }] = useRequest({
		method : 'get',
		url    : '/get_organization_credit_severity',
		params : {
			organization_id: importer_exporter?.id,
		},
	}, { manual: false });

	return {
		data,
	};
}

export default useGetPreApproveCreditDetails;
