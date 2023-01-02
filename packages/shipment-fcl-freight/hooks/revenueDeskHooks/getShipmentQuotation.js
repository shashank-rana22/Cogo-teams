import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useRef } from 'react';

const useGetShipmentQuotation = (shipment_id = '') => {
	const firstRender = useRef(true);
	const [{ data:listQuotationData, loading }, trigger] = useRequest(
		'/get_shipment_quotation',
		{ manual: true },
	);

	const getQuotation = async () => {
		try {
			const res = await trigger({
				params: {
					shipment_id,
				},
			});
			return res;
		} catch (err) {
			Toast.error('Something went wrong!');
		}
		return {};
	};

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		getQuotation();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipment_id]);

	return {
		service_charges: listQuotationData?.service_charges,
		loading,
	};
};

export default useGetShipmentQuotation;
