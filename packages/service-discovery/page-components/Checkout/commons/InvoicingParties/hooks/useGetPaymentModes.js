import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { isEmpty, startCase } from '@cogoport/utils';

import getPaymentModes from '../utils/getPaymentModes';

let finalPaymentTerms = {};

let finalPaymentMethods = {};

const STYLES = {
	'font-weight'   : '400',
	'margin-left'   : '4px',
	padding         : '2px 5px',
	width           : 'fit-content',
	'border-radius' : '4px',
};

const PAYMENT_MODE_SHORT_FORM = {
	pre_approved_clean_credit   : 'Pre Approved',
	paylater_clean_credit       : 'Paylater',
	paylater_rolling_credit     : 'Paylater',
	pre_approved_rolling_credit : 'Pre Approved',
};

const CREDIT_PAYMENT_TERMS_SHORT_FORM = {
	pre_approved_clean_credit   : 'Pre Approved Clean Deferred Payment',
	paylater_clean_credit       : 'Paylater Clean Deferred Payment',
	paylater_rolling_credit     : 'Paylater Rolling Deferred Payment',
	pre_approved_rolling_credit : 'Pre Approved Rolling Deferred Payment',
};

const getPaymentModeLabel = ({ mode }) => {
	if (mode === 'cash') {
		return startCase(mode);
	}

	return 'Deferred Payment';
};

const getOptionsArray = (obj) => {
	const finalArray = (Object.keys(obj) || []).map((item) => ({
		label : startCase(item),
		value : item,
	}));

	return finalArray;
};

const getCreditPaymentTermsLabel = ({ payment_term }) => startCase(CREDIT_PAYMENT_TERMS_SHORT_FORM[payment_term]);

function CreditLabel({ credit_data = {}, paymentTerm = '' }) {
	const { available_credit_currency, available_credit } = credit_data || {};

	return (
		<Tooltip
			interactive
			placement="bottom"
			content={
				available_credit ? (
					<>
						Please make sure you have sufficient credit limit at the time of
						sales invoice creation, otherwise, invoice will be created at cash
						automatically
					</>
				) : null
			}
		>
			<span
				style={{
					display       : 'flex',
					flexDirection : 'row',
					alignItems    : 'center',
				}}
			>
				{getCreditPaymentTermsLabel({ paymentTerm })}
				{available_credit
					? ` (Avl. bal: ${available_credit_currency} ${available_credit}) `
					: ''}
				{available_credit && <IcMInfo />}
			</span>
		</Tooltip>
	);
}

function PaymentTermsLabel({ paymentTerm = '', detail = {} }) {
	const DOMESTIC_MAPPING = {
		prepaid : 'Pay at Origin',
		collect : 'Pay at Destination',
	};
	const CROSS_BORDER_MAPPING = {
		prepaid : 'Pay at origin by shipper',
		collect : 'Pay at destination by consignee',
	};

	return (
		<Tooltip
			interactive
			placement="bottom"
			content={
				detail?.trade_type === 'domestic'
					? DOMESTIC_MAPPING[paymentTerm]
					: CROSS_BORDER_MAPPING[paymentTerm]
			}
		>
			<span style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
				{startCase(paymentTerm)}
				<IcMInfo style={{ marginLeft: '4px' }} />
			</span>
		</Tooltip>
	);
}

