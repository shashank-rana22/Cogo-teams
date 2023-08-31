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

	const KEYS_TO_DISPLAY = {
		name              : detail?.name,
		employee_code     : detail?.employee_code,
		department        : detail?.department,
		designation       : detail?.designation,
		reporting_manager : detail?.reporting_manager?.name,
		hrbp              : detail?.hrbp?.name,
		office_location   : detail?.office_location,
	};

	return { KEYS_TO_DISPLAY };
};

export default useEmployeeData;
