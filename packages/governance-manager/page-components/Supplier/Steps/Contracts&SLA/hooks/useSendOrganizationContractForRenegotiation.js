import { useRequest } from '@cogoport/request';

// this will get called in step 2
function useSendOrganizationContractForRenegotiation({
	organization_id,
	stage_of_approval,
	service,
	getOrganizationService,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/send_organization_contract_for_renegotiation',
	}, { manual: true });

	const SendOrganizationContractForRenegotiation = async () => {
		try {
			await trigger({
				params: {
					stage_of_approval,
					organization_id,
					service,
				},
			});
			getOrganizationService();
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		SendOrganizationContractForRenegotiation,
	};
}

export default useSendOrganizationContractForRenegotiation;
