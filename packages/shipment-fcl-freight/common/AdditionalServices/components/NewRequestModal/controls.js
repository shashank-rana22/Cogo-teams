import { Toast } from '@cogoport/components';
import currencyCodeOptions from '@cogoport/ocean-modules/utils/currencyCode';

import RenderLabel from '../RenderLabel';

const getBillingAddressOptions = (billingParty = {}) => (
	billingParty?.addresses?.map((address) => ({
		...address,
		label : address?.address,
		value : address?.gst_number,
	}))
);

const PAYMENT_MODE_OPTIONS = [
	{
		label : 'NEFT',
		value : 'NEFT',
	},
	{
		label : 'RTGS',
		value : 'RTGS',
	},
];

const getFormControls = ({
	listEntities = {},
	billingParty = {},
	setBillingParty = () => {},
	setBillingPartyAddress = () => {},
	setValue = () => {},
	cpParams = {},
	handleModifiedOptions = () => {},
	setCollectionParty = () => {},
	collectionPartyAddresses,
	COLLECTION_PARTY_BANK_OPTIONS,
	setCollectionPartyAddress = () => {},
	setCollectionPartyBankDetails = () => {},
}) => {
	const billingPartyOpts = listEntities?.list?.map((item) => ({
		...item,
		value : item?.registration_number,
		label : `${item?.entity_code} - ${item?.country?.name} - ${item?.business_name}`,
	}));

	return [
		{
			name        : 'currency',
			label       : 'Currency',
			type        : 'select',
			placeholder : 'Currency',
			options     : currencyCodeOptions,
			rules       : { required: 'Currency is required' },
			size        : 'sm',
			span        : 3,
		},
		{
			name        : 'amount',
			label       : 'Amount per Container',
			type        : 'number',
			placeholder : 'Enter Amount per Container',
			rules       : { required: 'Amount per Container is required', min: 0 },
			size        : 'sm',
			span        : 5,
		},
		{
			name        : 'quantity',
			label       : 'Number of Containers',
			type        : 'number',
			placeholder : 'Enter number of containers',
			rules       : { required: 'Amount of Containers are required', min: 0 },
			size        : 'sm',
			span        : 4,
		},
		{
			name        : 'payment_mode',
			label       : 'Mode of Payment',
			type        : 'select',
			placeholder : 'Enter Payment Mode',
			rules       : { required: 'Payment Mode is required' },
			size        : 'sm',
			options     : PAYMENT_MODE_OPTIONS,
			span        : 6,
		},
		{
			name        : 'remarks',
			label       : 'Remarks',
			type        : 'textarea',
			placeholder : 'Enter remarks',
			rules       : { required: 'Remarks are required' },
			size        : 'sm',
			span        : 12,
		},
		{
			name       : 'upload',
			label      : 'Upload Acknowledgement',
			type       : 'file',
			uploadType : 'aws',
			drag       : true,
			uploadIcon : 'ic-upload',
			multiple   : true,
			rules      : { required: 'Acknowledgement is required' },
			size       : 'sm',
			span       : 12,
		},
		{
			name     : 'billing_party',
			label    : 'Select Billing Party',
			type     : 'select',
			rules    : { required: 'Billing Party is required' },
			options  : billingPartyOpts,
			size     : 'sm',
			onChange : (_, item) => {
				setBillingParty(item);
				setValue('billing_address', '');
			},
			span: 6,
		},
		{
			name     : 'billing_address',
			label    : 'Select Billing Address',
			type     : 'select',
			rules    : { required: 'Billing Address is required' },
			size     : 'sm',
			options  : getBillingAddressOptions(billingParty),
			onChange : (_, item) => {
				setBillingPartyAddress(item);
				setValue('billing_address', _);
			},
			span: 6,
		},
		{
			name               : 'collection_party',
			label              : 'Collection Party Details',
			type               : 'async-select',
			asyncKey           : 'list_organization_trade_parties',
			rules              : { required: 'Collection Party is required' },
			size               : 'sm',
			params             : cpParams,
			span               : 6,
			getModifiedOptions : ({ options }) => handleModifiedOptions({ options }),
			initialCall        : true,
			handleChange       : (_, item) => {
				if (item?.verification_status === 'pending') {
					setValue('collection_party', undefined);
					Toast.error('Cannot select KYC pending collection party!');
				} else {
					setCollectionParty(item);
					setValue('collection_party', _);
					setValue('cp_address', '');
					setValue('cp_bank_details', '');
				}
			},
		},
		{
			name     : 'cp_address',
			label    : 'Select Collection Party Address',
			type     : 'select',
			rules    : { required: 'Address is required' },
			size     : 'sm',
			options  : collectionPartyAddresses,
			onChange : (_, item) => {
				setCollectionPartyAddress(item);
				setValue('cp_address', _);
			},
			span: 6,
		},
		{
			name        : 'cp_bank_details',
			label       : 'Select Bank Details',
			type        : 'select',
			rules       : { required: 'Bank Details are required' },
			size        : 'sm',
			options     : COLLECTION_PARTY_BANK_OPTIONS,
			renderLabel : (bank) => <RenderLabel bank={bank} />,
			onChange    : (_, item) => {
				setCollectionPartyBankDetails(item);
				setValue('cp_bank_details', _);
			},
			span: 6,
		},
		{
			name        : 'cp_address_city',
			label       : 'Collection Party City Name',
			placeholder : 'Enter Collection Party City Name...',
			type        : 'text',
			rules       : { required: 'City Name is required' },
			size        : 'sm',
			span        : 6,
		},
		{
			name                  : 'due_date',
			label                 : 'Due Date',
			type                  : 'datepicker',
			rules                 : { required: 'Due Date is required' },
			size                  : 'sm',
			isPreviousDaysAllowed : true,
			span                  : 6,

		},
	];
};

export default getFormControls;
