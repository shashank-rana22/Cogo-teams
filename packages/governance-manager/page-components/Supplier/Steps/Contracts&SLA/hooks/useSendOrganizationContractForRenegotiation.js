import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useRouter } from 'next/router';

function useSendOrganizationContractForRenegotiation({
	organization_service_id,
	contract_id,
	negotiationIds,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/send_organization_service_contract_for_renegotiation',
	}, { manual: true });

	const { push } = useRouter();

	const sendOrganizationContractForRenegotiation = async () => {
		try {
			await trigger({
				params: {
					organization_service_id,
					contract_id,
					config_ids: negotiationIds,
				},
			});
			Toast.success('Negotiation sent');
			push(
				'/governance-manager/',
				'/governance-manager/',
			);
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		sendOrganizationContractForRenegotiation,
	};
}

export default useSendOrganizationContractForRenegotiation;
