import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useAuthRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo } from 'react';

const useEditRole = ({ roleData, setShow, getRole }) => {
	const { t } = useTranslation(['accessManagement']);
	const controls = useMemo(() => [
		{
			name        : 'short_name',
			label       : t('accessManagement:roles_and_permission_update_edit_role_short_name'),
			type        : 'text',
			maxLength   : 16,
			placeholder : t('accessManagement:roles_and_permission_create_role_modal_role_short_name_placeholder'),
			rules       : {
				required:
				t('accessManagement:roles_and_permission_create_role_modal_role_short_name_rules_required'),
			},
			span: 6,
		},
		{
			name    : 'role_functions',
			label   : t('accessManagement:roles_and_permission_update_edit_role_role_functions'),
			options : [
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_role_functions_sales'),
					value : 'sales',
				},
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_role_functions_supply'),
					value : 'supply',
				},
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_role_functions_operations'),
					value : 'operations',
				},
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_role_functions_finance'),
					value : 'finance',
				},
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_role_functions_training'),
					value : 'training',
				},
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_role_functions_hr'),
					value : 'hr',
				},
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_role_functions_external'),
					value : 'external',
				},
			],
			type        : 'multiSelect',
			isClearable : true,
			placeholder : t('accessManagement:roles_and_permission_update_edit_role_role_functions_placeholder'),
			span        : 6,
		},
		{
			name        : 'role_sub_functions',
			label       : t('accessManagement:roles_and_permission_update_edit_role_sub_functions'),
			options     : [],
			type        : 'multiSelect',
			isClearable : true,
			placeholder : t('accessManagement:roles_and_permission_update_edit_role_sub_functions_placeholder'),
			span        : 6,
		},
		{
			name    : 'hierarchy_level',
			label   : t('accessManagement:roles_and_permission_update_edit_role_hierarchy_level'),
			options : [
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_hierarchy_level_owner'),
					value : 'owner',
				},
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_hierarchy_level_manager'),
					value : 'manager',
				},
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_hierarchy_level_function_head'),
					value : 'function_head',
				},
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_hierarchy_level_head'),
					value : 'head',
				},
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_hierarchy_level_zone_head'),
					value : 'zone_head',
				},
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_hierarchy_level_region_head'),
					value : 'region_head',
				},
				{
					label : t('accessManagement:roles_and_permission_update_edit_role_hierarchy_level_cluster_head'),
					value : 'cluster_head',
				},
			],
			type        : 'select',
			caret       : true,
			isClearable : true,
			placeholder : t('accessManagement:roles_and_permission_update_edit_role_hierarchy_level_placeholder'),
			span        : 6,
		},
		{
			name        : 'remarks',
			label       : t('accessManagement:roles_and_permission_update_edit_role_remarks_description'),
			type        : 'text',
			placeholder : t('accessManagement:roles_and_permission_update_edit_role_remarks_placeholder'),
			span        : 12,
		},
	], [t]);
	const withValueControls = controls.map((control) => ({
		...control,
		// value: roleData[control.name],
	}));

	const { setValue, handleSubmit, ...rest } = useForm();

	useEffect(() => {
		controls.forEach((c) => {
			setValue(c.name, roleData[c.name]);
		});
	}, [setValue, roleData, controls]);

	const [{ loading, error }, trigger] = useAuthRequest({
		url    : '/update_role',
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
					t('accessManagement:roles_and_permission_update_role_toast_success'),
				);
				setShow(false);
			}
		} catch (err) {
			Toast.error(
				err.response?.data.error
					|| t('accessManagement:roles_and_permission_update_role_toast_error'),
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
