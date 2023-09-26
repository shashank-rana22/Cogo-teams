import { Toast } from '@cogoport/components';

import RenderLabel from '../../InvoiceFormLayout/CollectionPartyDetails/RenderLabel';

const getFormControls = ({
	setValue = () => {},
	cpParams = {},
	handleModifiedOptions = () => {},
	setCollectionParty = () => {},
	collectionPartyAddresses,
	setCollectionPartyAddress = () => {},
	collectionPartyBankOptions = [],
}) => [
	{
		name               : 'collection_party',
		label              : 'Collection Party Branch',
		type               : 'async-select',
		asyncKey           : 'list_organization_trade_parties',
		rules              : { required: 'Collection Party is required' },
		size               : 'sm',
		params             : cpParams,
		isClearable        : true,
		span               : 4,
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
			}
		},
	},
	{
		name        : 'cp_address',
		label       : 'Collection Party Address',
		placeholder : 'Select Collection Party Address',
		type        : 'select',
		rules       : { required: 'Address is required' },
		size        : 'sm',
		isClearable : true,
		options     : collectionPartyAddresses,
		onChange    : (_, item) => {
			setCollectionPartyAddress(item);
			setValue('cp_address', _);
		},
		span: 4,
	},
	{
		name        : 'collection_party_bank_details',
		label       : 'Collection Party Bank Details',
		placeholder : 'Select Bank Details...',
		renderLabel : (bank) => <RenderLabel bank={bank} />,
		type        : 'select',
		rules       : { required: 'Collection Party Bank Details is Required' },
		size        : 'sm',
		isClearable : true,
		options     : collectionPartyBankOptions,
		span        : 4,
	},
];

export default getFormControls;
