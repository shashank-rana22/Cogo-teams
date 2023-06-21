import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useAssignKRAs = ({
	inputValue, selectArray,
	getEmployeesWithLowWeightage,
	getkrasAssigned,
	getUnassignedEmployee,
	setInputValue,
	setShowKRACalculationTable,
}) => {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/assign_kra',
		method : 'post',
	}, { manual: true });

	const onClickSubmitKRAs = async () => {
		try {
			await trigger({
				data: { kras_assigned: inputValue, employee_ids: selectArray },
			});

			getEmployeesWithLowWeightage();
			getkrasAssigned();
			getUnassignedEmployee();
			setShowKRACalculationTable(false);
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	const onClickDeleteIcon = (id) => {
		const updatedKRAs = inputValue.filter((item) => item.kra_assigned !== id);
		setInputValue(updatedKRAs);
	};

	return { onClickSubmitKRAs, loading, onClickDeleteIcon };
};

export default useAssignKRAs;
