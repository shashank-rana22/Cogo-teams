import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import CustomIssueLabel from '../common/CustomIssueLabel';
import { RATES_SHIPMENT_SERVICES, REQUEST_TYPE_OPTIONS } from '../constants';

function RenderLabel({ label = '' }) {
	return (
		<div>
			{label}
			<span style={{ color: '#ee3425' }}>*</span>
		</div>
	);
}

const getCreateControls = ({
	t,
	checkRequest,
	ticketTypeOptions = {},
	organizationUserOptions = {},
	organizationOptions = {},
	categoryDeskOptions = {},
	resetField = () => {},
	setAdditionalInfo = () => {},
	setValue = () => {},
	formattedSubCategories = [],
	setRaiseToDesk = () => {},
	setSubCategories = () => {},
	formatRaiseToDeskOptions = [],
	setDefaultTypeId = () => {},
	isOperation = false,
}) => {
	let controls = [];

	controls = [
		{
			label          : <RenderLabel label={t('myTickets:request_type')} />,
			placeholder    : t('myTickets:select_request_ype'),
			name           : 'request_type',
			controllerType : 'select',
			rules          : { required: true },
			value          : 'shipment',
			options        : REQUEST_TYPE_OPTIONS,
			isClearable    : true,
			visible        : true,
		},
		{
			...(organizationOptions || {}),
			label          : t('myTickets:on_behalf_of'),
			name           : 'organization_id',
			controllerType : 'select',
			placeholder    : t('myTickets:select_organization'),
			isClearable    : true,
			visible        : true,
		},
		{
			...(organizationUserOptions || {}),
			label          : t('myTickets:select_user'),
			placeholder    : t('myTickets:select_user'),
			name           : 'user_id',
			controllerType : 'select',
			isClearable    : true,
			visible        : true,
		},
		{
			label          : t('myTickets:id_type'),
			name           : 'id_type',
			controllerType : 'select',
			placeholder    : 'Select shipment type',
			isClearable    : true,
			value          : 'sid',
			visible        : true,
			options        : [
				{ label: 'SID', value: 'sid' },
				{ label: 'Missing ID', value: 'missing_id' },
				{ label: 'Dislike ID', value: 'dislike_id' },
			],
			onChange: () => {
				setValue('service_type', '');
			},
		},
		{
			label          : t('myTicket:service_type'),
			name           : 'service_type',
			placeholder    : 'Select service type',
			controllerType : 'select',
			options        : RATES_SHIPMENT_SERVICES,
			isClearable    : true,
			visible        : true,
			onChange       : () => {
				setValue('serial_id', '');
			},
		},
		{
			...(checkRequest || {}),
			label          : <RenderLabel label={t('myTickets:select_sid')} />,
			placeholder    : t('myTickets:select_sid'),
			name           : 'serial_id',
			controllerType : 'select',
			isClearable    : true,
			rules          : { required: true },
			onChange       : (_, obj) => {
				setValue('service', obj?.shipment_type);
				if (!obj?.trade_type) {
					setValue('trade_type', GLOBAL_CONSTANTS.options.inco_term?.[obj?.inco_term]?.trade_type);
				} else {
					setValue('trade_type', obj?.trade_type);
				}
			},
			visible     : true,
			initialCall : true,
		},
		{
			label          : <RenderLabel label={t('myTickets:select_service')} />,
			name           : 'service',
			controllerType : 'select',
			placeholder    : t('myTickets:select_service'),
			rules          : { required: true },
			options        : GLOBAL_CONSTANTS.shipment_types,
			isClearable    : true,
			disabled       : true,
			visible        : true,
		},
		{
			label          : <RenderLabel label={t('myTickets:select_trade_type')} />,
			name           : 'trade_type',
			controllerType : 'select',
			placeholder    : t('myTickets:select_trade_type'),
			rules          : { required: true },
			disabled       : true,
			options        : GLOBAL_CONSTANTS.trade_types,
			isClearable    : true,
			visible        : true,
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
			visible: !isOperation,
		},
		{
			label          : <RenderLabel label={t('myTickets:select_sub_category')} />,
			name           : 'sub_category',
			controllerType : 'select',
			placeholder    : t('myTickets:select_sub_category'),
			rules          : { required: true },
			isClearable    : true,
			options        : formattedSubCategories,
			visible        : !isOperation,
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
			visible        : isOperation,
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
			visible        : isOperation,
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
			onChange       : (_, val) => {
				setAdditionalInfo(val?.AdditionalInfo);
				setDefaultTypeId(val?.ID);
			},
			visible     : true,
			renderLabel : (item) => <CustomIssueLabel optionsLabel={item} />,
		},
		{
			label          : <RenderLabel label={t('myTickets:describe_issue')} />,
			name           : 'additional_information',
			controllerType : 'textarea',
			placeholder    : t('myTickets:enter_comments'),
			rules          : { required: true },
			visible        : true,
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
			visible   : true,
		},
		{
			label          : t('myTickets:upload_supporting_document'),
			name           : 'file_url',
			controllerType : 'uploader',
			visible        : true,
		},
		{
			label          : t('myTickets:notify_customer'),
			name           : 'notify_customer',
			controllerType : 'checkbox',
			visible        : true,
		},
	];

	return controls;
};

export default getCreateControls;
