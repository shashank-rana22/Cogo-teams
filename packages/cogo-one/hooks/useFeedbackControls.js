import {
	asyncTicketsCategory,
	asyncFieldsTicketTypes,
} from '@cogoport/forms';
import useGetAsyncTicketOptions from '@cogoport/forms/hooks/useGetAsyncTicketOptions';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { SERVICE_API_MAPPING, getRateShipmentServices } from '../constants/ticketContants';

function RenderLabel({ label = '' }) {
	return (
		<div>
			{label}
			<span style={{ color: '#ee3425', marginLeft: '2px' }}>*</span>
		</div>
	);
}
const useFeedbackControls = ({
	watchCategory = '',
	setAdditionalInfo = () => {},
	setDefaultTypeId = () => {},
	resetField = () => {},
	formattedSubCategories = [],
	setSubCategories = () => {},
	watchSubCategory = '',
	setValue = () => {},
	t, watchServiceType = '',
	watchIdType = '', watchTradeType = '',
	watchService = '',
}) => {
	const checkSid = SERVICE_API_MAPPING?.[watchIdType]?.[watchServiceType];

	const categoryOptions = useGetAsyncTicketOptions({
		...asyncTicketsCategory(),
		params: {
			Audience    : 'cogoone_demand',
			RequestType : 'feedback',
		},
	});

	const ticketTypeOptions = useGetAsyncTicketOptions({
		...asyncFieldsTicketTypes(),
		params: {
			RequestType : 'feedback',
			Audience    : 'cogoone_demand',
			Category    : watchCategory || undefined,
			size        : 100,
			SubCategory : watchSubCategory || undefined,
			TradeType   : watchTradeType || undefined,
			Service     : watchServiceType || watchService || undefined,
		},
	});

	const serialIdOptions = {
		asyncKey : 'list_shipments',
		valueKey : 'serial_id',
		params   : {
			page_limit : 10,
			filters    : {
				status: 'active',
			},
		},
		initialCall: true,
	};

	const serviceSerialIdOptions = {
		asyncKey : checkSid,
		params   : {
			filters: {
				feedback_type: watchIdType === 'dislike_id' ? 'disliked' : undefined,
			},
			booking_details_required: watchIdType === 'dislike_id' ? true : undefined,
		},
		valueKey    : 'serial_id',
		initialCall : true,
	};

	const checkRequest = watchCategory?.toLowerCase() === 'rates' ? serviceSerialIdOptions : serialIdOptions;

	return [
		{
			...(categoryOptions || {}),
			label          : <RenderLabel label={t('myTickets:select_category')} />,
			name           : 'category',
			controllerType : 'select',
			placeholder    : t('myTickets:select_category'),
			isClearable    : true,
			defaultOptions : true,
			rules          : { required: true },
			onChange       : (_, val) => {
				setSubCategories((p) => ({ ...p, options: val?.subcategories }));
				resetField('sub_category');
				resetField('issue_type');
				resetField('serial_id');
				resetField('id_type');
				resetField('service_type');
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
			onChange       : (_, val) => {
				setSubCategories((p) => ({ ...p, subCatId: val?.subId }));
				resetField('issue_type');
			},
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
				{ label: t('myTickets:missing_id'), value: 'missing_id' },
				{ label: t('myTickets:dislike_id'), value: 'dislike_id' },
			],
			onChange: () => {
				setValue('service_type', '');
			},
		},
		{
			label          : <RenderLabel label={t('myTickets:service_type')} />,
			name           : 'service_type',
			placeholder    : 'Select service type',
			controllerType : 'select',
			options        : getRateShipmentServices({ t, watchIdType }),
			isClearable    : true,
			visible        : true,
			onChange       : () => {
				setValue('serial_id', '');
			},
		},
		{
			...(checkRequest || {}),
			label          : <RenderLabel label={t('myTickets:select_sid')} />,
			name           : 'serial_id',
			controllerType : 'asyncSelect',
			placeholder    : t('myTickets:select_sid'),
			rules          : { required: true },
			initialCall    : true,
			isClearable    : true,
			onChange       : (_, obj) => {
				resetField('service');
				resetField('trade_type');
				setValue('service', obj?.shipment_type);
				if (!obj?.trade_type) {
					setValue('trade_type', GLOBAL_CONSTANTS.options.inco_term?.[obj?.inco_term]?.trade_type);
				} else {
					setValue('trade_type', obj?.trade_type);
				}
			},
		},
		{
			label          : <RenderLabel label={t('myTickets:select_service')} />,
			name           : 'service',
			controllerType : 'select',
			placeholder    : t('myTickets:select_service'),
			options        : GLOBAL_CONSTANTS.shipment_types,
			isClearable    : true,
			disabled       : true,
			rules          : { required: true },
		},
		{
			label          : t('myTickets:select_trade_type'),
			name           : 'trade_type',
			controllerType : 'select',
			placeholder    : t('myTickets:select_trade_type'),
			disabled       : true,
			options        : GLOBAL_CONSTANTS.trade_types,
			isClearable    : true,
		},
		{
			...(ticketTypeOptions || {}),
			label          : <RenderLabel label={t('myTickets:select_issue_type')} />,
			name           : 'issue_type',
			controllerType : 'select',
			placeholder    : t('myTickets:select_issue_type'),
			isClearable    : true,
			defaultOptions : true,
			onChange       : (_, val) => {
				setAdditionalInfo(val?.AdditionalInfo);
				setDefaultTypeId(val?.ID);
			},
			rules: { required: true },
		},
		{
			label          : <RenderLabel label={t('myTickets:describe_issue')} />,
			name           : 'additional_information',
			controllerType : 'textarea',
			placeholder    : t('myTickets:enter_comments'),
			rules          : { required: true },
			maxLength      : 350,
			rows           : 4,
		},
		{
			label          : t('myTickets:upload_supporting_document'),
			name           : 'file_url',
			controllerType : 'uploader',
		},
		{
			label          : 'Is Critical',
			name           : 'is_critical',
			controllerType : 'checkbox',
		},
	];
};

export default useFeedbackControls;
