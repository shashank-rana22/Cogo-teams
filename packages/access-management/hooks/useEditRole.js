import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const controls = [
	{
		name        : 'short_name',
		label       : 'Role Short Name',
		type        : 'text',
		maxLength   : 16,
		value      	: 'hii',
		placeholder : 'Enter Role Short Name',
		rules       : { required: 'Role Short Name is required' },
		span        : 6,
	},
	{
		name    : 'role_functions',
		label   : 'Role Functions',
		options : [
			{
				label : 'Sales',
				value : 'sales',
			},
			{
				label : 'Supply',
				value : 'supply',
			},
			{
				label : 'Operations',
				value : 'operations',
			},
			{
				label : 'Finance',
				value : 'finance',
			},
			{
				label : 'Training',
				value : 'training',
			},
			{
				label : 'HR',
				value : 'hr',
			},
			{
				label : 'External',
				value : 'external',
			},
		],
		type        : 'multiSelect',
		isClearable : true,
		placeholder : 'Choose role functions',
		span        : 6,
	},
	{
		name        : 'role_sub_functions',
		label       : 'Role Sub Functions',
		options     : [],
		type        : 'multiSelect',
		isClearable : true,
		placeholder : 'Choose role sub functions',
		span        : 6,
	},

	{
		name    : 'hierarchy_level',
		label   : 'Hierarchy Level',
		options : [
			{
				label : 'Owner',
				value : 'owner',
			},
			{
				label : 'Manager',
				value : 'manager',
			},
			{
				label : 'Function Head',
				value : 'function_head',
			},
			{
				label : 'Head',
				value : 'head',
			},
			{
				label : 'Zone Head',
				value : 'zone_head',
			},
			{
				label : 'Region Head',
				value : 'region_head',
			},
			{
				label : 'Cluster Head',
				value : 'cluster_head',
			},
		],
		type        : 'select',
		caret       : true,
		isClearable : true,
		placeholder : 'Choose Hierarchy Level',
		span        : 6,
	},
	{
		name        : 'remarks',
		label       : 'Description',
		type        : 'text',
		placeholder : 'Enter role description',
		span        : 12,
	},
];

const useEditRole = ({ roleData, setShow, getRole }) => {
	const withValueControls = controls.map((control) => ({
		...control,
		// value: roleData[control.name],
	}));

	const { setValue, handleSubmit, ...rest } = useForm();

	useEffect(() => {
		controls.forEach((c) => {
			setValue(c.name, roleData[c.name]);
		});
	}, [setValue, roleData]);

	const [{ loading, error }, trigger] = useRequest({
		url    : '/update_auth_role',
		method : 'post',
	}, { manual: true });

	const editRole = async (data, e) => {
		e.preventDefault();
		try {
			const payload = {
				id                 : roleData?.id,
				role_functions     : data?.role_functions,
				short_name         : data?.short_name,
				remarks            : data?.remarks,
				hierarchy_level    : data?.hierarchy_level,
				role_sub_functions : data?.role_sub_functions,
			};
			const res = await trigger({ data: payload });
			if (!res.hasError) {
				if (getRole) {
					getRole();
				}
				Toast.success(
					'Role updated successfully. Results will be reflected shortly.',
				);
				setShow(false);
			}
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.data)
					|| 'Unable to Edit role Please try again!!',
			);
		}
	};

	return {
		handleSubmit,
		formProps   : { ...rest },
		controls    : withValueControls,
		editRole,
		editRoleApi : { trigger, loading, error },
	};
};

export default useEditRole;
