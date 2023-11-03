import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetManagerLevel = () => {
	const [activeTab, setActiveTab] = useState('functional_manager');

	const [{ data, loading }] = useHarbourRequest({
		url    : '/get_manager_level',
		method : 'GET',
	}, { manual: false });

	const { level, user_role } = data || {};

	return {
		loading,
		level,
		user_role,
		activeTab,
		setActiveTab,
	};
};

export default useGetManagerLevel;
