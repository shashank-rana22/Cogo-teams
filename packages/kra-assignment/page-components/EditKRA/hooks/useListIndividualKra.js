import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

function useListIndividualKra() {
	const { user = {} } = useSelector((state) => state?.profile);

	const [activeTab, setActiveTab] = useState('individual');

	const { id: user_id } = user;

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/list_individual_kra',
		method : 'GET',
	}, { manual: true });

	const listIndividualKra = useCallback(() => {
		try {
			trigger({
				params: {
					manager_user_id: '2fac2a22-dd10-49db-8a5e-ca6188d63cf8' || user_id,
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [trigger, user_id]);

	useEffect(() => {
		listIndividualKra();
	}, [listIndividualKra]);

	return {
		data,
		loading,
		listIndividualKra,
		setActiveTab,
		activeTab,
	};
}

export default useListIndividualKra;
