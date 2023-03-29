import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

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
	orgResponse = {},
	setShowComponent = () => {},
	tradePartyType = {},
	setShowModal = () => {},
	filledDetails = {},
	setFilledDetails = () => {},
	fetchOrganizationTradeParties = () => {},
	source = '',
	isAddressRegisteredUnderGst,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_organization_trade_party',
		method : 'POST',
	}, { manual: true });

	const {
		formState: { errors },
		handleSubmit,
		control,
		register,
	} = useForm();

	const onSubmit = async (values = {}) => {
		let newFilledDetails = { ...filledDetails };

		newFilledDetails = {
			...newFilledDetails,
			billing_address: values,
		};

		setFilledDetails(newFilledDetails);

		try {
			const {
				billing_address = {},
				business_name = '',
				company_type = '',
				registration_number = '',
				verification_document = {},
				country_id = '',
			} = newFilledDetails;

			const {
				tax_number = '',
				tax_number_document_url = '',
				address_type = '',
				is_sez = false,
				sez_proof = '',
				poc_details: pocDetails = [],
				billing_party_name = '',
				name = '',
				...restBillingAddressValues
			} = billing_address || {};

			if (pocDetails.length === 0) {
				Toast.info('Please create at-least one POC before proceeding ');
				return;
			}

			const formattedPocDetails = formatPocDetails({ data: pocDetails });

			const orgTradePartyDocs = [
				{
					name          : 'Trade Party Verification',
					document_type : 'verification_document',
					image_url     : verification_document,
					data          : {},
					source,
				},
			];

			const payload = {
				organization_id     : orgResponse.id || undefined,
				business_name,
				company_type,
				registration_number : registration_number.toUpperCase(),
				country_id,
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
				organization_trade_party_documents : orgTradePartyDocs,
				trade_party_type                   : 'paying_party',
			};

			await trigger({
				data: payload,
			});

			Toast.success('Trade Party Created Successfully!!');

			if (fetchOrganizationTradeParties) {
				setShowComponent('view_billing_addresses');
				fetchOrganizationTradeParties();
				setShowModal(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return {
		onSubmit,
		loading,
		control,
		errors,
		register,
		handleSubmit,
	};
};

export default useCreateOrgTradeParty;
