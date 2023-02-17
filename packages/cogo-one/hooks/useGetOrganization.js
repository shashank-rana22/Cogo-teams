import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import getActiveCardDetails from '../utils/getActiveCardDetails';

const useGetOrganization = ({ activeMessageCard, activeVoiceCard, activeTab }) => {
	const { organization_id } = activeVoiceCard || {};
	const { organization_id: orgId, user_id } = getActiveCardDetails(activeMessageCard);

	const [{ loading }, trigger] = useRequest({
		url    : '/get_organization',
		method : 'get',
	}, { manual: true });

	const [organizationData, setOrganizationData] = useState(null);

	const fetchOrganization = async () => {
		let id;
		if (activeTab === 'voice') {
			id = organization_id;
		} else {
			id = orgId;
		}
		const res = await trigger({
			params: {
				id,
				user_data_required: true,
			},
		});
		setOrganizationData(res?.data?.data || {});
	};

	useEffect(() => {
		if (user_id !== null) {
			fetchOrganization();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard, activeVoiceCard]);

	return {
		organizationData,
		orgLoading: loading,
	};
};
export default useGetOrganization;
