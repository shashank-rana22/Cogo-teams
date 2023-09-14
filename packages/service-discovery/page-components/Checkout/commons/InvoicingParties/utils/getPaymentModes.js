import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const DEFAULT_DOCUMENT_CATEGORY = 'mbl';

const getPaymentModes = ({
	editInvoiceDetails = {},
	invoicingParties = [],
	optionsObj = {},
	setEditInvoiceDetails = () => {},
	finalPaymentTerms = {},
	finalPaymentMethods = {},
	documentCategoryPreference = {},
	payLaterStatus = {},
	documentCategory = '',
	documentTypePreference = {},
	documentType = '',
	documentDeliveryPreference = {},
	documentDeliveryMode = '',
}) => {
	const {
		paymentMode = 'cash',
		paymentTerms = '',
		paymentMethods = '',
	} = editInvoiceDetails.paymentModes || {};

	return invoicingParties.reduce(
		(acc, { id = '', organization_trade_party_id = '' }) => {
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
									paymentMode: i,
									paymentTerms:
										finalPaymentTerms?.[i]?.[GLOBAL_CONSTANTS.zeroth_index]
											?.value,
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
									paymentTerms: i,
									paymentMethods:
										finalPaymentMethods?.[i]?.[GLOBAL_CONSTANTS.zeroth_index]
											?.value,
									documentCategory:
										payLaterStatus?.paylater_eligibility
										&& !isEmpty(documentCategoryPreference?.[i])
											? documentCategoryPreference?.[i]?.[
												GLOBAL_CONSTANTS.zeroth_index
											]?.value || DEFAULT_DOCUMENT_CATEGORY
											: undefined,
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
									...creditDetails,
									paymentMethods: i,
									documentCategory:
										documentCategoryPreference?.[i]?.[
											GLOBAL_CONSTANTS.zeroth_index
										]?.value,
								},
								documentCategory:
									documentCategoryPreference?.[i]?.[
										GLOBAL_CONSTANTS.zeroth_index
									]?.value,
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
										documentTypePreference?.[i]?.[GLOBAL_CONSTANTS.zeroth_index]
											?.value,
								},
								documentCategory: i,
								documentType:
									documentTypePreference?.[i]?.[GLOBAL_CONSTANTS.zeroth_index]
										?.value,
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
										documentDeliveryPreference?.[i]?.[
											GLOBAL_CONSTANTS.zeroth_index
										]?.value,
								},
								documentType: i,
								documentDeliveryMode:
									documentDeliveryPreference?.[i]?.[
										GLOBAL_CONSTANTS.zeroth_index
									]?.value,
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
		},
		{},
	);
};

export default getPaymentModes;
