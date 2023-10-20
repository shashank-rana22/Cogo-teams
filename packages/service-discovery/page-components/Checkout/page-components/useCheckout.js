import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState } from 'react';

import useGetCheckout from '../hooks/useGetCheckout';
import useUpdateCheckout from '../hooks/useUpdateCheckout';

import AirCheckout from './AirCheckout';
import FclCheckout from './FclCheckout';
import FtlCheckout from './FtlCheckout';
import LtlCheckout from './LtlCheckout';

const MAPPING = {
	fcl_freight : FclCheckout,
	air_freight : AirCheckout,
	ftl_freight : FtlCheckout,
	ltl_freight : LtlCheckout,
};

const useCheckout = ({ query = {}, partner_id = '', checkout_type = '' }) => {
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
		importer_exporter = {},
	} = detail || {};

	const {
		credit_applicable = false,
		credit_source = '',
		is_any_invoice_on_credit = false,
	} = credit_details || {};

	const { is_tnc_accepted = false } = credit_terms_amd_condition || {};

	const { organization_settings = [], is_agent_allowed_to_book = false } = importer_exporter;

	const checkout_settings = organization_settings.filter(
		(setting) => setting.setting_type === 'checkout',
	)?.[GLOBAL_CONSTANTS.zeroth_index];

	const { setting_config: { assisted_booking_services = [] } = {} } = checkout_settings || {};

	const { updateCheckout, updateLoading } = useUpdateCheckout({ getCheckout, detail });

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

	const primaryService = Object.values(services || {}).find(
		(service) => service?.service_type === primary_service || !service?.trade_type,
	);

	const shouldEditMargin = !margin_approval_status && !quotation_email_sent_at;

	const showSendTncEmail = is_any_invoice_on_credit
		&& !is_tnc_accepted
		&& credit_source === 'pre_approved_clean_credit';

	const showOverallCreditRisk = credit_applicable
		&& credit_source === 'pre_approved_clean_credit'
		&& is_any_invoice_on_credit;

	const tncPresent =	Array.isArray(detail?.terms_and_conditions)
	&& !isEmpty(terms_and_conditions);

	const isSkippable =	!!importer_exporter?.skippable_checks
	&& importer_exporter?.skippable_checks?.includes('kyc');

	const kycShowCondition = importer_exporter_id
	&& importer_exporter?.kyc_status !== 'verified'
	&& !isSkippable
	&& checkout_type !== 'rfq';

	const isAssistedBookingNotAllowed =	!isEmpty(assisted_booking_services)
	&& (assisted_booking_services.includes('none')
		|| !assisted_booking_services.includes(primary_service))
		&& !is_agent_allowed_to_book;

	const checkoutData = useMemo(
		() => ({
			primaryService,
			detail,
			services : Object.values(services || {}),
			rate,
			conversions,
			checkout_id,
			loading,
			orgData  : importer_exporter,
			getCheckout,
			checkoutMethod,
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
			isAssistedBookingNotAllowed,
		}),
		[
			primaryService,
			detail,
			services,
			rate,
			conversions,
			checkout_id,
			loading,
			importer_exporter,
			getCheckout,
			checkoutMethod,
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
			isAssistedBookingNotAllowed,
		],
	);

	const resultsUrl = useMemo(() => {
		if (shipment_id) {
			return `/v2/${partner_id}/book/${search_id}/${importer_exporter_id}/${shipment_id}`;
		}
		return `/v2/${partner_id}/book/${search_id}`;
	}, [importer_exporter_id, partner_id, search_id, shipment_id]);

	const serviceDiscoveryUrl = useMemo(() => `/v2/${partner_id}/service-discovery`, [partner_id]);

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
		isShipmentCreated,
		setIsShipmentCreated,
		redirect_required,
		isLoadingStateRequired,
		setIsLoadingStateRequired,
	};
};

export default useCheckout;
