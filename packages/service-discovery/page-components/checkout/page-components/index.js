import { useSelector } from '@cogoport/store';
import { useMemo } from 'react';

import { CheckoutContext } from '../context';
import useGetCheckout from '../hooks/useGetCheckout';
import useGetOrganization from '../hooks/useGetOrganization';
import useUpdateCheckout from '../hooks/useUpdateCheckout';

import AirCheckout from './AirCheckout';
import FclCheckout from './FclCheckout';
import LclCheckout from './LclCheckout';

const MAPPING = {
	fcl_freight : FclCheckout,
	lcl_freight : LclCheckout,
	air_freight : AirCheckout,
};

function Checkout() {
	const { query, entity_types } = useSelector(({ general, profile }) => ({
		query        : general?.query,
		entity_types : profile?.partner?.entity_types,
	}));

	const { checkout_id = '' } = query;

	const { data = {}, loading, getCheckout } = useGetCheckout({ checkout_id });

	const { updateCheckout, updateLoading } = useUpdateCheckout({ getCheckout });

	const {
		detail = {},
		rate,
		currency_conversions: conversions,
		invoice,
	} = data;

	const {
		primary_service,
		services,
		importer_exporter_id = '',
		importer_exporter = {},
		checkout_type: checkoutMethod = '',
	} = detail || {};

	const {
		data: orgData = {},
		loading: orgLoading,
		getOrganization,
	} = useGetOrganization({ importer_exporter_id });

	const { organization_settings = [], tags = [] } = importer_exporter || {};

	const isChannelPartner =		entity_types?.includes('channel_partner')
		&& !entity_types?.includes('cogoport');

	const isOrgCP = (tags || []).includes('partner');

	const primaryService = Object.values(services || {}).find(
		(service) => service?.service_type === primary_service || !service?.trade_type,
	);

	const shouldEditMargin =		!isChannelPartner
		&& !detail?.margin_approval_status
		&& !detail?.quotation_email_sent_at;

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
			isChannelPartner,
			shouldEditMargin,
			invoice,
			updateCheckout,
			updateLoading,
		}),
		[
			primaryService,
			detail,
			services,
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
			isChannelPartner,
			shouldEditMargin,
			invoice,
			updateCheckout,
			updateLoading,
		],
	);

	if (loading) {
		return null;
	}

	const ActiveComponent = MAPPING[primary_service];

	return (
		<CheckoutContext.Provider value={checkoutData}>
			<ActiveComponent />
		</CheckoutContext.Provider>
	);
}

export default Checkout;
