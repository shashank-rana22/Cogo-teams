import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useContext, useCallback, useState } from 'react';

const useListShipmentCreditNotes = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const [apiData, setApiData] = useState({});

	const { id: shipment_id = '' } = shipment_data || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/list_shipment_credit_notes',
		method : 'GET',
		params : {
			filters: {
				shipment_id,
			},
			combination_data_required: true,
		},
	}, { manual: true });

	const getCreditNoteList = useCallback(async () => {
		try {
			const res = await trigger();
			setApiData(res.data || {});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getCreditNoteList();
	}, [getCreditNoteList]);

	return {
		loading,
		list      : apiData?.list || [],
		cnRefetch : getCreditNoteList,
	};
};
export default useListShipmentCreditNotes;
