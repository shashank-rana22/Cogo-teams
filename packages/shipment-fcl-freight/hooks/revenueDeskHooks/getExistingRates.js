import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetExistingRates = ({
	api,
	currentShipmentData,
	choosen,
}) => {
	const [{ data, loading }, trigger] = useRequest(
		'/get_shipment_elligible_booking_document',
		{ manual: true },
	);

	const getList = async () => {
		await trigger({
			params: {
				shipment_id : currentShipmentData?.id,
				page_limit  : 100,
			},
		});
	};

	useEffect(() => {
		if (choosen === 0) {
			getList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [api, choosen]);

	return {
		existingDataLoading : loading,
		existingData        : data,
	};
};

export default useGetExistingRates;
