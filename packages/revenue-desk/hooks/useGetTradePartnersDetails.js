import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useGetTradePartnersDetails = ({ shipment_id = '' }) => {
	const [apiData, setApiData] = useState({});
	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipment_trade_partners',
		params : {
			filters: {
				shipment_id,
			},
			add_service_objects_required: true,
		},
	}, { manual: true });

	const getSupplierandShipper = (list) => {
		const TRADE_PARTNER_DETAILS = {};

		(list || []).forEach((row) => {
			if (
				row?.trade_party_type === 'shipper'
				|| row?.trade_party_type === 'consignee'
			) {
				TRADE_PARTNER_DETAILS[row?.trade_party_type] = {
					trade_party_type : row?.trade_party_type,
					trade_party_id   : row?.trade_party_id,
					name             : row?.trade_partner_details?.business_name,
				};
			}
		});
		return TRADE_PARTNER_DETAILS;
	};

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger({
			});

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (shipment_id) {
			apiTrigger();
		}
	}, [apiTrigger, shipment_id]);

	return {
		trade_partners_loading : loading,
		trade_partners_details : getSupplierandShipper(apiData?.list),
		trigger,
		tradePartnerData       : apiData,
	};
};

export default useGetTradePartnersDetails;
