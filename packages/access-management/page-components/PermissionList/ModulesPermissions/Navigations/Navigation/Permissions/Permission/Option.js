import {
	Checkbox, Tooltip, Radio,
} from '@cogoport/components';
import { MultiselectController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const NAME_MAPPINGS = { allowed: 'Allow' };

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
	const selectKey = `${permission?.value}-${option.view_type}`;
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
					!(permissionValue || []).includes(option.view_type)
					|| controls[selectKey]?.disabled
				}
				style={{ width: '80%' }}
				rules={{ required: (permissionValue || []).includes(option.view_type) }}
				valueKey="type"
				labelKey="type_display_name"
			/>
			{errors?.[selectKey] && (permissionValue || []).includes(option.view_type) ? (
				<p style={{ fontSize: 10, color: 'crimson', margin: 0 }}>
					This is required
				</p>
			) : null}
		</>
	);

	const optionsLength = (option?.options || []).length > GLOBAL_CONSTANTS.zeroth_index;
	const selectComp = optionsLength ? select : null;
	const checkStyles = optionsLength ? styles.options : '';

	return (
		<div className={`${styles.option_container} ${checkStyles}`}>
			{(option?.options || []).length > GLOBAL_CONSTANTS.zeroth_index ? (
				<span className="option">
					{NAME_MAPPINGS[option.view_type] || startCase(option.view_type || '')}
				</span>
			) : null}
			<div className={styles.row}>
				{option.view_type === 'none' || option.view_type === 'allowed' ? (
					<Radio
						onChange={() => handleOptionChange(option.view_type, option)}
						checked={(permissionValue || []).includes(option.view_type)}
						disabled={controls[permission.value]?.disabled}
					/>
				) : (
					<Checkbox
						onChange={() => handleOptionChange(option.view_type, option)}
						checked={(permissionValue || []).includes(option.view_type)}
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
			{(option?.options || []).length === GLOBAL_CONSTANTS.zeroth_index ? (
				<span className="option no-option">
					{NAME_MAPPINGS[option.view_type] || startCase(option.view_type || '')}
				</span>
			) : null}

			{selectComp}
		</div>
	);
}
export default Option;
