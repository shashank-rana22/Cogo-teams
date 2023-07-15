import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const KRA_MIN_VALUE = 0;

const useAssignKRAs = ({
	inputValue, selectArray,
	getEmployeesWithLowWeightage,
	getUnassignedEmployee,
	setInputValue,
	resetObjects,
	setDeletedKraArray,
	deletedKraArray,
	getkrasAssigned,
}) => {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/assign_kra',
		method : 'post',
	}, { manual: true });

	const isKraNonEmpty = (inputValue || []).every((element) => element?.weightage > KRA_MIN_VALUE);

	const onClickSubmitKRAs = async () => {
		if (!isKraNonEmpty) {
			Toast.error('KRA should be more than 0');
			return;
		}
		try {
			await trigger({
				data: { kras_assigned: inputValue, employee_ids: selectArray, kra_removed: deletedKraArray },
			});

			getEmployeesWithLowWeightage();
			getUnassignedEmployee();
			getkrasAssigned();
			resetObjects();

			Toast.success('KRAs Assigned successfully!');
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	const onClickDeleteIcon = (id) => {
		const updatedKRAs = inputValue.filter((item) => item?.kra_assigned !== id);
		setInputValue(updatedKRAs);
		setDeletedKraArray([...deletedKraArray, id]);
	};

	return { onClickSubmitKRAs, loading, onClickDeleteIcon };
};

export default useAssignKRAs;
