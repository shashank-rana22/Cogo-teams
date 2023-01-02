import {
	MultiSelect, Checkbox, Tooltip, Radio,
} from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const SELECT_STYLE = {
	control: {
		fontSize     : '14px',
		lineHeight   : '16px',
		color        : 'black',
		minHeight    : '20px',
		cursor       : 'auto',
		width        : '185px',
		background   : '#FFFFFF',
		marginTop    : '6px',
		boxShadow    : '0px 0px 3px rgba(0, 0, 0, 0.25)',
		borderRadius : '4px',
	},
	indicatorsContainer : { height: '30px' },
	menu                : {
		width        : 'auto',
		background   : 'white',
		boxShadow    : '0 4px 80px rgba(0, 0, 0, 0.15)',
		borderRadius : 10,
		zIndex       : 999999,
		maxWidth     : '350px',
		left         : 0,
	},
};

const nameMappings = { allowed: 'Allow' };

function Option({
	option,
	permission,
	controls,
	handleOptionChange = () => {},
	permissionValue,
	errors = {},
	formValues = {},
}) {
	const selectKey = `${permission?.value}-${option.type}`;
	const select = (
		<>
			<MultiSelect

				{...controls[selectKey]}
				disabled={
					!(permissionValue || []).includes(option.type)
					|| controls[selectKey]?.disabled
				}
				style={{ width: '50px' }}
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
						themeType="black small"
						onChange={() => handleOptionChange(option.type, option)}
						checked={(permissionValue || []).includes(option.type)}
						disabled={controls[permission.value]?.disabled}
					/>
				) : (
					<Checkbox
						themeType="black small"
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
						render={(
							<p style={{ margin: 0, width: '250px' }}>
								<span style={{ fontWeight: 'bold', marginRight: 4 }}>
									Selected Views:
								</span>
								{controls[selectKey].options
									.map((optionObj) => (formValues[selectKey].includes(optionObj.type)
										? optionObj.type_display_name
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
