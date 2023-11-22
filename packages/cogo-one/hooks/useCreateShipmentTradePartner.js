import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateOrganizationTradePartnerPoc = ({
	shipment_id = '',
	refetch = () => {},
	successMessage = 'Successfully Created',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organiation_trade_partner_poc',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ data: { ...val, shipment_id } });
			if (!res.hasError) {
				Toast.success(successMessage);
				refetch();
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useCreateOrganizationTradePartnerPoc;
