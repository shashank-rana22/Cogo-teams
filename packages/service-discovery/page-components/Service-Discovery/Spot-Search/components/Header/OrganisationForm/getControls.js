import { IcMManufacturing, IcMProfile } from '@cogoport/icons-react';

const getFormControls = ({ organisation = '', setOrganisation = () => {}, setValue }) => {
	const controls = [
		{
			name        : 'organisation',
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
				setOrganisation({
					organisation_id        : id,
					organisation_branch_id : organization_branch_ids?.[0],
					business_name,
				});
				setValue('user_id', undefined);
			},
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
			onChange    : (val, obj = {}) => {
				const {
					user_id = '',
				} = obj;
				setOrganisation((prev) => ({
					...prev,
					user_id,
				}));
			},
			params: {
				filters: {
					status                 : 'active',
					organization_id        : organisation?.organisation_id,
					organization_branch_id : organisation?.organisation_branch_id,
				},
			},
			prefix      : <IcMProfile fontSize={16} />,
			isClearable : true,
		},
	];
	return controls;
};

export default getFormControls;
