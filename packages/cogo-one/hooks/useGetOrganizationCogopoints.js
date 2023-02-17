import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import getActiveCardDetails from '../utils/getActiveCardDetails';

const useGetOrganizationCogopoints = ({ activeMessageCard, activeVoiceCard, activeTab }) => {
	const { organization_id } = activeVoiceCard || {};
	const { organization_id: orgId, user_id } = getActiveCardDetails(activeMessageCard);

	const [{ loading }, trigger] = useRequest({
		url    : '/get_organization_cogopoint_profile',
		method : 'get',
	}, { manual: true });

	const [pointData, setPointData] = useState(null);

	const fetchOrganizationCogopoint = async () => {
		let id;
		if (activeTab === 'voice') {
			id = organization_id;
		} else {
			id = orgId;
		}
		const res = await trigger({
			params: {
				organization_id: id,
			},
		});
		setPointData(res?.data || {});
	};

	useEffect(() => {
		if (user_id !== null) {
			fetchOrganizationCogopoint();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard, activeVoiceCard]);

	return {
		pointData,
		pointLoading: loading,
	};
};
export default useGetOrganizationCogopoints;
