import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

const getPayload = ({ filters }) => {
	const { employee_ids = [], ...rest } = filters || [];

	return {
		filters: {
			employee_ids,
			...rest,
		},
	};
};

function useGetkrasAssigned({ filters }) {
	const [selectAccordian, setSelectAccordian] = useState([]);
	const [selectAccordianObject, setSelectAccordianObject] = useState({});

	const [{ data, loading }, trigger] = useHarbourRequest(
		{
			url    : '/get_kras_assigned',
			method : 'GET',
		},
		{ manual: true },
	);

	const getkrasAssigned = useCallback(() => {
		const payload = getPayload({ filters });

		try {
			trigger({
				params: payload,
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(
					getApiErrorString(error?.response?.data) || 'Something went wrong',
				);
			}
		}
	}, [trigger, filters]);

	useEffect(() => {
		if (!isEmpty(filters)) {
			getkrasAssigned();
		}
	}, [getkrasAssigned, filters]);

	return {
		data,
		loading,
		getkrasAssigned,
		selectAccordian,
		setSelectAccordian,
		selectAccordianObject,
		setSelectAccordianObject,
	};
}

export default useGetkrasAssigned;
