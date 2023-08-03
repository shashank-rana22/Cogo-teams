import { isEmpty } from '@cogoport/utils';
import { useMemo, useState } from 'react';

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

const useCheckout = ({ query = {}, entity_types = [], partner_id = '', checkout_type = '' }) => {
	const [headerProps, setHeaderProps] = useState({});
	const [isShipmentCreated, setIsShipmentCreated] = useState(false);
	const [isLoadingStateRequired, setIsLoadingStateRequired] = useState(false);

	const {
		checkout_id = '',
		shipment_id = '',
		checkoutType = '',
		redirect_required = 'true',
	} = query;

	const { data = {}, loading, getCheckout } = useGetCheckout({ checkout_id, setIsLoadingStateRequired });

	const {
		detail = {},
		rate,
		currency_conversions: conversions,
		invoice,
		possible_subsidiary_services = [],
		activated_on_paylater = {},
		earnable_cogopoints = {},
	} = data;

	const {
		primary_service,
		services,
		importer_exporter_id = '',
		checkout_type: checkoutMethod = '',
		credit_details = {},
		margin_approval_status = '',
		quotation_email_sent_at = '',
		credit_terms_amd_condition = {},
		terms_and_conditions = [],
		source_id: search_id,
		state = '',
	} = detail || {};

	const {
		credit_applicable = false,
		credit_source = '',
		is_any_invoice_on_credit = false,
	} = credit_details || {};

	const { is_tnc_accepted = false } = credit_terms_amd_condition || {};

	const { updateCheckout, updateLoading } = useUpdateCheckout({ getCheckout, detail });

	const {
		data: orgData = {},
		loading: orgLoading,
	} = useGetOrganization({ importer_exporter_id });

	const BREADCRUMB_MAPPING = {
		draft: {
			label           : 'Add or Edit Margin',
			onClickFunction : () => updateCheckout({ values: { id: detail?.id, state: 'draft' } }),
			disabled        : ['draft', 'save_for_later'].includes(state),
		},
		locked: {
			label           : 'Preview Booking',
			onClickFunction : () => updateCheckout({ values: { id: detail?.id, state: 'locked' } }),
			disabled:
				state === 'locked'
				|| (['draft', 'save_for_later'].includes(state)
					&& !quotation_email_sent_at),
		},
		booking_confirmation: {
			label           : 'Set Invoicing Parties',
			onClickFunction : () => updateCheckout({
				values: { id: detail?.id, state: 'booking_confirmation' },
			}),
			disabled: state === 'booking_confirmation' || !quotation_email_sent_at,
		},
	};

	const isChannelPartner = entity_types?.includes('channel_partner')
		&& !entity_types?.includes('cogoport');

	const primaryService = Object.values(services || {}).find(
		(service) => service?.service_type === primary_service || !service?.trade_type,
	);

	const shouldEditMargin = !isChannelPartner
		&& !margin_approval_status
		&& !quotation_email_sent_at;

	const showSendTncEmail = is_any_invoice_on_credit
		&& !is_tnc_accepted
		&& credit_source === 'pre_approved_clean_credit';

	const showOverallCreditRisk = credit_applicable
		&& credit_source === 'pre_approved_clean_credit'
		&& is_any_invoice_on_credit;

	const tncPresent =	Array.isArray(detail?.terms_and_conditions)
	&& !isEmpty(terms_and_conditions);

	const isSkippable =	!!detail?.importer_exporter?.skippable_checks
	&& detail?.importer_exporter?.skippable_checks?.includes('kyc');

	const kycShowCondition = importer_exporter_id
	&& !orgLoading
	&& detail?.importer_exporter?.kyc_status !== 'verified'
	&& !isSkippable
	&& checkout_type !== 'rfq';

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
			checkoutMethod,
			isChannelPartner,
			shouldEditMargin,
			invoice,
			updateCheckout,
			updateLoading,
			showSendTncEmail,
			showOverallCreditRisk,
			kycShowCondition,
			tncPresent,
			headerProps,
			setHeaderProps,
			possible_subsidiary_services,
			checkoutType,
			activated_on_paylater,
			checkout_type,
			earnable_cogopoints,
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
			checkoutMethod,
			isChannelPartner,
			shouldEditMargin,
			invoice,
			updateCheckout,
			updateLoading,
			showSendTncEmail,
			showOverallCreditRisk,
			kycShowCondition,
			tncPresent,
			headerProps,
			possible_subsidiary_services,
			checkoutType,
			activated_on_paylater,
			checkout_type,
			earnable_cogopoints,
		],
	);

	const resultsUrl = useMemo(() => {
		if (shipment_id) {
			return `/v2/${partner_id}/book/${search_id}/${importer_exporter_id}/${shipment_id}`;
		}
		return `/v2/${partner_id}/book/${search_id}`;
	}, [importer_exporter_id, partner_id, search_id, shipment_id]);

	const serviceDiscoveryUrl = useMemo(() => `/v2/${partner_id}/service_discovery`, [partner_id]);

	return {
		resultsUrl,
		serviceDiscoveryUrl,
		checkoutData,
		state,
		BREADCRUMB_MAPPING,
		MAPPING,
		data,
		loading,
		primary_service,
		detail,
		headerProps,
		search_id,
		importer_exporter_id,
		isShipmentCreated,
		setIsShipmentCreated,
		redirect_required,
		isLoadingStateRequired,
		setIsLoadingStateRequired,
	};
};

export default useCheckout;
