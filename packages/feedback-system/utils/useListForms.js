import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const useListForms = ({ formsParams = {} }) => {
	const [pagination, setPagination] = useState(1);

	const [{ data:formsData = {}, loading = false }, trigger] = useRequest({
		url    : 'list-forms',
		method : 'get',
	}, { manual: true });

	const getFormList = async () => {
		await trigger({
			params: {
				Department  : formsParams.department,
				Designation : formsParams.designation,
				page        : pagination || 1,
				page_limit  : 10,
			},
		});
	};

	useEffect(() => {
		if (!isEmpty(formsParams)) {
			getFormList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formsParams, pagination]);

	return {
		formsData,
		loading,
		pagination,
		setPagination,
	};
};

export default useListForms;
