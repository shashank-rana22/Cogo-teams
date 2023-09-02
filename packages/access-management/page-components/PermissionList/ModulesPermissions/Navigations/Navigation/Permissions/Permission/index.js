import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';

import getFormValues from '../../../../../../../utils/get-form-values';

import Option from './Option';
import styled from './styles.module.css';

const NEGATIVE_INDEX = -1;

function Permission({
	permission = {},
	navigation = {},
	customPermissions = null,
	setNavigationRefs = () => {},
	creatingNavs = false,
}) {
	const { t } = useTranslation(['accessManagement']);
	const formValues = getFormValues(permission, navigation, customPermissions);
	const [errors, setErrors] = useState({});
	const controls = [
		{
			name     : permission?.value,
			label    : '',
			value    : formValues[permission?.value],
			type     : 'select',
			options  : permission?.options,
			valueKey : 'view_type',
			multiple : true,
			disabled : creatingNavs,
			rules    : { required: t('accessManagement:roles_and_permission_permission_value_is_required') },
		},
	];
	const OTHER_CONTROLS = [];
	(permission?.options || []).forEach((option) => {
		if (option.options.length > GLOBAL_CONSTANTS.zeroth_index) {
			OTHER_CONTROLS.push({
				name        : `${permission?.value}-${option.view_type}`,
				options     : option.options,
				type        : 'select',
				placeholder : 'View',
				caret       : true,
				multiple    : true,
				disabled    : creatingNavs,
				value       : formValues[`${permission?.value}-${option.view_type}`],
			});
		}
	});
	const allControls = [...controls, ...OTHER_CONTROLS];
	const { handleSubmit, control, setValue, watch } = useForm();

	const newFormValues = watch();

	const permissionValue = newFormValues[permission?.value] || [];

	const handleOptionChange = (selectedOption) => {
		const index = permissionValue.indexOf(selectedOption);
		if (selectedOption === 'none') {
			setValue(permission?.value, [selectedOption]);
		} else if (index > NEGATIVE_INDEX) {
			const newVal = permissionValue.filter(
				(item) => item !== selectedOption && item !== 'none',
			);
			const val = newVal?.length ? newVal : ['none'];
			setValue(permission?.value, val);
		} else {
			const newVal = [...(permissionValue || []), selectedOption].filter(
				(item) => item !== 'none',
			);
			const val = newVal?.length ? newVal : ['none'];
			setValue(permission?.value, val);
		}
	};

	const onError = (err) => {
		setErrors(err);
	};

	useEffect(() => {
		allControls.forEach((c) => {
			setValue(c.name, formValues[c.name]);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(formValues)]);

	useEffect(() => {
		const subscription = watch((values) => {
			setNavigationRefs({
				values,
				handleSubmit,
				onError,
			});
		});
		return () => subscription.unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch]);

	const isError = errors[permission?.value];

	return (
		<div className={styled.container}>
			<div className={styled.permission}>
				<p>
					{permission?.display_name || startCase(permission?.value)}
					{' '}
					:
				</p>
				{(navigation?.main_apis || []).includes(permission?.value) ? (
					<p style={{ margin: 0, fontSize: 10 }}>
						{t('accessManagement:roles_and_permission_crm_dashboard_permission_decision')}
					</p>
				) : null}
			</div>

			<div className={styled.container_options}>
				{permission.options.map((option) => (
					<Option
						key={option.criteria}
						control={control}
						option={option}
						controls={allControls}
						permission={permission}
						handleOptionChange={handleOptionChange}
						permissionValue={permissionValue}
						errors={errors}
						formValues={newFormValues}
					/>
				))}
			</div>
			{isError && (
				<span>
					{allControls[permission?.value].message || allControls[permission?.value].error}
				</span>
			)}
		</div>
	);
}
export default Permission;
