import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListShipmentCreditNotes = ({ shipmentData = {} }) => {
	const [apiData, setApiData] = useState({});

	const { id: shipment_id = '' } = shipmentData || {};

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_credit_notes',
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
			const res = await trigger();

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getCreditNoteList();
	}, [getCreditNoteList]);

	return {
		loading,
		list    : apiData?.list || [],
		refetch : getCreditNoteList,
	};
};
export default useListShipmentCreditNotes;
