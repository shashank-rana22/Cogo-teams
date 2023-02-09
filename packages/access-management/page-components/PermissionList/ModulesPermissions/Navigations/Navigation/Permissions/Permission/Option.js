import {
	Checkbox, Tooltip, Radio,
} from '@cogoport/components';
import { MultiselectController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const nameMappings = { allowed: 'Allow' };

function Option({
	option,
	control,
	permission,
	controls: allControls,
	handleOptionChange = () => {},
	permissionValue,
	errors = {},
	formValues = {},
}) {
	const selectKey = `${permission?.value}-${option.type}`;
	const controls = allControls.reduce((acc, c) => {
		acc[c.name] = c;
		return acc;
	}, {});

	const select = (
		<>
			<MultiselectController
				{...controls[selectKey]}
				control={control}
				disabled={
					!(permissionValue || []).includes(option.type)
					|| controls[selectKey]?.disabled
				}
				style={{ width: '80%' }}
				rules={{ required: (permissionValue || []).includes(option.type) }}
				valueKey="type"
				labelKey="type_display_name"
			/>
			{errors?.[selectKey] && (permissionValue || []).includes(option.type) ? (
				<p style={{ fontSize: 10, color: 'crimson', margin: 0 }}>
					This is required
				</p>
			) : null}
		</>
	);

	const optionsLength = (option?.options || []).length > 0;
	const selectComp = optionsLength ? select : null;
	const checkStyles = optionsLength ? styles.options : '';

	return (
		<div className={`${styles.option_container} ${checkStyles}`}>
			{(option?.options || []).length > 0 ? (
				<span className="option">
					{nameMappings[option.type] || startCase(option.type || '')}
				</span>
			) : null}
			<div className={styles.row}>
				{option.type === 'none' || option.type === 'allowed' ? (
					<Radio
						onChange={() => handleOptionChange(option.type, option)}
						checked={(permissionValue || []).includes(option.type)}
						disabled={controls[permission.value]?.disabled}
					/>
				) : (
					<Checkbox
						onChange={() => handleOptionChange(option.type, option)}
						checked={(permissionValue || []).includes(option.type)}
						disabled={controls[permission.value]?.disabled}
					/>
				)}
				{selectComp && (formValues[selectKey] || []).length ? (
					<Tooltip
						placement="top"
						theme="light"
						trigger="mouseenter"
						interactive
						content={(
							<p style={{ margin: 0 }}>
								<span style={{ fontWeight: 'bold', marginRight: 4 }}>
									Selected Views:
								</span>
								{controls[selectKey]?.options
									.map((optionObj) => (formValues?.[selectKey]?.includes(optionObj?.type)
										? optionObj?.type_display_name
										: null))
									.filter((item) => !!item)
									.join(', ')}
							</p>
						)}
					>
						<span style={{ fontSize: 10, marginLeft: 4 }}>view all</span>
					</Tooltip>
				) : null}
			</div>
			{(option?.options || []).length === 0 ? (
				<span className="option no-option">
					{nameMappings[option.type] || startCase(option.type || '')}
				</span>
			) : null}

			{selectComp}
		</div>
	);
}
export default Option;
