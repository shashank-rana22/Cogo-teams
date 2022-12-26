import useFormCogo from '@cogoport/front/hooks/useFormCogo';
import { useRequest } from '@cogo/commons/hooks';
import { useState } from 'react';
import toast from '@cogoport/front/components/toast';
import getApiErrorString from '@cogoport/front/utils/functions/getApiErrorString';
import { useSelector } from '../../../store/index';
import functionSubFunctionMapping from '../configurations/function-sub-function-mapping';

const controls = [
	{
		name: 'short_name',
		label: 'Role Short Name',
		type: 'text',
		maxLength: 16,
		placeholder: 'Enter Role Short Name',
		rules: { required: 'Role Short Name is required' },
		span: 6,
		size: 'lg',
	},
	{
		name: 'role_functions',
		label: 'Role Functions',
		options: [
			{
				label: 'Sales',
				value: 'sales',
			},
			{
				label: 'Supply',
				value: 'supply',
			},
			{
				label: 'Operations',
				value: 'operations',
			},
			{
				label: 'Finance',
				value: 'finance',
			},
		],
		type: 'select',
		multiple: true,
		caret: true,
		isClearable: true,
		placeholder: 'Choose role functions',
		span: 6,
		size: 'lg',
	},
	{
		name: 'role_sub_functions',
		label: 'Role Sub Functions',
		options: [],
		type: 'select',
		multiple: true,
		caret: true,
		isClearable: true,
		placeholder: 'Choose role sub functions',
		span: 6,
		size: 'lg',
	},

	{
		name: 'hierarchy_level',
		label: 'Hierarchy Level',
		options: [
			{
				label: 'Owner',
				value: 'owner',
			},
			{
				label: 'Manager',
				value: 'manager',
			},
			{
				label: 'Function Head',
				value: 'function_head',
			},
			{
				label: 'Head',
				value: 'head',
			},
			{
				label: 'Zone Head',
				value: 'zone_head',
			},
			{
				label: 'Region Head',
				value: 'region_head',
			},
			{
				label: 'Cluster Head',
				value: 'cluster_head',
			},
		],
		type: 'select',
		caret: true,
		isClearable: true,
		placeholder: 'Choose Hierarchy Level',
		span: 6,
		size: 'lg',
	},
	{
		name: 'remarks',
		label: 'Description',
		type: 'text',
		placeholder: 'Enter role description',
		span: 12,
		size: 'lg',
	},
];

const useEditRole = ({ roleData, onClose, getRole }) => {
	const [errors, setErrors] = useState({});
	const scope = useSelector(({ general }) => general?.scope);
	const withValueControls = controls.map((control) => ({
		...control,
		value: roleData[control.name],
	}));

	const { fields, watch, handleSubmit, ...rest } =
		useFormCogo(withValueControls);

	const type = watch('role_functions') || [];

	const subRoleFunctionOptionsEdit = [];
	type.forEach((subType) => {
		subRoleFunctionOptionsEdit.push(
			...(functionSubFunctionMapping[subType] || []),
		);
	});

	fields.role_sub_functions.options = subRoleFunctionOptionsEdit;

	const editRoleApi = useRequest('post', false, scope)('/update_auth_role');

	const editRole = async (data, e) => {
		e.preventDefault();
		try {
			const payload = {
				id: roleData?.id,
				role_functions: data?.role_functions,
				short_name: data?.short_name,
				remarks: data?.remarks,
				hierarchy_level: data?.hierarchy_level,
				role_sub_functions: data?.role_sub_functions,
			};
			const res = await editRoleApi.trigger({ data: payload });
			if (!res.hasError) {
				if (getRole) {
					getRole();
				}
				toast.success(
					'Role updated successfully. Results will be reflected shortly.',
				);
				onClose();
			}
		} catch (err) {
			toast.error(
				getApiErrorString(err?.data) ||
					'Unable to Edit role Please try again!!',
			);
		}
	};

	const onError = (errs, e) => {
		e?.preventDefault();
		setErrors({ ...errs });
	};

	return {
		handleSubmit,
		onError,
		errors,
		formProps: { ...rest, fields },
		controls: withValueControls,
		editRole,
		editRoleApi,
	};
};

export default useEditRole;
