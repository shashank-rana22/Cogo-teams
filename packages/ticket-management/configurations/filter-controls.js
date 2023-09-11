import {
	asyncFieldsOrganizations, asyncFieldsOrganizationUser,
	asyncTicketsCategory,
	asyncListShipments,
} from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import useGetAsyncTicketOptions from '@cogoport/forms/hooks/useGetAsyncTicketOptions';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { REQUEST_TYPE_OPTIONS } from '../constants';

const useRaiseTicketcontrols = ({
	watchOrgId = '', watchUserId = '', watchService = '', watchTradeType = '',
	watchRequestType = '', resetField = () => {}, setValue = () => {},
	formattedSubCategories = [], setSubCategories = () => {},
}) => {
	const organizationOptions = useGetAsyncOptions({ ...asyncFieldsOrganizations() });
	const categoryOptions = useGetAsyncTicketOptions({
		...asyncTicketsCategory(),
		params: {
			Service     : watchService || undefined,
			TradeType   : watchTradeType || undefined,
			RequestType : watchRequestType || undefined,
		},
	});

	const organizationUserOptions = useGetAsyncOptions({
		...asyncFieldsOrganizationUser(),
		params   : { filters: { organization_id: watchOrgId } },
		valueKey : 'user_id',

	});
	const serialIdOptions = useGetAsyncOptions({
		...asyncListShipments(),
		params   : { filters: { importer_exporter_id: watchOrgId, user_id: watchUserId } },
		valueKey : 'serial_id',
	});

	return [
		{
			label          : 'Request Type',
			name           : 'request_type',
			controllerType : 'select',
			placeholder    : 'Select Request Type',
			rules          : { required: true },
			value          : 'shipment',
			options        : REQUEST_TYPE_OPTIONS,
			isClearable    : true,
		},
		{
			...(organizationOptions || {}),
			label          : 'On behalf of',
			name           : 'organization_id',
			controllerType : 'select',
			placeholder    : 'Select Organization',
			rules          : { required: true },
			isClearable    : true,
		},
		{
			...(organizationUserOptions || {}),
			label          : 'Select User',
			name           : 'user_id',
			controllerType : 'select',
			placeholder    : 'Select User',
			isClearable    : true,
			rules          : { required: true },
		},
		{
			...(serialIdOptions || {}),
			label          : 'Select SID',
			name           : 'serial_id',
			controllerType : 'select',
			placeholder    : 'Select SID',
			isClearable    : true,
			rules          : { required: true },
			onChange       : (_, obj) => {
				setValue('service', obj?.shipment_type);
				setValue('trade_type', obj?.trade_type);
			},
		},
		{
			label          : 'Select Service',
			name           : 'service',
			controllerType : 'select',
			placeholder    : 'Select service',
			rules          : { required: true },
			options        : GLOBAL_CONSTANTS.shipment_types,
			isClearable    : true,
		},
		{
			label          : 'Select Trade Type',
			name           : 'trade_type',
			controllerType : 'select',
			placeholder    : 'Select Trade Type',
			rules          : { required: true },
			options        : GLOBAL_CONSTANTS.trade_types,
			isClearable    : true,
		},
		{
			...(categoryOptions || {}),
			label          : 'Select category',
			name           : 'category',
			controllerType : 'select',
			placeholder    : 'Select Type',
			isClearable    : true,
			defaultOptions : true,
			onChange       : (_, val) => {
				setSubCategories(val?.subcategories);
				resetField('sub_category');
			},
		},
		{
			label          : 'Select Sub-category',
			name           : 'sub_category',
			controllerType : 'select',
			placeholder    : 'Select sub category',
			rules          : { required: true },
			isClearable    : true,
			options        : formattedSubCategories,
		},
		{
			label          : 'Describe Issue',
			name           : 'additional_information',
			controllerType : 'textarea',
			placeholder    : 'Enter Comments',
			rules          : { required: true },
		},
		{
			label          : 'Priority',
			name           : 'priority',
			controllerType : 'select',
			value          : 'medium',
			placeholder    : 'Select Type',
			options        : [
				{
					label : 'Medium',
					value : 'medium',
				},
				{
					label : 'Low',
					value : 'low',
				},
				{
					label : 'High',
					value : 'high',
				},
			],
			theme     : 'admin',
			className : 'primary md',
		},
		{
			label          : 'Upload Supporting Document',
			name           : 'file_url',
			controllerType : 'uploader',
		},
		{
			label          : 'Notify customer',
			name           : 'notify_customer',
			controllerType : 'checkbox',
		},
	];
};

export default useRaiseTicketcontrols;
