import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import FormatData from '../utils/formatData';

const useGetOrganization = ({ activeMessageCard, activeVoiceCard, activeTab }) => {
	// const { organization_id } = activeVoiceCard || {};
	// const { organization_id: orgId, user_id } = getActiveCardDetails(activeMessageCard);
	const {
		orgId = '',
	} = FormatData({ activeMessageCard, activeTab, activeVoiceCard });

	const [{ loading }, trigger] = useRequest({
		url    : '/get_organization',
		method : 'get',
	}, { manual: true });

	const [organizationData, setOrganizationData] = useState(null);

	const fetchOrganization = async () => {
		// let id = '';
		// if (activeTab === 'voice') {
		// 	id = orgId;
		// } else {
		// 	id = orgId;
		// }
		const res = await trigger({
			params: {
				id                 : orgId,
				user_data_required : true,
			},
		});
		setOrganizationData(res?.data?.data || {});
	};

	useEffect(() => {
		if (orgId !== '') {
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
