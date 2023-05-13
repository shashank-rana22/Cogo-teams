import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import { EMPTY_POC } from '../constants';

const useAddCollectionParty = ({
	organization_id = '',
	setOpen = () => {},
	source = 'shipment',
}) => {
	const { control, handleSubmit, formState:{ errors } } = useForm({
		defaultValues:
			{ poc_details: EMPTY_POC },
	});

	const [{ data:tradeDetails }, trigger] = useRequest({
		url    : '/create_organization_trade_party',
		method : 'post',
	}, { manual: true });

	const addCollectionParty = async (data, e) => {
		e.preventDefault();

		if (isEmpty(data)) return;

		const alternate_phone = data?.poc_details?.[0]?.alternate_mobile_number;

		try {
			const newPayload = {
				organization_id,
				business_name       : data?.company_name,
				registration_number : data?.registration_number,
				country_id          : data?.country,
				trade_party_type    : 'collection_party',
				is_tax_applicable   : !!data?.tax_number,
				address_detail      : {
					name                    : data?.company_name,
					address_type            : 'billing_address',
					is_sez                  : !!data?.is_sez,
					address                 : data?.address,
					pincode                 : data?.pincode,
					tax_number              : data?.tax_number,
					tax_number_document_url : data?.gst_proof?.finalUrl,
					sez_proof               : data?.sez_proof?.finalUrl || undefined,
				},
				poc_details: [
					{
						name          : data?.poc_details?.[0]?.name,
						email         : data?.poc_details?.[0]?.email,
						mobile_number : data?.poc_details?.[0]?.mobile_number?.number,
						mobile_country_code:
                            data?.poc_details?.[0]?.mobile_number?.country_code,
						alternate_mobile_number       : alternate_phone?.number,
						alternate_mobile_country_code : alternate_phone?.country_code,
					},
				],
				organization_trade_party_documents: [
					{
						name          : 'Bank Account',
						document_type : 'bank_account_details',
						image_url     : data?.bank_details?.[0]?.cancelled_cheque?.finalUrl,
						data          : {
							bank_account_number : data?.bank_account_number,
							bank_name           : data?.bank_name,
							branch_name         : data?.branch_name,
							ifsc_number         : data?.ifsc_number,
						},
						source,
					},
					{
						name          : 'Business Address Proof',
						document_type : 'business_address_proof',
						image_url     : data?.cancelled_cheque?.finalUrl,
						data          : {},
					},
					{
						name          : 'Indemnification proof',
						document_type : 'indemnification_proof',
						image_url     : data?.company_existence_proof?.finalUrl,
						data          : {},
					},
				],
			};

			const res = await trigger({ data: newPayload });
			if (!res.hasError) {
				Toast.success('Collection party created successfully');
				setOpen(false);
			}
		} catch (err) {
			Toast.error(
				'Unable to create Trade contact!!',
			);
		}
	};
	return {
		handleSubmit,
		errors,
		control,
		addCollectionParty,
		tradeDetails,
	};
};

export default useAddCollectionParty;
