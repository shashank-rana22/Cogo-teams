import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useHarbourRequest } from '@cogoport/request';

const getFormattedDate = (value) => {
	if (value && value === '') {
		return undefined;
	}

	return formatDate({
		date       : value,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'date',
	});
};

const getFormattedBoolean = (value) => {
	if (value && value === '') {
		return undefined;
	}

	const BOOLEAN_MAPPING = {
		true  : true,
		false : false,
	};

	return BOOLEAN_MAPPING[value];
};

const useUpdateEmployeeDetails = (onClose, refetch) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_employee_detail',
	}, { manual: true });

	const updateEmployeeDetails = async (values, id) => {
		const { date_of_joining, cfpl_joining_date, resignation_date, absconding, lwp, cogo_freight, ...rest } = values;

		try {
			await trigger({
				data: {
					...rest,
					date_of_joining   : getFormattedDate(date_of_joining),
					cfpl_joining_date : getFormattedDate(cfpl_joining_date),
					resignation_date  : getFormattedDate(resignation_date),
					absconding        : getFormattedBoolean(absconding),
					lwp               : getFormattedBoolean(lwp),
					id,
				},
			});
			refetch();
			Toast.success('Employee Details Updated Sucessfully');
			onClose();
		} catch (error) {
			console.log('error', error);
		}
	};

	return { loading, updateEmployeeDetails };
};

export default useUpdateEmployeeDetails;
