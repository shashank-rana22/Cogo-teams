import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const useListForms = ({ formsParams = {} }) => {
	const [pagination, setPagination] = useState(1);

	const [{ data, loading = false }, trigger] = useRequest({
		url    : 'list-forms',
		method : 'get',
	}, { manual: true });

	const getFormList = async () => {
		await trigger({ params: { ...formsParams, page: pagination || 1, page_limit: 10 } });
	};

	useEffect(() => {
		if (!isEmpty(formsParams)) {
			getFormList();
		}
	}, [formsParams, pagination]);

	return {
		data,
		loading,
		pagination,
		setPagination,
	};
};

export default useListForms;
