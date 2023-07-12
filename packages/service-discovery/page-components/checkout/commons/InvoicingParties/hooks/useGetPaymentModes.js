import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

let PAYMENT_TERMS = {};

let PAYMENT_METHODS = {};

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

const getPaymentModeLabel = ({ payment_mode }) => {
	if (payment_mode === 'cash') {
		return startCase(payment_mode);
	}

	return 'Deferred Payment';
};

const getCreditPaymentTermsLabel = ({ payment_term }) => startCase(CREDIT_PAYMENT_TERMS_SHORT_FORM[payment_term]);

const getCreditLabel = ({ credit_data = {}, payment_term = '' }) => {
	const { available_credit_currency, available_credit } = credit_data || {};

	return (
		<Tooltip
			interactive
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
				{getCreditPaymentTermsLabel({ payment_term })}
				{available_credit
					? ` (Avl. bal: ${available_credit_currency} ${available_credit}) `
					: ''}
				{available_credit && <IcMInfo />}
			</span>
		</Tooltip>
	);
};

const getPaymentTermsLabel = ({ payment_term, detail }) => {
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
			content={
				detail?.trade_type === 'domestic'
					? DOMESTIC_MAPPING[payment_term]
					: CROSS_BORDER_MAPPING[payment_term]
			}
		>
			<span style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
				{startCase(payment_term)}
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
	setPaymentModes = () => {},
}) => {
	const {
		services = {},
		primary_service = '',
		trade_type = '',
		importer_exporter = {},
		existing_shipment_id = '',
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
	};

	const [{ data = {}, loading }] = useRequest(
		{
			url    : 'get_organization_trade_party_payment_modes',
			method : 'GET',
			params,
		},
		{ manual: false },
	);

	const optionsObj = Object.entries(data).reduce((acc, [orgTradePartyId, orgTradePartyData]) => {
		const { modes = [] } = orgTradePartyData || {};

		let creditDetails = {};

		const options = (modes || []).map((mode) => {
			const { payment_mode = '', credit_details = {} } = mode || {};

			const { payment_terms = [] } = mode;

			const obj = {
				children: getPaymentModeLabel({
					payment_mode,
					payment_terms,
					credit_details,
				}),
				key: payment_mode,
			};

			const PAYMENT_TERMS_ARR = [];

			(payment_terms || []).forEach((paymentTerm) => {
				const { payment_term = '' } = paymentTerm || {};

				const newObj = {
					children: Object.keys(PAYMENT_MODE_SHORT_FORM).includes(payment_term)
						? getCreditLabel({ credit_data: credit_details, payment_term })
						: getPaymentTermsLabel({ payment_term, detail }),
					key: payment_term,
				};

				const { payment_methods = [] } = paymentTerm || {};

				const PAYMENT_METHODS_ARR = [];

				(payment_methods || []).forEach((paymentMethod) => {
					const { payment_method = '' } = paymentMethod || {};

					const paymentMethodObj = {
						children : <div style={STYLES}>{startCase(payment_method)}</div>,
						key      : payment_method,
					};

					if (paymentMethod.is_active) {
						PAYMENT_METHODS_ARR.push(paymentMethodObj);
					}
				});

				PAYMENT_METHODS = {
					...PAYMENT_METHODS,
					[paymentTerm.payment_term]: PAYMENT_METHODS_ARR,
				};

				if (paymentTerm.is_active) {
					if (
						Object.keys(PAYMENT_MODE_SHORT_FORM).includes(
							paymentTerm.payment_term,
						)
					) {
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

			PAYMENT_TERMS = {
				...PAYMENT_TERMS,
				[mode.payment_mode]: PAYMENT_TERMS_ARR,
			};

			return mode.is_active && obj;
		}).filter((element) => element);

		return {
			...acc,
			[orgTradePartyId]: { creditDetails, options, id: orgTradePartyId },
		};
	}, {});

	const PAYMENT_MODES = Object.entries(optionsObj).reduce((acc, [orgTradePartyId, { creditDetails, options }]) => {
		const {
			paymentMode = 'cash',
			paymentTerms = '',
			paymentMethods = '',
		} = paymentModes[orgTradePartyId] || {};

		return {
			...acc,
			[orgTradePartyId]: [
				{
					label         : 'Mode of Payment',
					items         : options,
					selectedItems : paymentMode,
					style         : { flexBasis: '27%', paddingRight: '20px' },
					onItemChange  : (i) => {
						setPaymentModes((pv) => ({
							...pv,
							[orgTradePartyId]: {
								...pv[orgTradePartyId],
								...creditDetails,
								paymentMode  : i,
								paymentTerms : PAYMENT_TERMS?.[i]?.[GLOBAL_CONSTANTS.zeroth_index]?.value,
							},
						}));
					},
				},
				{
					label         : 'Terms of Payment',
					items         : PAYMENT_TERMS[paymentMode] || [],
					selectedItems : paymentTerms,
					style         : { flexBasis: '27%', paddingRight: '20px' },
					onItemChange  : (i) => {
						setPaymentModes((pv) => ({
							...pv,
							[orgTradePartyId]: {
								...pv[orgTradePartyId],
								...creditDetails,
								paymentTerms   : i,
								paymentMethods : PAYMENT_METHODS?.[i]?.[GLOBAL_CONSTANTS.zeroth_index]?.value,
							},
						}));
					},
				},
				{
					label         : 'Methods of payment',
					items         : PAYMENT_METHODS[paymentTerms] || [],
					selectedItems : paymentMethods,
					style         : { flexBasis: '56%' },
					onItemChange  : (i) => {
						setPaymentModes((pv) => ({
							...pv,
							[orgTradePartyId]: {
								...pv[orgTradePartyId],
								paymentMethods: i,
							},
						}));
					},
				},
			],
		};
	}, {});

	return {
		loading,
		PAYMENT_MODES,
	};
};

export default useGetPaymentModes;
