import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { getRequestTypeOptions } from '../constants';

const useFilterControls = ({
	setValue = () => {}, t = () => {}, watch = () => {}, resetField = () => {},
	setSubCategories = () => {}, setRaiseToDesk = () => {}, formattedSubCategories = [],
	formatRaiseToDeskOptions = [],
}) => {
	const { service = '', trade_type = '', category = '', raised_by_desk = '', id_type = '' } = watch();

	return [
		{
			label          : t('myTickets:request_type'),
			placeholder    : t('myTickets:select_request_ype'),
			name           : 'request_type',
			controllerType : 'select',
			options        : getRequestTypeOptions({ t }),
			isClearable    : true,
		},
		{
			label          : t('myTickets:select_service'),
			name           : 'service',
			controllerType : 'select',
			placeholder    : t('myTickets:select_service'),
			options        : GLOBAL_CONSTANTS.shipment_types,
			isClearable    : true,
		},
		{
			label          : t('myTickets:select_trade_type'),
			name           : 'trade_type',
			controllerType : 'select',
			placeholder    : t('myTickets:select_trade_type'),
			options        : GLOBAL_CONSTANTS.trade_types,
			isClearable    : true,
		},
		{
			label          : t('myTickets:select_category'),
			name           : 'category',
			controllerType : 'asyncSelect',
			asyncKey       : 'configuration_categories',
			placeholder    : t('myTickets:select_category'),
			isClearable    : true,
			defaultOptions : true,
			onChange       : (_, val) => {
				setSubCategories(val?.subcategories);
				resetField('sub_category');
			},
			params: {
				Service          : service || undefined,
				TradeType        : trade_type || undefined,
				CategoryDeskType : 'by_category',
			},
			valueKey    : 'category',
			labelKey    : 'category',
			initialCall : true,
		},
		{
			label          : t('myTickets:select_sub_category'),
			name           : 'sub_category',
			controllerType : 'select',
			placeholder    : t('myTickets:select_sub_category'),
			isClearable    : true,
			options        : formattedSubCategories,
			disabled       : !category,
		},
		{
			label          : t('myTickets:raised_by_desk'),
			name           : 'raised_by_desk',
			controllerType : 'asyncSelect',
			asyncKey       : 'configuration_categories',
			placeholder    : t('myTickets:select_raised_by_desk'),
			isClearable    : true,
			defaultOptions : true,
			onChange       : (_, val) => {
				setRaiseToDesk(val?.raised_to_desk);
				resetField('raised_to_desk');
			},
			params: {
				Service          : service || undefined,
				TradeType        : trade_type || undefined,
				CategoryDeskType : 'by_desk',
			},
			valueKey    : 'raised_by_desk',
			labelKey    : 'raised_by_desk',
			initialCall : true,
		},
		{
			label          : t('myTickets:raised_to_desk'),
			name           : 'raised_to_desk',
			controllerType : 'select',
			placeholder    : t('myTickets:select_raised_to_desk'),
			isClearable    : true,
			options        : formatRaiseToDeskOptions,
			disabled       : !raised_by_desk,
		},
		{
			label   : t('myTickets:id_type'),
			name    : 'id_type',
			options : [
				{ label: t('myTickets:sid'), value: 'sid' },
				{ label: t('myTickets:missing_id'), value: 'missing_id' },
				{ label: t('myTickets:dislike_id'), value: 'dislike_id' },
			],
			controllerType : 'select',
			placeholder    : 'Select',
			onChange       : () => { setValue('serial_id', ''); },
		},
		{
			label          : t('myTickets:serial_id'),
			name           : 'serial_id',
			controllerType : 'number',
			placeholder    : t('myTickets:enter_serial_id'),
			arrow          : false,
			step           : 1,
			min            : 0,
			disabled       : !id_type,
		},
	];
};

export default useFilterControls;
