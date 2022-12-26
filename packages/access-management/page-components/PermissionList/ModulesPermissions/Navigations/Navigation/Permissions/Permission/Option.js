import React from 'react';
import SelectController from '@cogo/business-modules/form/components/Controlled/SelectController';
import Radio from '@cogoport/front/components/Radio';
import { Checkbox, ToolTip } from '@cogoport/front/components';
import startCase from '@cogo/utils/startCase';
import { OptionsContainer, Label, Row } from './styles';

const SELECT_STYLE = {
	control: {
		fontSize: '14px',
		lineHeight: '16px',
		color: 'black',
		minHeight: '20px',
		cursor: 'auto',
		width: '185px',
		background: '#FFFFFF',
		marginTop: '6px',
		boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
		borderRadius: '4px',
	},
	indicatorsContainer: { height: '30px' },
	menu: {
		width: 'auto',
		background: 'white',
		boxShadow: '0 4px 80px rgba(0, 0, 0, 0.15)',
		borderRadius: 10,
		zIndex: 999999,
		maxWidth: '350px',
		left: 0,
	},
};

const nameMappings = { allowed: 'Allow' };

const Option = ({
	option,
	permission,
	fields,
	handleOptionChange = () => {},
	permissionValue,
	errors = {},
	formValues = {},
}) => {
	const selectKey = `${permission?.value}-${option.type}`;
	const select = (
		<>
			<SelectController
				{...fields[selectKey]}
				disabled={
					!(permissionValue || []).includes(option.type) ||
					fields[selectKey]?.disabled
				}
				style={SELECT_STYLE}
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
	const selectComp = (option?.options || []).length > 0 ? select : null;

	return (
		<OptionsContainer
			className={(option?.options || []).length > 0 ? 'options' : ''}
		>
			{(option?.options || []).length > 0 ? (
				<Label className="option">
					{nameMappings[option.type] || startCase(option.type || '')}
				</Label>
			) : null}
			<Row>
				{option.type === 'none' || option.type === 'allowed' ? (
					<Radio
						themeType="black small"
						onChange={() => handleOptionChange(option.type, option)}
						checked={(permissionValue || []).includes(option.type)}
						disabled={fields[permission.value]?.disabled}
					/>
				) : (
					<Checkbox
						themeType="black small"
						onChange={() => handleOptionChange(option.type, option)}
						checked={(permissionValue || []).includes(option.type)}
						disabled={fields[permission.value]?.disabled}
					/>
				)}
				{selectComp && (formValues[selectKey] || []).length ? (
					<ToolTip
						placement="top"
						theme="light"
						trigger="mouseenter"
						interactive
						content={
							<p style={{ margin: 0, width: '250px' }} interactive>
								<span style={{ fontWeight: 'bold', marginRight: 4 }}>
									Selected Views:
								</span>
								{fields[selectKey].options
									.map((optionObj) =>
										formValues[selectKey].includes(optionObj.type)
											? optionObj.type_display_name
											: null,
									)
									.filter((item) => !!item)
									.join(', ')}
							</p>
						}
					>
						<span style={{ fontSize: 10, marginLeft: 4 }}>view all</span>
					</ToolTip>
				) : null}
			</Row>
			{(option?.options || []).length === 0 ? (
				<Label className="option no-option">
					{nameMappings[option.type] || startCase(option.type || '')}
				</Label>
			) : null}

			{selectComp}
		</OptionsContainer>
	);
};
export default Option;
