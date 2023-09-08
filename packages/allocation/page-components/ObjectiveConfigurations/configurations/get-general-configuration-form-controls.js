import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import getChannelWiseRolesFilters from '../helpers/get-channel-wise-roles-filters';
import getEntityOptions from '../helpers/get-entity-options';

const getGeneralConfiguratioFormControls = (props) => {
	const { watchPartner, watchChannel, disabled, t = () => {} } = props;

	const controls = [
		{
			name  : 'objective_type',
			label : (
				<>
					{t('allocation:select_objective_type')}
					<sup style={{ color: 'red' }}>*</sup>
				</>
			),
			type        : 'select',
			placeholder : t('allocation:objective_type_placeholder'),
			options     : [
				{
					label : t('allocation:company_options'),
					value : 'company',
				},
				{
					label : t('allocation:team_options'),
					value : 'team',
				},
			],
			rules: {
				required: t('allocation:objective_type_required'),
			},
			disabled,
		},
		{
			name  : 'name',
			label : (
				<>
					{t('allocation:objective_name')}
					<sup style={{ color: 'red' }}>*</sup>
				</>
			),
			type        : 'text',
			placeholder : t('allocation:objective_name_placeholder'),
			rules       : {
				required: t('allocation:objective_name_required'),
			},
			disabled,
		},
		{
			name  : 'partner',
			label : (
				<>
					{t('allocation:select_cogo_entity')}
					<sup style={{ color: 'red' }}>*</sup>
				</>
			),
			placeholder : t('allocation:cogo_entity_placeholder'),
			type        : 'select',
			options     : getEntityOptions(),
			rules       : {
				required: t('allocation:cogo_entity_required'),
			},
			disabled,
		},
		{
			name  : 'channels',
			label : (
				<>
					{t('allocation:select_channel')}
					<sup style={{ color: 'red' }}>*</sup>
				</>
			),
			type        : 'multiSelect',
			placeholder : t('allocation:channel_placeholder'),
			options     : [
				{
					label : t('allocation:sme_options'),
					value : 'sme',
				},
				{
					label : t('allocation:enterprise'),
					value : 'enterprise',
				},
				{
					label : t('allocation:cp_options'),
					value : 'cp',
				},
			],
			rules: {
				required: t('allocation:channel_required'),
			},
			disabled,
		},
		{
			name  : 'roles',
			label : (
				<>
					{t('allocation:select_agent_roles')}
					<sup style={{ color: 'red' }}>*</sup>
				</>
			),
			placeholder : t('allocation:agent_roles_placeholder'),
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'partner_roles',
			valueKey    : 'value',
			filterKey   : 'id',
			initialCall : true,
			params      : {
				permissions_data_required : false,
				filters                   : {
					partner_entity_types : ['cogoport'],
					stakeholder_id       : !isEmpty(watchPartner)
						? watchPartner.split('_')[GLOBAL_CONSTANTS.zeroth_index] : undefined,
					role_sub_functions : getChannelWiseRolesFilters({ channels: watchChannel }),
					status             : true,
				},
			},
			rules: {
				required: t('allocation:roles_required'),
			},
			getModifiedOptions: ({ options }) => options.map(
				(option) => ({ ...option, value: `${option.id}_${option.name}` }),
			),
			setFilterValue: ({ value }) => value.split('_')?.[GLOBAL_CONSTANTS.zeroth_index],
			disabled,
		},
	];

	return controls;
};

export default getGeneralConfiguratioFormControls;