const useGetPaymentModes = ({
	invoicingParties,
	detail = {},
	setEditInvoiceDetails = () => {},
	editInvoiceDetails,
	activated_on_paylater = {},
}) => {
	const {
		services = {},
		primary_service = '',
		trade_type = '',
		importer_exporter = {},
		existing_shipment_id = '',
		id:checkout_id = '',
		risk_category = '',
	} = detail;

	const { cogo_entity_id = '' } = importer_exporter;

	const {
		destination_country_id = '',
		origin_country_id = '',
		rate = {},
		country_id = '',
	} = services[detail?.primary_service_id];

	const { rate_id = '' } = rate;

	const payLaterStatus = activated_on_paylater?.paylater_eligibility;

	const riskParams = primary_service === 'fcl_freight' && payLaterStatus
		? {
			risk_category: risk_category || undefined,
			checkout_id,
		}
		: {};

	const params = {
		origin_country_id      : origin_country_id || country_id,
		destination_country_id : destination_country_id || country_id,
		trade_party_ids        : invoicingParties.map(
			(invoiceParty) => invoiceParty?.organization_trade_party_id,
		),
		primary_service,
		trade_type,
		cogo_entity_id,
		rate_id,
		existing_shipment_id: existing_shipment_id || undefined,
		...riskParams,
	};

	const [{ data = {}, loading }] = useRequest(
		{
			url    : '/get_organization_trade_party_payment_modes',
			method : 'GET',
			params,
		},
		{ manual: isEmpty(invoicingParties) },
	);

	let documentCategoryPreference = {};
	let documentTypePreference = {};
	let documentDeliveryPreference = {};

	const {
		documentCategory = '',
		documentType = '',
		documentDeliveryMode = '',
		paymentModes = {},
	} = editInvoiceDetails || {};

	const optionsObj = Object.entries(data).reduce((acc, [orgTradePartyId, orgTradePartyData]) => {
		const modes = Object.keys(orgTradePartyData) || [];

		let creditDetails = {};

		const FINAL_CONFIG = {};

		const {
			paymentMode = 'cash',
			paymentTerms = '',
			paymentMethods = '',
		} = paymentModes;

		const options = (modes || []).map((mode) => {
			const currentPaymentModeData = orgTradePartyData[mode];

			const payment_terms = (Object.keys(currentPaymentModeData) || []).filter(
				(i) => i !== 'credit_details',
			);

			const credit_details = mode === 'credit' ? currentPaymentModeData?.credit_details : {};

			const obj = {
				label: getPaymentModeLabel({
					mode,
					payment_terms,
					credit_details,
				}),
				value: mode,
			};

			const PAYMENT_TERMS_ARR = [];

			(payment_terms || []).forEach((paymentTerm) => {
				const newObj = {
					label: Object.keys(PAYMENT_MODE_SHORT_FORM).includes(paymentTerm)
						? <CreditLabel credit_data={credit_details} paymentTerm={paymentTerm} />
						: <PaymentTermsLabel paymentTerm={paymentTerm} detail={detail} />,
					value: paymentTerm,
				};

				const payment_methods =	currentPaymentModeData[paymentTerm]?.service_payment_methods || [];

				const PAYMENT_METHODS_ARR = [];

				(payment_methods || []).forEach((paymentMethod) => {
					const {
						payment_method_name = '',
						service_document_handling_preferences = [],
					} = paymentMethod || {};

					const paymentMethodObj = {
						label : <div style={STYLES}>{startCase(payment_method_name)}</div>,
						value : payment_method_name,
					};

					PAYMENT_METHODS_ARR.push(paymentMethodObj);

					if (
						payment_method_name === paymentMethods
					&& paymentMode === mode
					&& paymentTerms === paymentTerm
					) {
						(service_document_handling_preferences || []).forEach((item) => {
							const { bl_category, bl_type, bl_delivery_mode } = item;

							if (!FINAL_CONFIG[bl_category]) {
								FINAL_CONFIG[bl_category] = {};
							}

							if (!FINAL_CONFIG[bl_category][bl_type]) {
								FINAL_CONFIG[bl_category][bl_type] = [];
							}

							FINAL_CONFIG[bl_category][bl_type].push(bl_delivery_mode);
						});
					}

					const docCategoryOptions = getOptionsArray(FINAL_CONFIG);

					Object.keys(FINAL_CONFIG).forEach((docCategory) => {
						const docTypeObj = FINAL_CONFIG[docCategory] || {};
						const docTypeOptions = getOptionsArray(docTypeObj);

						const docTypeArray = Object.keys(docTypeObj) || [];

						docTypeArray.forEach((docType) => {
							const deliveryOptions = docTypeObj[docType] || [];

							const deliveryoptions = deliveryOptions.map((del) => ({
								label : startCase(del),
								value : del,
							}));

							documentDeliveryPreference = {
								...documentDeliveryPreference,
								[docType]: deliveryoptions,
							};
						});

						documentTypePreference = {
							...documentTypePreference,
							[docCategory]: docTypeOptions,
						};
					});

					documentCategoryPreference = {
						...documentCategoryPreference,
						[payment_method_name]: docCategoryOptions,
					};
				});

				finalPaymentMethods = {
					...finalPaymentMethods,
					[paymentTerm]: PAYMENT_METHODS_ARR,
				};

				if (paymentTerm) {
					if (Object.keys(PAYMENT_MODE_SHORT_FORM).includes(paymentTerm)) {
						const { credit_days = 1, interest = 1 } = credit_details || {};

						creditDetails = {
							...creditDetails,
							credit_days,
							interest,
						};
					}

					PAYMENT_TERMS_ARR.push(newObj);
				}
			});

			finalPaymentTerms = {
				...finalPaymentTerms,
				[mode]: PAYMENT_TERMS_ARR,
			};

			return mode && obj;
		}).filter((element) => element);

		return {
			...acc,
			[orgTradePartyId]: { creditDetails, options, id: orgTradePartyId },
		};
	}, {});

	const PAYMENT_MODES = getPaymentModes({
		editInvoiceDetails,
		invoicingParties,
		optionsObj,
		setEditInvoiceDetails,
		finalPaymentTerms,
		finalPaymentMethods,
		documentCategoryPreference,
		payLaterStatus,
		documentCategory,
		documentTypePreference,
		documentType,
		documentDeliveryPreference,
		documentDeliveryMode,
	});

	return {
		loading,
		PAYMENT_MODES,
	};
};

export default useGetPaymentModes;
