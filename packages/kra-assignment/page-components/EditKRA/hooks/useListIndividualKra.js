import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

function useListIndividualKra() {
	const { user = {} } = useSelector((state) => state?.profile);

	const [activeTab, setActiveTab] = useState('individual');

	const { id: user_id } = user;

	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_individual_kra',
			method : 'GET',
		},
		{ manual: true },
	);

	const listIndividualKra = useCallback(() => {
		try {
			trigger({
				params: {
					manager_user_id: 'cb6b0ef5-3a79-4a6f-a2a4-ea8f6908dfa4' || user_id,
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(
					getApiErrorString(error?.response?.data) || 'Something went wrong',
				);
			}
		}
	}, [trigger, user_id]);

	useEffect(() => {
		listIndividualKra();
	}, [listIndividualKra]);

	return {
		data: data?.list,
		loading,
		listIndividualKra,
		setActiveTab,
		activeTab,
	};
}

export default useListIndividualKra;
