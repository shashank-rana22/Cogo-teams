import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const PAYLOAD_MAPPING = {
	reverted_bookings: {
		status         : 'active',
		shipment_state : ['confirmed_by_importer_exporter'],
		is_reverted    : true,
	},
	closed_bookings: {
		shipment_state: ['confirmed_by_importer_exporter', 'in_progress', 'completed'],
	},
	win_bookings: {
		status         : 'active',
		shipment_state : ['confirmed_by_importer_exporter'],
		is_reverted    : false,
	},
};

const useListShipmentFlashBookingRates = ({
	orgId = '',
	accountType = '',
}) => {
	const [activeTab, setActiveTab] = useState('win_bookings');

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_flash_booking_rates',
		method : 'get',
	}, { manual: true });

	const shipmentFlashBookingRates = useCallback(async ({ page }) => {
		if (!orgId || accountType !== 'service_provider') {
			return;
		}

		const params = {
			filters: {
				service_provider_id: orgId,
				...(PAYLOAD_MAPPING[activeTab] || {}),
			},
			shipment_flash_booking_tag_required : true,
			is_indicative_price_required        : true,
			page,
			sort_by                             : 'created_at',
			sort_type                           : 'desc',
		};

		try {
			await trigger({
				params,
			});
		} catch (error) {
			console.log('error:', error);
		}
	}, [activeTab, orgId, trigger, accountType]);

	useEffect(() => {
		shipmentFlashBookingRates({ page: 1 });
	}, [shipmentFlashBookingRates]);

	return {
		data,
		loading,
		setActiveTab,
		activeTab,
		shipmentFlashBookingRates,
	};
};

export default useListShipmentFlashBookingRates;
