import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateOrganizationTradeParty = ({
	createPoc = () => {},
	successMessage = 'Successfully Created',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_trade_party',
		method : 'POST',
	}, { manual: true });

	const getCreateParams = (val) => {
		const {
			organization_id,
			business_name,
			trade_party_type,
			country_id,
			address,
			registration_number,
		} = val || {};
		return {
			organization_id,
			business_name,
			trade_party_type,
			country_id,
			address,
			registration_number,
		};
	};

	const createTradeParty = async (val) => {
		try {
			const res = await trigger({ data: getCreateParams(val) });
			console.log('res:', res);

			if (!res.hasError) {
				Toast.success(successMessage);
				createPoc({ ...val, trade_party_id: res?.data?.id });
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	return {
		createTradeParty,
		createTradePartyLoading: loading,
	};
};

export default useCreateOrganizationTradeParty;
