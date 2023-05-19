import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useContext, useCallback, useState } from 'react';

const useListCreditNotes = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const [apiData, setApiData] = useState({});

	const { id: shipment_id = '' } = shipment_data || {};

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_credit_notes',
		params : {
			filters: {
				shipment_id,
				// is_active: true,
			},
			additional_methods: ['credit_note'],
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
		list      : apiData?.list || [],
		CNRefetch : getCreditNoteList,
	};
};
export default useListCreditNotes;
