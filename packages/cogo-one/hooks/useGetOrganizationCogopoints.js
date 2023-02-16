// import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetOrganizationCogopoints = ({ activeMessageCard, activeVoiceCard, activeTab }) => {
	const { organization_id } = activeVoiceCard || {};
	const { organization_id: MessageOrgId } = activeMessageCard || {};

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
			id = MessageOrgId;
		}
		const res = await trigger({
			params: {
				organization_id: id,
			},
		});
		setPointData(res?.data || {});
	};

	useEffect(() => {
		fetchOrganizationCogopoint();
	}, [activeMessageCard, activeVoiceCard]);

	return {
		pointData,
		pointLoading: loading,
	};
};
export default useGetOrganizationCogopoints;
