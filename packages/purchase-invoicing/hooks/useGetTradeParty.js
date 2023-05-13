import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useRef, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const geo = getGeoConstants();

const useGetTradeParty = ({
	shipment_id = '',
	shipment_data = {},
}) => {
	const { query } = useSelector(({ general }) => ({
		query: general?.query,
	}));

	const [{ data }, trigger] = useRequest({
		url    : '/list_shipment_trade_partners',
		method : 'get',
	}, { manual: true });

	const getList = async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id      : shipment_id || query?.id,
						trade_party_type : 'shipper',
					},
					add_service_objects_required: true,
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	};

	const refetchList = () => {
		if (
			(shipment_id || query?.id)
			&& geo.uuid.fortigo_network_ids.includes(shipment_data?.importer_exporter_id)
			&& shipment_data?.shipment_type === 'ftl_freight'
		) {
			getList();
		}
	};

	const refetchListRef = useRef(refetchList);

	const handleRefetch = useCallback(
		() => { refetchListRef?.current(); },
		[refetchListRef],
	);

	useEffect(() => {
		handleRefetch();
	}, [handleRefetch]);

	return {
		tdata: data ?? [],
	};
};

export default useGetTradeParty;
