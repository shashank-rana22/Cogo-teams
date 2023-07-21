import { Breadcrumb, cl } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState } from 'react';

import Header from '../../../common/Header';
import { LoadingState } from '../commons/LoadingState';
import { CheckoutContext } from '../context';
import useGetCheckout from '../hooks/useGetCheckout';
import useGetOrganization from '../hooks/useGetOrganization';
import useUpdateCheckout from '../hooks/useUpdateCheckout';

import AirCheckout from './AirCheckout';
import FclCheckout from './FclCheckout';
import LclCheckout from './LclCheckout';
import styles from './styles.module.css';

const BREADCRUMB_MAPPING = {
	draft                : 'Add or Edit Margin',
	locked               : 'Preview Booking',
	booking_confirmation : 'Set Invoicing Parties',
};

const MAPPING = {
	fcl_freight : FclCheckout,
	lcl_freight : LclCheckout,
	air_freight : AirCheckout,
};

function Checkout({ checkout_type = '' }) {
	const { query, entity_types } = useSelector(({ general, profile }) => ({
		query        : general?.query,
		entity_types : profile?.partner?.entity_types,
	}));

	const [headerProps, setHeaderProps] = useState({});

	const { checkout_id = '', shipment_id = '' } = query;

	const { data = {}, loading, getCheckout } = useGetCheckout({ checkout_id });

	const {
		detail = {},
		rate,
		currency_conversions: conversions,
		invoice,
		possible_subsidiary_services = [],
	} = data;

	const {
		primary_service,
		services,
		importer_exporter_id = '',
		importer_exporter = {},
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
		// getOrganization,
	} = useGetOrganization({ importer_exporter_id });

	const { organization_settings = [], tags = [] } = importer_exporter || {};

	const isChannelPartner = entity_types?.includes('channel_partner')
		&& !entity_types?.includes('cogoport');

	const isOrgCP = (tags || []).includes('partner');

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
			isOrgCP,
			organization_settings,
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
			showSendTncEmail,
			showOverallCreditRisk,
			kycShowCondition,
			tncPresent,
			headerProps,
			possible_subsidiary_services,
		],
	);

	if (loading && isEmpty(data)) {
		return <LoadingState />;
	}

	const ActiveComponent = MAPPING[primary_service];

	if (!ActiveComponent) {
		return null;
	}

	const showAdditionalHeader = headerProps && !isEmpty(headerProps);

	const resultsUrl = () => {
		if (shipment_id) {
			return `/book/${search_id}/${importer_exporter_id}/${shipment_id}`;
		}
		return `/book/${search_id}/${importer_exporter_id}`;
	};

	return (
		<CheckoutContext.Provider value={checkoutData}>
			<div className={styles.container}>
				<Header
					data={detail}
					service_key="primary_service"
					activePage="checkout"
					loading={loading}
					headerProps={headerProps}
					showAdditionalHeader={showAdditionalHeader}
				/>

				<Breadcrumb className={styles.breadcrumb}>
					<Breadcrumb.Item
						label={<a href={resultsUrl()}>Service Discovery</a>}
					/>

					<Breadcrumb.Item label="Results" />

					{Object.entries(BREADCRUMB_MAPPING).map(([key, value]) => (
						<Breadcrumb.Item
							className={cl`${styles.Breadcrumb_item} ${key === state && styles.active}`}
							key={key}
							label={value}
						/>
					))}
				</Breadcrumb>

				<ActiveComponent state={state} />
			</div>
		</CheckoutContext.Provider>
	);
}

export default Checkout;
