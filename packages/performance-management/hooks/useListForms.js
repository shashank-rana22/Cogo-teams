import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const useListForms = ({ formsParams = {} }) => {
	const [pagination, setPagination] = useState(1);

	const [{ data:formsData = {}, loading = false }, trigger] = useIrisRequest({
		url    : 'get_iris_list_forms',
		method : 'get',
	}, { manual: true });

	useEffect(() => {
		if (!isEmpty(formsParams)) {
			const { department, designation } = formsParams;

			try {
				trigger({
					params: {
						Department  : department,
						Designation : designation,
						Page        : pagination || 1,
						PageLimit   : 10,
					},
				});
			} catch (e) {
				Toast.error(e.response?.data.error?.toString());
			}
		}
	}, [formsParams, pagination, trigger]);

	return {
		formsData,
		loading,
		pagination,
		setPagination,
	};
};

export default useListForms;
