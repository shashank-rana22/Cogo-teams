import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useContext } from 'react';

const useGetCrossEntityCreditNotes = () => {
	const { shipment_data = {} } = useContext(ShipmentDetailContext);

	const { id: shipment_id = '' } = shipment_data || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_cross_entity_credit_notes',
		method : 'GET',
		params : {
			filters: {
				shipment_id,
			},
		},

	}, { manual: false });

	return {
		loadingCECN      : loading,
		CECreditNoteData : data?.list || [],
		trigger,
	};
};

export default useGetCrossEntityCreditNotes;
