import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useEmployeeData = () => {
	const { user = {} } = useSelector((state) => state.profile);
	const { id: user_id } = user || {};

	const [{ data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_details',
	}, { manual: true });

	const fetch = useCallback(() => { trigger({	params: { user_id } }); }, [trigger, user_id]);

	useEffect(() => { fetch(); }, [fetch]);

	const { detail = {} } = data || {};
	console.log('🚀 ~ file: useEmployeeDetail.js:19 ~ useEmployeeData ~ detail:', detail);

	const KEYS_TO_DISPLAY = {
		employee_name   : 'Shivam SINgh',
		cogo_id         : detail?.employee_code,
		department      : detail?.department,
		designation     : detail?.designation,
		date_of_joining : formatDate({
			date       : detail?.date_of_joining,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		}),
		age_in_organization : '-',
		reporting_location  : '-',
		chapter             : '-',
		reporting_manager   : detail?.reporting_manager?.name,
		hrbp                : detail?.hrbp?.name,
		feedback_rating     : '-',
		personal_mail       : '-',
		reason_for_leaving  : '-',
	};

	return { KEYS_TO_DISPLAY };
};

export default useEmployeeData;
