import { IcMManufacturing, IcMProfile } from '@cogoport/icons-react';

import CustomSelectOption from '../../../../../../common/CustomSelectOption';

const getFormControls = ({ organization = '', setOrganization = () => {}, setValue }) => {
	const controls = [
		{
			name        : 'organization_id',
			type        : 'async-select',
			label       : 'Select an organisation',
			placeholder : 'Select Organisation',
			asyncKey    : 'organizations',
			labelKey    : 'business_name',
			valueKey    : 'id',
			initialCall : true,
			rules       : { required: 'Organisation is required' },
			params      : {
				branches_data_required : true,
				filters                : {
					status       : 'active',
					account_type : 'importer_exporter',
				},
			},
			onChange: (val, obj = {}) => {
				const {
					id = '',
					organization_branch_ids = '',
					business_name = '',
				} = obj;
				setOrganization({
					organization_id        : id,
					organization_branch_id : organization_branch_ids?.[0],
					business_name,
				});
				setValue('user_id', undefined);
			},
			renderLabel : (data) => <>{CustomSelectOption({ data, key: 'organizations' })}</>,
			prefix      : <IcMManufacturing fontSize={16} />,
			isClearable : true,
		},
		{
			name        : 'user_id',
			type        : 'async-select',
			label       : 'Select an user',
			placeholder : 'Select User',
			asyncKey    : 'organization_users',
			labelKey    : 'name',
			valueKey    : 'user_id',
			initialCall : true,
			rules       : { required: 'User name is required' },
			params      : {
				filters: {
					status                 : 'active',
					organization_id        : organization?.organization_id,
					organization_branch_id : organization?.organization_branch_id,
				},
			},
			prefix: <IcMProfile fontSize={16} />,
		},
	];
	return controls;
};

export default getFormControls;
