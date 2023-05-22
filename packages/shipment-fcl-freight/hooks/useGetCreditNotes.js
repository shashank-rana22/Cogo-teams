import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useContext, useCallback, useState } from 'react';

const useGetCreditNotes = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const [apiData, setApiData] = useState({});

	const { id: shipment_id = '' } = shipment_data || {};

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/get_credit_notes',
		method : 'GET',
		params : {
			shipment_id,
			additional_methods: ['services'],
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
		list      : apiData?.data || [],
		cnRefetch : getCreditNoteList,
	};
};
export default useGetCreditNotes;
