import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

const useGetEmployeeLevels = () => {
	const { user = {} }	 = useSelector((state) => state?.profile || {});

	const [selectValue, setSelectValue] = useState('');
	const [selectedEmployees, setSelectedEmployees] = useState({});
	const [show, setShow] = useState(false);

	const [{ data, loading }] = useHarbourRequest({
		url    : '/get_employee_level',
		method : 'GET',
		params : {
			user_id: user?.id,
		},
	}, { manual: false });

	const { options, level } = data || {};

	const selectOptions = (options || []).map((element) => ({
		value : element,
		label : startCase(element),
	}));

	return {
		selectOptions,
		loading,
		selectValue,
		setSelectValue,
		selectedEmployees,
		setSelectedEmployees,
		show,
		setShow,
		level,
	};
};

export default useGetEmployeeLevels;
