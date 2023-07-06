import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import { CheckoutContext } from '../context';
import bookingConfirmationType from '../helpers/bookingConfirmationType';
import useGetCheckout from '../hooks/useGetCheckout';
import useGetOrganization from '../hooks/useGetOrganization';
import useUpdateCheckout from '../hooks/useUpdateCheckout';

import EditMargin from './EditMargin';
import PreviewBooking from './PreviewBooking';
import ShipmentExecution from './ShipmentExecution';

function Checkout() {
	const {
		query,
		userSettings,
		entity_types,
	} = useSelector(({ general, profile, userSettings: user_settings }) => ({
		query        : general?.query,
		userSettings : user_settings,
		entity_types : profile?.partner?.entity_types,
	}));

	const { checkout_id = '', checkoutType = '', rfq_id = '' } = query;

	const [bookingConfirmationMode, setBookingConfirmationMode] = useState('');
	const [checkoutState, setCheckoutState] = useState('shipment_execution');

	const {
		data = {},
		loading,
		getCheckout,
	} = useGetCheckout({ checkout_id });

	const {
		updateCheckout,
		updateLoading,
	} = useUpdateCheckout({ getCheckout });

	const { detail = {}, rate, currency_conversions: conversions, invoice } = data;

	const {
		primary_service,
		services,
		importer_exporter_id = '',
		importer_exporter = {},
		checkout_type: checkoutMethod = '',
	} = detail || {};

	const { organization_settings = [], tags = [] } = importer_exporter || {};

	const isChannelPartner = entity_types?.includes('channel_partner')
	&& !entity_types?.includes('cogoport');

	const isOrgCP = (tags || []).includes('partner');

	const {
		data: orgData = {},
		loading: orgLoading,
		getOrganization,
	} = useGetOrganization({ importer_exporter_id });

	const primaryService = Object.values(services || {}).find(
		(service) => service?.service_type === primary_service || !service?.trade_type,
	);

	const excludeWhatsapp = Boolean(checkoutType === 'rfq' || rfq_id);

	const shouldEditMargin = !isChannelPartner
	&& !detail?.margin_approval_status
	&& !detail?.quotation_email_sent_at;

	useEffect(() => {
		if (isEmpty(data)) {
			return;
		}
		if (bookingConfirmationMode) {
			return;
		}

		setBookingConfirmationMode(() => {
			const mode = bookingConfirmationType({
				organization_settings,
				userSettings,
			});

			if (mode) {
				if (mode === 'whatsapp' && excludeWhatsapp) { return isOrgCP ? 'mobile_otp' : 'booking_proof'; }

				return mode;
			}
			return isOrgCP ? 'mobile_otp' : 'booking_proof';
		});
	}, [bookingConfirmationMode, data, excludeWhatsapp, isOrgCP, organization_settings, userSettings]);

	const checkoutData = useMemo(
		() => ({
			primaryService,
			detail,
			services: Object.values(services || {}),
			rate,
			conversions,
			orgLoading,
			checkout_id,
			loading,
			orgData,
			getCheckout,
			isOrgCP,
			organization_settings,
			checkoutMethod,
			excludeWhatsapp,
			bookingConfirmationMode,
			setBookingConfirmationMode,
			isChannelPartner,
			shouldEditMargin,
			setCheckoutState,
			invoice,
			updateCheckout,
			updateLoading,
		}),
		// eslint-disable-next-line max-len
		[primaryService, detail, services, rate, conversions, orgLoading, checkout_id, loading, orgData, getCheckout, isOrgCP, organization_settings, checkoutMethod, excludeWhatsapp, bookingConfirmationMode, isChannelPartner, shouldEditMargin, invoice, updateCheckout, updateLoading],
	);

	const COMPONENT_MAPPING = {
		add_or_edit_margin: {
			Component : EditMargin,
			props     : {
				data,
				userSettings,
				rate,
			},
		},
		preview_booking: {
			Component : PreviewBooking,
			props     : {
				data,
				primaryService,
			},
		},
		shipment_execution: {
			Component: ShipmentExecution,
		},
	};

	const { Component:ActiveComponent, props:activeComponentProps } = COMPONENT_MAPPING[checkoutState];

	return (
		<CheckoutContext.Provider value={checkoutData}>
			<ActiveComponent
				{...activeComponentProps}
			/>
		</CheckoutContext.Provider>
	);
}

export default Checkout;
