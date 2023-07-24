/* eslint-disable max-lines-per-function */
import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { isEmpty, startCase } from '@cogoport/utils';

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

const getCreditLabel = ({ credit_data = {}, paymentTerm = '' }) => {
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
};

const getPaymentTermsLabel = ({ paymentTerm, detail }) => {
	const DOMESTIC_MAPPING = {
		prepaid : 'Pay at Origin',
		collect : 'Pay at Destination',
	};
	const CROSS_BORDER_MAPPING = {
		prepaid : ' Pay at origin by shipper',
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
				{' '}
				{'  '}
				<IcMInfo style={{ marginLeft: '4px' }} />
			</span>
		</Tooltip>
	);
};

const useGetPaymentModes = ({
	invoicingParties,
	detail = {},
	paymentModes = {},
	setEditInvoiceDetails = () => {},
	editInvoiceDetails,
}) => {
	const {
		services = {},
		primary_service = '',
		trade_type = '',
		importer_exporter = {},
		existing_shipment_id = '',
		id:checkout_id = '',
	} = detail;

	const { cogo_entity_id = '' } = importer_exporter;

	const {
		destination_country_id = '',
		origin_country_id = '',
		rate = {},
		country_id = '',
	} = services[detail?.primary_service_id];

	const { rate_id = '' } = rate;

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
		checkout_id,
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
	} = editInvoiceDetails || {};

	const optionsObj = Object.entries(data).reduce((acc, [orgTradePartyId, orgTradePartyData]) => {
		const modes = Object.keys(orgTradePartyData) || [];

		let creditDetails = {};

		const FINAL_CONFIG = {};

		const {
			paymentMode = 'cash',
			paymentTerms = '',
			paymentMethods = '',
		} = Object.values(paymentModes).find((item) => item.organization_trade_party_id === orgTradePartyId) || {};

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
						? getCreditLabel({ credit_data: credit_details, paymentTerm })
						: getPaymentTermsLabel({ paymentTerm, detail }),
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

	const PAYMENT_MODES = invoicingParties.reduce((acc, { id = '', organization_trade_party_id = '' }) => {
		const {
			paymentMode = 'cash',
			paymentTerms = '',
			paymentMethods = '',
		} = editInvoiceDetails.paymentModes || {};

		const { creditDetails = {}, options = [] } = optionsObj[organization_trade_party_id] || {};

		return {
			...acc,
			[id]: [
				{
					label    : 'Mode of Payment',
					options,
					value    : paymentMode,
					style    : { flexBasis: '16%', paddingRight: '20px' },
					name     : 'paymentMode',
					onChange : (i) => {
						setEditInvoiceDetails((pv = {}) => ({
							...pv,
							paymentModes: {
								...(pv.paymentModes || {}),
								...creditDetails,
								paymentMode  : i,
								paymentTerms : finalPaymentTerms?.[i]?.[GLOBAL_CONSTANTS.zeroth_index]?.value,
							},
						}));
					},
				},
				{
					label    : 'Terms of Payment',
					options  : finalPaymentTerms[paymentMode] || [],
					value    : paymentTerms,
					name     : 'paymentTerms',
					style    : { flexBasis: '16%', paddingRight: '20px' },
					onChange : (i) => {
						setEditInvoiceDetails((pv = {}) => ({
							...pv,
							paymentModes: {
								...(pv.paymentModes || {}),
								...creditDetails,
								paymentTerms   : i,
								paymentMethods : finalPaymentMethods?.[i]?.[GLOBAL_CONSTANTS.zeroth_index]?.value,
							},
						}));
					},
				},
				{
					label    : 'Methods of payment',
					options  : finalPaymentMethods[paymentTerms] || [],
					value    : paymentMethods,
					name     : 'paymentMethods',
					style    : { flexBasis: '16%', paddingRight: '20px' },
					onChange : (i) => {
						setEditInvoiceDetails((pv = {}) => ({
							...pv,
							paymentModes: {
								...(pv.paymentModes || {}),
								paymentMethods: i,
							},
						}));
					},
				},
				{
					label    : 'Document Category',
					options  : documentCategoryPreference[paymentMethods] || [],
					value    : documentCategory,
					name     : 'documentCategory',
					style    : { flexBasis: '16%', paddingRight: '20px' },
					onChange : (i) => {
						setEditInvoiceDetails((pv = {}) => ({
							...pv,
							paymentModes: {
								...(pv.paymentModes || {}),
								documentType:
										documentTypePreference?.[i]?.[GLOBAL_CONSTANTS.zeroth_index]?.value,
							},
							documentCategory : i,
							documentType     : documentTypePreference?.[i]?.[GLOBAL_CONSTANTS.zeroth_index]?.value,
						}));
					},
				},
				{
					label    : 'Document Type',
					options  : documentTypePreference[documentCategory] || [],
					value    : documentType,
					name     : 'documentType',
					style    : { flexBasis: '16%', paddingRight: '20px' },
					onChange : (i) => {
						setEditInvoiceDetails((pv = {}) => ({
							...pv,
							paymentModes: {
								...(pv.paymentModes || {}),
								documentDeliveryMode:
										documentDeliveryPreference?.[i]?.[GLOBAL_CONSTANTS.zeroth_index]?.value,
							},
							documentType: i,
							documentDeliveryMode:
									documentDeliveryPreference?.[i]?.[GLOBAL_CONSTANTS.zeroth_index]?.value,
						}));
					},
				},
				{
					label    : 'Document Delivery Preference',
					options  : documentDeliveryPreference[documentType] || [],
					value    : documentDeliveryMode,
					name     : 'documentDeliveryMode',
					style    : { flexBasis: '20%' },
					span     : 4,
					onChange : (i) => {
						setEditInvoiceDetails((pv = {}) => ({
							...pv,
							paymentModes: {
								...(pv.paymentModes || {}),
							},
							documentDeliveryMode: i,
						}));
					},
				},
			],
		};
	}, {});

	return {
		loading,
		PAYMENT_MODES,
		paymentModes,
	};
};

export default useGetPaymentModes;
