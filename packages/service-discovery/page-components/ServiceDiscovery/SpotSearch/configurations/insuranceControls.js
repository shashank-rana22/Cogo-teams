import currencyOptions from '@cogoport/forms/page-components/Business/PriceSelect/currencies';
import { IcMLocation, IcMProductCodeMapping } from '@cogoport/icons-react';

import CustomSelectOption from '../../../../common/CustomSelectOption';

const FILTER_TYPE_MAPPGING = {
	ocean   : ['seaport', 'country'],
	air     : ['airport', 'city', 'country'],
	surface : ['pincode', 'seaport', 'airport', 'city'],
};

const getInsuranceControls = ({ activeTab }) => [
	{
		name        : 'origin_point',
		label       : 'Origin Point',
		placeholder : 'Select Origin Point',
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
		renderLabel : (option) => CustomSelectOption({ option, key: 'locations' }),
	},
	{
		name        : 'destination_point',
		label       : 'Destination Point',
		placeholder : 'Select Destination Point',
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
		renderLabel : (option) => CustomSelectOption({ option, key: 'locations' }),
	},
	{
		name        : 'hsCode',
		label       : 'HS Code',
		placeholder : 'Enter HS Code',
		prefix      : <IcMProductCodeMapping width={14} height={14} />,
		type        : 'number',
		rules       : { required: true },
	},
	{
		name        : 'currency',
		label       : 'Invoice Currency',
		placeholder : 'Select Invoice Currency',
		type        : 'select',
		options     : currencyOptions,
		rules       : { required: true },
	},
	{
		name        : 'value',
		label       : 'Invoice Value',
		placeholder : 'Enter Invoice Value',
		type        : 'number',
		rules       : { required: true },
	},
];

export default getInsuranceControls;
