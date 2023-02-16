// import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetOrganization = ({ activeMessageCard, activeVoiceCard, activeTab }) => {
	const { organization_id } = activeVoiceCard || {};
	const { organization_id: MessageOrgId } = activeMessageCard || {};
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
			id = MessageOrgId;
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
		fetchOrganization();
	}, [activeMessageCard, activeVoiceCard]);

	return {
		organizationData,
		orgLoading: loading,
	};
};
export default useGetOrganization;
