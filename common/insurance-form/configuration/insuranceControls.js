import currencyOptions from '@cogoport/forms/page-components/Business/PriceSelect/currencies';
import { IcMLocation, IcMProductCodeMapping } from '@cogoport/icons-react';

import ListLocationOpt from '../page-components/ListLocationOpt';

const FILTER_TYPE_MAPPGING = {
	ocean   : ['seaport', 'country'],
	air     : ['airport', 'city', 'country'],
	surface : ['pincode', 'seaport', 'airport', 'city'],
};

const getInsuranceControls = ({ activeTab = 'ocean' }) => [
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
		renderLabel : (option) => <ListLocationOpt data={option} />,
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
		renderLabel : (option) => <ListLocationOpt data={option} />,
	},
	{
		name               : 'hsCode',
		label              : 'HS Code',
		placeholder        : 'Enter HS Code',
		prefix             : <IcMProductCodeMapping width={14} height={14} />,
		type               : 'asyncSelect',
		asyncKey           : 'list_saas_hs_codes',
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
		label       : 'Invoice Currency',
		placeholder : 'Select Invoice Currency',
		type        : 'select',
		options     : currencyOptions,
		rules       : { required: true },
	},
	{
		name        : 'cargoValue',
		label       : 'Invoice Value',
		placeholder : 'Enter Invoice Value',
		type        : 'number',
		rules       : { required: true },
	},
];

export default getInsuranceControls;
