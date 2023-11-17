import currencyOptions from '@cogoport/forms/page-components/Business/PriceSelect/currencies';
import { IcMLocation, IcMProductCodeMapping } from '@cogoport/icons-react';

import ListLocationOpt from '../page-components/ListLocationOpt';

const FILTER_TYPE_MAPPGING = {
	sea  : ['seaport', 'country'],
	air  : ['airport', 'city', 'country'],
	road : ['pincode', 'seaport', 'airport', 'city'],
};

const getInsuranceControls = ({ activeTab = 'ocean', t }) => [
	{
		name        : 'origin_point',
		label       : t('cargoInsurance:form_control_origin'),
		placeholder : t('cargoInsurance:form_control_origin_placeholder'),
		prefix      : <IcMLocation width={18} height={18} />,
		type        : 'asyncSelect',
		initialCall : true,
		asyncKey    : 'list_locations',
		params      : {
			filters  : { status: 'active', type: FILTER_TYPE_MAPPGING[activeTab] },
			includes : {
				city                    : true,
				country                 : true,
				default_params_required : true,
			},
		},
		rules       : { required: true },
		renderLabel : (option) => <ListLocationOpt data={option} />,
	},
	{
		name        : 'destination_point',
		label       : t('cargoInsurance:form_control_destination'),
		placeholder : t('cargoInsurance:form_control_destination_placeholder'),
		prefix      : <IcMLocation width={18} height={18} />,
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		params      : {
			filters  : { status: 'active', type: FILTER_TYPE_MAPPGING[activeTab] },
			includes : {
				city                    : true,
				country                 : true,
				default_params_required : true,
			},

		},
		initialCall : true,
		rules       : { required: true },
		renderLabel : (option) => <ListLocationOpt data={option} />,
	},
	{
		name               : 'hsCode',
		label              : t('cargoInsurance:form_control_hscode'),
		placeholder        : t('cargoInsurance:form_control_hscode_placeholder'),
		prefix             : <IcMProductCodeMapping width={14} height={14} />,
		type               : 'asyncSelect',
		asyncKey           : 'list_insurance_hs_code',
		initialCall        : true,
		rules              : { required: true },
		params             : { codeType: 'FINAL' },
		labelKey           : 'display_name',
		valueKey           : 'hsCode',
		getModifiedOptions : ({ options }) => options.map((opt) => ({
			...opt,
			display_name: (
				<div>
					{opt?.hsCode}
					{' '}
					-
					{' '}
					{opt?.description}

				</div>),
		})),
	},
	{
		name        : 'currency',
		label       : t('cargoInsurance:form_control_currency'),
		placeholder : t('cargoInsurance:form_control_currency_placeholder'),
		type        : 'select',
		options     : currencyOptions,
		rules       : { required: true },
	},
	{
		name        : 'cargoValue',
		label       : t('cargoInsurance:form_control_value'),
		placeholder : t('cargoInsurance:form_control_value_placeholder'),
		type        : 'number',
		rules       : { required: true },
	},
];

export default getInsuranceControls;
