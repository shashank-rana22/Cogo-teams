import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

const useListLogs = ({ source = '', logType }) => {
	const [params, setParams] = useState({
		Page       : 1,
		PageLimit  : 10,
		LogType    : logType,
		IsReviewed : source === 'hr_pip_dashboard',
	});

	const [{ data: employeeData = {}, loading = false }, trigger] = useIrisRequest({
		url    : 'get_iris_list_logs',
		method : 'get',
		params,
	}, { manual: false });

	const onSubmitModal = () => {
		try {
			trigger({ params });
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};

	const setPage = (p) => setParams({ ...params, Page: p });

	return {
		employeeData,
		loading,
		params,
		setParams,
		setPage,
		onSubmitModal,
	};
};

export default useListLogs;
