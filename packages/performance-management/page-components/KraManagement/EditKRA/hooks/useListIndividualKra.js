import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const DEFAULT_ACTIVE_TAB = 'individual';

function useListIndividualKra() {
	const router = useRouter();

	const { user = {} } = useSelector((state) => state?.profile);
	const { id: user_id } = user;

	const [activeTab, setActiveTab] = useState(DEFAULT_ACTIVE_TAB);

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/list_individual_kra',
		method : 'GET',
		params : {
			manager_user_id: user_id,
		},

	}, { manual: false });

	const fetchIndividualKRA = () => {
		try {
			trigger({
				params: {
					manager_user_id: user_id,
				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	const handleManageKRA = () => {
		router.push('/performance-management/kra-management/manage-kra');
	};

	return {
		data,
		loading,
		setActiveTab,
		activeTab,
		handleManageKRA,
		fetchIndividualKRA,
	};
}

export default useListIndividualKra;
