import { useRequest } from '@cogoport/request';

const useGetTradeParties = ({ shipment_data = {} }) => {
	const { loading, data } = useRequest(
		'get',
		true,
	)('/list_organization_trade_parties', {
		params: {
			documents_data_required         : true,
			other_addresses_data_required   : true,
			poc_data_required               : true,
			billing_addresses_data_required : true,
			page_limit                      : 50,
			filters                         : {
				organization_id  : shipment_data?.importer_exporter_id,
				trade_party_type : 'self',
				status           : 'active',
			},
		},
	});

	return {
		loading,
		data,
	};
};

export default useGetTradeParties;
