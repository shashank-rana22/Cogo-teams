import {
	asyncFieldsOrganizations,
	asyncFieldsOrganizationUser,
	asyncTicketsCategory,
	asyncFieldsTicketTypes,
	asyncListShipments,
} from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import useGetAsyncTicketOptions from '@cogoport/forms/hooks/useGetAsyncTicketOptions';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { REQUEST_TYPE_OPTIONS } from '../constants';

function RenderLabel({ label = '' }) {
	return (
		<div>
			{label}
			<span style={{ color: 'red' }}>*</span>
		</div>
	);
}

const useRaiseTicketcontrols = ({
	watchOrgId = '', watchUserId = '', watchService = '', watchTradeType = '', watchCategory = '',
	watchRequestType = '', resetField = () => {}, setAdditionalInfo = () => {}, setValue = () => {},
	formattedSubCategories = [], setSubCategories = () => {}, watchSubCategory = '',
	t = () => {}, setRaiseToDesk = () => {}, formatRaiseToDeskOptions = [], watchToggle,
}) => {
	const organizationOptions = useGetAsyncOptions({ ...asyncFieldsOrganizations() });
	const categoryDeskOptions = useGetAsyncTicketOptions({
		...asyncTicketsCategory({ endLabelKey: !watchToggle ? 'category' : 'raised_by_desk' }),
		params: {
			Service          : watchService || undefined,
			TradeType        : watchTradeType || undefined,
			RequestType      : watchRequestType || undefined,
			CategoryDeskType : !watchToggle ? 'by_category' : 'by_desk',
		},
	});

	const organizationUserOptions = useGetAsyncOptions({
		...asyncFieldsOrganizationUser(),
		params   : { filters: { organization_id: watchOrgId } },
		valueKey : 'user_id',

	});

	const ticketTypeOptions = useGetAsyncTicketOptions({
		...asyncFieldsTicketTypes(),
		params: {
			Audience    : 'cogoport_user',
			RequestType : watchRequestType || undefined,
			Category    : watchCategory || undefined,
			Subcategory : watchSubCategory || undefined,
		},
	});

	const serialIdOptions = useGetAsyncOptions({
		...asyncListShipments(),
		params: {
			filters: {
				importer_exporter_id : watchOrgId || undefined,
				user_id              : watchUserId || undefined,
			},
		},
		valueKey: 'serial_id',
	});

	return [
		{
			label          : <RenderLabel label={t('myTickets:request_type')} />,
			placeholder    : t('myTickets:select_request_ype'),
			name           : 'request_type',
			controllerType : 'select',
			rules          : { required: true },
			value          : 'shipment',
			options        : REQUEST_TYPE_OPTIONS,
			isClearable    : true,
		},
		{
			...(organizationOptions || {}),
			label          : t('myTickets:on_behalf_of'),
			name           : 'organization_id',
			controllerType : 'select',
			placeholder    : t('myTickets:select_organization'),
			isClearable    : true,
		},
		{
			...(organizationUserOptions || {}),
			label          : t('myTickets:select_user'),
			placeholder    : t('myTickets:select_user'),
			name           : 'user_id',
			controllerType : 'select',
			isClearable    : true,
		},
		{
			...(serialIdOptions || {}),
			label          : <RenderLabel label={t('myTickets:select_sid')} />,
			placeholder    : t('myTickets:select_sid'),
			name           : 'serial_id',
			controllerType : 'select',
			isClearable    : true,
			rules          : { required: true },
			onChange       : (_, obj) => {
				setValue('service', obj?.shipment_type);
				setValue('trade_type', obj?.trade_type);
			},
		},
		{
			label          : <RenderLabel label={t('myTickets:select_service')} />,
			name           : 'service',
			controllerType : 'select',
			placeholder    : t('myTickets:select_service'),
			rules          : { required: true },
			options        : GLOBAL_CONSTANTS.shipment_types,
			isClearable    : true,
		},
		{
			label          : <RenderLabel label={t('myTickets:select_trade_type')} />,
			name           : 'trade_type',
			controllerType : 'select',
			placeholder    : t('myTickets:select_trade_type'),
			rules          : { required: true },
			options        : GLOBAL_CONSTANTS.trade_types,
			isClearable    : true,
		},
		{
			name           : 'toggle_value',
			offLabel       : t('myTickets:by_category'),
			onLabel        : t('myTickets:by_desk'),
			value          : false,
			controllerType : 'toggle',
		},
		{
			...(categoryDeskOptions || {}),
			label          : t('myTickets:select_category'),
			name           : 'category',
			controllerType : 'select',
			placeholder    : t('myTickets:select_category'),
			isClearable    : true,
			defaultOptions : true,
			onChange       : (_, val) => {
				setSubCategories(val?.subcategories);
				resetField('sub_category');
			},
		},
		{
			label          : <RenderLabel label={t('myTickets:select_sub_category')} />,
			name           : 'sub_category',
			controllerType : 'select',
			placeholder    : t('myTickets:select_sub_category'),
			rules          : { required: true },
			isClearable    : true,
			options        : formattedSubCategories,
		},
		{
			...(categoryDeskOptions || {}),
			label          : <RenderLabel label={t('myTickets:raised_by_desk')} />,
			name           : 'raised_by_desk',
			controllerType : 'select',
			placeholder    : t('myTickets:select_raised_by_desk'),
			rules          : { required: true },
			isClearable    : true,
			defaultOptions : true,
			onChange       : (_, val) => {
				setRaiseToDesk(val?.raised_to_desk);
				resetField('raised_to_desk');
			},
		},
		{
			label          : <RenderLabel label={t('myTickets:raised_to_desk')} />,
			name           : 'raised_to_desk',
			controllerType : 'select',
			placeholder    : t('myTickets:select_raised_to_desk'),
			rules          : { required: true },
			isClearable    : true,
			options        : formatRaiseToDeskOptions,
		},
		{
			...(ticketTypeOptions || {}),
			label          : <RenderLabel label={t('myTickets:select_issue_type')} />,
			name           : 'issue_type',
			controllerType : 'select',
			placeholder    : t('myTickets:select_issue_type'),
			isClearable    : true,
			rules          : { required: true },
			defaultOptions : true,
			onChange       : (_, val) => setAdditionalInfo(val?.AdditionalInfo),
		},
		{
			label          : <RenderLabel label={t('myTickets:describe_issue')} />,
			name           : 'additional_information',
			controllerType : 'textarea',
			placeholder    : t('myTickets:enter_comments'),
			rules          : { required: true },
		},
		{
			...(organizationOptions || {}),
			label          : t('myTickets:on_behalf_of'),
			name           : 'organization_id',
			controllerType : 'select',
			placeholder    : t('myTickets:select_organization'),
			isClearable    : true,
		},
		{
			...(organizationUserOptions || {}),
			label          : <RenderLabel label={t('myTickets:select_user')} />,
			name           : 'user_id',
			controllerType : 'select',
			placeholder    : t('myTickets:select_user'),
			isClearable    : true,
			rules          : { required: true },

		},
		{
			label          : t('myTickets:priority_label'),
			name           : 'priority',
			controllerType : 'select',
			value          : 'medium',
			placeholder    : t('myTickets:select_type'),
			options        : [
				{
					label : t('myTickets:medium'),
					value : 'medium',
				},
				{
					label : t('myTickets:low'),
					value : 'low',
				},
				{
					label : t('myTickets:high'),
					value : 'high',
				},
			],
			theme     : 'admin',
			className : 'primary md',
		},
		{
			label          : t('myTickets:upload_supporting_document'),
			name           : 'file_url',
			controllerType : 'uploader',
		},
		{
			label          : t('myTickets:notify_customer'),
			name           : 'notify_customer',
			controllerType : 'checkbox',
		},
	];
};

export default useRaiseTicketcontrols;
