import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useHarbourRequest } from '@cogoport/request';

const getFormattedDate = (value) => {
	if (!value || (value && value === '')) {
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

const useUpdateEmployeeDetails = ({ onClose, refetch, statsRefetch }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_employee_detail',
	}, { manual: true });

	const updateEmployeeDetails = async ({ values, id, formValues }) => {
		const {
			date_of_joining, cfpl_joining_date, resignation_date, absconding, lwp,
			cogo_freight, payroll_country_id, is_resigned, ...rest
		} = values;

		const finalPayload = {
			...rest,
			date_of_joining   : getFormattedDate(date_of_joining),
			cfpl_joining_date : cfpl_joining_date ? getFormattedDate(cfpl_joining_date) : undefined,
			resignation_date  : getFormattedDate(resignation_date),
			id,
		};

		const getChangedKeyValues = (obj1, obj2) => Object.entries(obj2).reduce((changedKeyValues, [key, value]) => {
			if (obj1[key] !== value) {
				return { ...changedKeyValues, [key]: value };
			}
			return changedKeyValues;
		}, {});

		const changedKeyValues = getChangedKeyValues(formValues, finalPayload);

		try {
			await trigger({
				data: {
					...changedKeyValues,
					is_resigned,
					absconding : getFormattedBoolean(absconding),
					lwp        : getFormattedBoolean(lwp),
				},
			});
			refetch();
			statsRefetch();
			Toast.success('Employee Details Updated Sucessfully');
			onClose();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data || 'Something went wrong'));
		}
	};

	return { loading, updateEmployeeDetails };
};

export default useUpdateEmployeeDetails;
