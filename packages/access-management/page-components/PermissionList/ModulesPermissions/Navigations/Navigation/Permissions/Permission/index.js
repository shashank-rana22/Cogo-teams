import React, { useState, useEffect } from 'react';
import useForm from '@cogoport/front/hooks/useFormCogo';
import startCase from '@cogo/utils/startCase';
import { Label, Container, SpaceBetween, ErrorNew } from './styles';
import Option from './Option';
import getFormValues from '../../../../../../../utils/get-form-values';

const Permission = ({
	permission = {},
	navigation = {},
	customPermissions = null,
	setNavigationRefs = () => {},
	creatingNavs = false,
}) => {
	const formValues = getFormValues(permission, navigation, customPermissions);
	const [errors, setErrors] = useState({});
	const controls = [
		{
			name: permission?.value,
			label: '',
			value: formValues[permission?.value],
			type: 'select',
			options: permission?.options,
			valueKey: 'type',
			multiple: true,
			disabled: creatingNavs,
			rules: { required: 'Permission value is required' },
		},
	];
	const otherControls = [];
	(permission?.options || []).forEach((option) => {
		if (option.options.length > 0) {
			otherControls.push({
				name: `${permission?.value}-${option.type}`,
				options: option.options,
				type: 'select',
				placeholder: 'View',
				caret: true,
				multiple: true,
				disabled: creatingNavs,
				value: formValues[`${permission?.value}-${option.type}`],
			});
		}
	});
	const allControls = [...controls, ...otherControls];
	const { fields, handleSubmit, setValue, watch } = useForm(allControls);

	const newFormValues = watch();

	const permissionValue = newFormValues[permission?.value] || [];

	const handleOptionChange = (selectedOption) => {
		const index = permissionValue.indexOf(selectedOption);
		if (selectedOption === 'none') {
			setValue(permission?.value, [selectedOption]);
		} else if (index > -1) {
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
		allControls.forEach((control) => {
			setValue(control.name, formValues[control.name]);
		});
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
	}, [watch]);

	const isError = errors[permission?.value];

	return (
		<Container>
			<div
				style={{
					minWidth: '150px',
					width: '150px',
					marginRight: 16,
				}}
			>
				<Label>
					{permission?.display_name || startCase(permission?.value)} :
				</Label>
				{(navigation?.main_apis || []).includes(permission?.value) ? (
					<p style={{ margin: 0, fontSize: 10 }}>
						This Permission will decide views in this module
					</p>
				) : null}
			</div>

			<SpaceBetween className={isError ? 'error' : ''}>
				{permission.options.map((option) => (
					<Option
						option={option}
						fields={fields}
						permission={permission}
						handleOptionChange={handleOptionChange}
						permissionValue={permissionValue}
						errors={errors}
						formValues={newFormValues}
					/>
				))}
			</SpaceBetween>
			{isError && (
				<ErrorNew>
					{fields[permission?.value].message || fields[permission?.value].error}
				</ErrorNew>
			)}
		</Container>
	);
};
export default Permission;
