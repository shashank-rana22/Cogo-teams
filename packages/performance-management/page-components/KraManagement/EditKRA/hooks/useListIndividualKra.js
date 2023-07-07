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

	const [{ data, loading }] = useHarbourRequest({
		url    : '/list_individual_kra',
		method : 'GET',
		params : {
			manager_user_id: '2fac2a22-dd10-49db-8a5e-ca6188d63cf8' || user_id,
		},

	}, { manual: false });

	const handleManageKRA = () => {
		router.push('/performance-management/kra-management/manage-kra');
	};

	return {
		data,
		loading,
		setActiveTab,
		activeTab,
		handleManageKRA,
	};
}

export default useListIndividualKra;
