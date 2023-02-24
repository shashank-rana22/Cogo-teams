// import FormLayout from '@cogo/app-common/components/FormLayoutSimple';
// import { useForm } from '@cogoport/forms';
// import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import propControls, { notIncludeAgent } from '../controls';

import Header from './Header';
import styles from './styles.module.css';

function PopoverView({
	onSubmit = () => {},
	onClose = () => {},
	data = {},
	values: initialValues = {},
	navigation = '',
	showAgent = true,
}) {
	const { userProfileData } = useSelector(({ profile }) => ({
		userProfileData: profile,
	}));
	const [formValues, setFormValues] = useState(initialValues);
	const controls = propControls(data, formValues, navigation, showAgent);
	const modifiedControls = controls.map((control) => {
		if (
			control?.name === 'agent_id'
			&& (formValues?.scope === 'team'
				|| formValues?.scope === 'channel_partner_team')
		) {
			return {
				...control,
				params: {
					...control?.params,
					filters: {
						...control?.params?.filters,
						reporting_manager_id: userProfileData?.id,
					},
				},
			};
		}
		return control;
	});
	const { fields, getValues, setValues } = useForm(modifiedControls, {
		onChange: (vals) => {
			if (vals.scope !== formValues.scope) {
				setFormValues({ ...vals, through_criteria: null });
			}
		},
	});
	useEffect(() => {
		const th_value = data?.viewTypes?.[formValues.scope];
		const values = {
			through_criteria: formValues?.through_criteria || th_value?.[0]?.value,
		};
		if (
			!notIncludeAgent.includes(navigation)
			&& showAgent
			&& formValues.scope !== initialValues.scope
		) {
			values.agent_id = null;
		}
		setValues(values);
	}, [formValues.scope]);
	const handleSubmit = () => {
		const values = getValues(true);
		const filledValues = {};
		Object.keys(values).forEach((key) => {
			if (values[key]) {
				filledValues[key] = values[key];
			}
		});
		onSubmit(filledValues);
		onClose();
	};
	return (
		<div className={styles.container}>
			<Header submitText="APPLY" onSubmit={handleSubmit} onClose={onClose}>
				VIEW SUMMARY
			</Header>
			<FormLayout
				controls={modifiedControls}
				fields={fields}
				themeType="new"
				id_prefix="scope_select"
			/>
		</div>
	);
}
export default PopoverView;
