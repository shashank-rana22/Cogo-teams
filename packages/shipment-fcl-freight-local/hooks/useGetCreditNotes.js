import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useContext, useCallback } from 'react';

const useGetCreditNotes = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const { id: shipment_id = '' } = shipment_data || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_local/get_credit_notes',
		method : 'GET',
		params : {
			shipment_id,
			additional_methods: ['services'],
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
