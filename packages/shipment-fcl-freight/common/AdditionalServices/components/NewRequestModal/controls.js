import { Toast } from '@cogoport/components';
import currencyCodeOptions from '@cogoport/ocean-modules/utils/currencyCode';

import RenderLabel from '../RenderLabel';

const billingAddresses = (billingParty = {}) => (
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
	{
		label : 'Demand Draft',
		value : 'DEMAND_DRAFT',
	},
];

const formControls = ({
	listEntities = {},
	billingParty = {},
	setBillingParty = () => {},
	setBillingPartyAddress = () => {},
	setValue = () => {},
	PARAMS = {},
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
			style       : { width: '110px' },
		},
		{
			name        : 'amount',
			label       : 'Amount',
			type        : 'number',
			placeholder : 'Enter Amount per Container',
			rules       : { required: 'Amount per Container is required', min: 0 },
			size        : 'sm',
			style       : { width: '200px' },
		},
		{
			name        : 'quantity',
			label       : 'Amount of Containers',
			type        : 'number',
			placeholder : 'Enter number of containers',
			rules       : { required: 'Amount of Containers are required', min: 0 },
			size        : 'sm',
			style       : { width: '200px' },
		},
		{
			name        : 'payment_mode',
			label       : 'Mode of Payment',
			type        : 'select',
			placeholder : 'Enter Payment Mode',
			rules       : { required: 'Payment Mode is required' },
			size        : 'sm',
			style       : { width: '270px' },
			options     : PAYMENT_MODE_OPTIONS,
		},
		{
			name        : 'remarks',
			label       : 'Remarks',
			type        : 'textarea',
			placeholder : 'Enter remarks',
			rules       : { required: 'Remarks are required' },
			size        : 'sm',
			style       : { width: '570px' },
		},
		{
			name     : 'upload',
			label    : 'Upload Acknowledgement',
			type     : 'upload',
			multiple : true,
			rules    : { required: 'Acknowledgement is required' },
			size     : 'sm',
			style    : { width: '570px' },
		},
		{
			name     : 'billing_party',
			label    : 'Select Billing Party',
			type     : 'select',
			rules    : { required: 'Billing Party is required' },
			options  : billingPartyOpts,
			size     : 'sm',
			style    : { width: '265px' },
			onChange : (_, item) => {
				setBillingParty(item);
				setValue('billing_address', '');
			},
		},
		{
			name     : 'billing_address',
			label    : 'Select Billing Address',
			type     : 'select',
			rules    : { required: 'Billing Address is required' },
			size     : 'sm',
			style    : { width: '265px' },
			options  : billingAddresses(billingParty),
			onChange : (_, item) => {
				setBillingPartyAddress(item);
				setValue('billing_address', _);
			},
		},
		{
			name               : 'collection_party',
			label              : 'Collection Party Details',
			type               : 'asyncSelect',
			asyncKey           : 'list_organization_trade_parties',
			rules              : { required: 'Collection Party is required' },
			size               : 'sm',
			style              : { width: '265px' },
			params             : PARAMS,
			getModifiedOptions : ({ options }) => handleModifiedOptions({ options }),
			initialCall        : true,
			onChange           : (_, item) => {
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
			style    : { width: '265px' },
			options  : collectionPartyAddresses,
			onChange : (_, item) => {
				setCollectionPartyAddress(item);
				setValue('cp_address', _);
			},
		},
		{
			name        : 'cp_bank_details',
			label       : 'Select Bank Details',
			type        : 'select',
			rules       : { required: 'Bank Details are required' },
			size        : 'sm',
			style       : { width: '265px' },
			options     : COLLECTION_PARTY_BANK_OPTIONS,
			renderLabel : (bank) => <RenderLabel bank={bank} />,
			onChange    : (_, item) => {
				setCollectionPartyBankDetails(item);
				setValue('cp_bank_details', _);
			},
		},
		{
			name                  : 'due_date',
			label                 : 'Due Date',
			type                  : 'datepicker',
			rules                 : { required: 'Due Date is required' },
			size                  : 'sm',
			style                 : { width: '265px', marginRight: '100px' },
			isPreviousDaysAllowed : true,
		},
		{
			name  : 'place_of_supply',
			label : 'Enter Place of Supply',
			type  : 'text',
			rules : { required: 'Place of Supply is required' },
			size  : 'sm',
			style : { width: '265px' },
		},
		{
			name  : 'place_of_destination',
			label : 'Enter Place of Destination',
			type  : 'text',
			rules : { required: 'Place of Destination is required' },
			size  : 'sm',
			style : { width: '265px' },
		},
	];
};

export default formControls;
