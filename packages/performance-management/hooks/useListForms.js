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

	const getFormList = async () => {
		try {
			await trigger({
				params: {
					Department  : formsParams.department,
					Designation : formsParams.designation,
					Page        : pagination || 1,
					PageLimit   : 10,
				},
			});
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
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
