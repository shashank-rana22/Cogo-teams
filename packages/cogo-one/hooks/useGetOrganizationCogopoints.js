import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import FormatData from '../utils/formatData';
// import getActiveCardDetails from '../utils/getActiveCardDetails';

const useGetOrganizationCogopoints = ({ activeMessageCard, activeVoiceCard, activeTab }) => {
	// const { organization_id } = activeVoiceCard || {};
	// const { organization_id: orgId, user_id } = getActiveCardDetails(activeMessageCard);

	const {
		orgId = '',
	} = FormatData({ activeMessageCard, activeTab, activeVoiceCard });

	const [{ loading }, trigger] = useRequest({
		url    : '/get_organization_cogopoint_profile',
		method : 'get',
	}, { manual: true });

	const [pointData, setPointData] = useState(null);

	const fetchOrganizationCogopoint = async () => {
		const res = await trigger({
			params: {
				organization_id: orgId,
			},
		});
		setPointData(res?.data || {});
	};

	useEffect(() => {
		if (orgId !== '') {
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
