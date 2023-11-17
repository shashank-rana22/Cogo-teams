import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetPayslipYears = () => {
	const [year, setYear] = useState(null);

	const [{ loading, data }] = useHarbourRequest({

		method: 'GET',

		url: '/list_employee_payslip_year',

	}, { manual: false });

	useEffect(() => {
		if (data) {
			setYear((data || [])[(data || []).length - GLOBAL_CONSTANTS.one]);
		}
	}, [data]);

	return { loading, data, year, setYear };
};

export default useGetPayslipYears;
