import { useRequest } from '@cogoport/request';

const useListForms = ({ formsParams = {} }) => {
	const [{ data: formsData = {}, loading = false }] = useRequest({
		url    : 'list_forms',
		method : 'get',
		params : { filters: { ...formsParams } },
	});

	return {
		formsData, loading,
	};
};

export default useListForms;
