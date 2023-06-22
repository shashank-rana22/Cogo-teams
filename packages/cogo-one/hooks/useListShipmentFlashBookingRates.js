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
		status                                   : 'active',
		shipment_state                           : ['confirmed_by_importer_exporter'],
		is_reverted                              : false,
		booking_confirmation_preferences_not_set : true,
	},
};

const getParams = ({ activeTab, orgId, page }) => ({
	filters: {
		service_provider_id: orgId,
		...(PAYLOAD_MAPPING[activeTab] || {}),
	},
	shipment_flash_booking_tag_required : true,
	is_indicative_price_required        : true,
	page,
	sort_by                             : 'created_at',
	sort_type                           : 'desc',
});

const useListShipmentFlashBookingRates = ({
	orgId = '',
	hasFlashBookings = false,
}) => {
	const [activeTab, setActiveTab] = useState('win_bookings');

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_flash_booking_rates',
		method : 'get',
	}, { manual: true });

	const shipmentFlashBookingRates = useCallback(({ page }) => {
		if (!hasFlashBookings) {
			return;
		}

		try {
			trigger({
				params: getParams({ activeTab, orgId, page }),
			});
		} catch (error) {
			console.error('error:', error);
		}
	}, [activeTab, orgId, trigger, hasFlashBookings]);

	useEffect(() => {
		shipmentFlashBookingRates({ page: 1 });
	}, [shipmentFlashBookingRates]);

	return {
		data: (!loading && hasFlashBookings) ? data : {},
		loading,
		setActiveTab,
		activeTab,
		shipmentFlashBookingRates,
	};
};

export default useListShipmentFlashBookingRates;
