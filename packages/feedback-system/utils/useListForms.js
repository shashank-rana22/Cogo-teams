import { useRequest } from '@cogoport/request';

const useListForms = ({ formsParams = {} }) => {
	const [{ data, loading = false }] = useRequest({
		url    : 'list-forms/',
		method : 'get',
		params : { Filters: { ...formsParams } },
	}, { manual: false });

	return {
		data, loading,
	};
};

export default useListForms;
