import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useEffect, useContext, useCallback } from 'react';

const useGetCreditNotes = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { id: shipment_id = '' } = shipment_data || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_credit_notes',
		method : 'GET',
		params : {
			filters: {
				shipment_id,
				is_active: true,
			},
			combination_data_required: true,
		},
	}, { manual: true });

	const getCreditNoteList = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getCreditNoteList();
	}, [getCreditNoteList]);

	return {
		loading,
		list      : data?.data || [],
		cnRefetch : getCreditNoteList,
	};
};
export default useGetCreditNotes;
