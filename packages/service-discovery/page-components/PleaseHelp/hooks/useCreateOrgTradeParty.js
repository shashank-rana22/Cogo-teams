import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const formatPocDetails = ({ data }) => data.map((poc) => {
	const {
		name = '',
		email = '',
		mobile_country_code = '',
		mobile_number = '',
	} = poc;

	return {
		name,
		email,
		mobile_country_code,
		mobile_number,
	};
});

const useCreateOrgTradeParty = ({
	organization = {},
	setActiveState = () => {},
	tradePartyType = {},
	setShowModal = () => [],
	savedDetails = {},
	setSavedDetails = () => [],
	source,
}) => {
	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/create_organization_trade_party',
		},
		{ manual: true },
	);

	const onSubmit = async (values = {}) => {
		let newFilledDetails = { ...savedDetails };

		const { value: tradePartyTypeValue = {} } = tradePartyType;

		if (tradePartyTypeValue === 'paying_party') {
			newFilledDetails = {
				...newFilledDetails,
				billing_address: values,
			};
		}

		if (tradePartyTypeValue === 'collection_party') {
			newFilledDetails = {
				...newFilledDetails,
				documents: values,
			};
		}

		setSavedDetails(newFilledDetails);

		try {
			const {
				company_details = {},
				billing_address = {},
				bank_details = {},
				documents = {},
			} = newFilledDetails;

			const {
				business_name = '',
				company_type = '',
				registration_number = '',
				verification_document = '',
			} = company_details;

			const {
				tax_number = '',
				tax_number_document_url = '',
				address_type = '',
				country_id = '',
				is_sez = false,
				sez_proof = '',
				isAddressRegisteredUnderGst = false,
				poc_details: pocDetails = [],
				billing_party_name = '',
				name = '',
				...restBillingAddressValues
			} = billing_address || {};

			const { image_url = '', ...restBankDetails } = bank_details;

			const {
				company_existence_proof = '',
				indemnification = '',
				verification_document: trade_party_verification_collection_party = {},
			} = documents;

			const orgPayingPartyDocs = [
				{
					name          : 'Trade Party Verification',
					document_type : 'verification_document',
					image_url     : verification_document,
					data          : {},
					source,
				},
			];

			if (isEmpty(pocDetails)) {
				Toast.info('Please create at-least one POC before proceeding ');
				return;
			}

			const formattedPocDetails = formatPocDetails({ data: pocDetails });

			const orgTradePartyDocs = [
				{
					name          : 'BankDetails',
					document_type : 'bank_account_details',
					image_url     : image_url.finalUrl || image_url || undefined,
					data          : { ...restBankDetails },
					source,
				},
				{
					name          : 'Company Existence Proof',
					document_type : 'business_address_proof',
					image_url:
						company_existence_proof.finalUrl
						|| company_existence_proof
						|| undefined,
					data: {},
					source,
				},
				{
					name          : 'Indemnification',
					document_type : 'indemnification_proof',
					image_url     : indemnification.finalUrl || indemnification || undefined,
					data          : {},
					source,
				},
				{
					name          : 'Trade Party Verification',
					document_type : 'verification_document',
					image_url:
						trade_party_verification_collection_party?.finalUrl
						|| trade_party_verification_collection_party
						|| undefined,
					data: {},
					source,
				},
			];

			const payload = {
				organization_id     : organization.id || undefined,
				business_name,
				company_type,
				registration_number : registration_number.toUpperCase(),
				country_id          : (company_details || {}).country_id,
				trade_party_type    : tradePartyType.value || undefined,
				is_tax_applicable   : !isAddressRegisteredUnderGst,
				poc_details         : formattedPocDetails,
				address_detail      : {
					...restBillingAddressValues,
					is_sez,
					sez_proof               : sez_proof || undefined,
					tax_number              : tax_number.toUpperCase() || undefined,
					tax_number_document_url : tax_number_document_url || undefined,
					address_type            : address_type || undefined,
					country_id              : country_id || undefined,
					name                    : billing_party_name || name,
				},
				organization_trade_party_documents:
					tradePartyTypeValue === 'paying_party'
						? orgPayingPartyDocs
						: orgTradePartyDocs,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Trade Party Created Successfully!!');

			setActiveState('view_billing_addresses');
			setShowModal(false);
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		onSubmit,
		loading,
	};
};

export default useCreateOrgTradeParty;
