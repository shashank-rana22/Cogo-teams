import IconDelete from '@cogo/deprecated_legacy/icons/ic-delete.svg';
import { Message, Grid1 } from '@cogo/deprecated_legacy/ui';
import { PrimaryDataField as DataForm } from '@cogo/smart-components';
import startCase from '@cogo/utils/startCase';
import { string, bool, number, shape, arrayOf, func } from 'prop-types';
import React, { useState } from 'react';

import getElementId from '../../../utils/get-element-id';
import getExtraProps from '../../../utils/getExtraProps';
import { ErrorNew, Label } from '../styles';

import {
	ItemContainerWithButton,
	Divider,
	LowerLabel,
	Button,
	SpaceBetween,
	Column,
} from './styles';

const { Row, Col } = Grid1;

function LineItem({
	item,
	width,
	showDeleteButton,
	index,
	isMobile,
	showLastDivider,
	noDeleteButtonTill,
	showDivider,
	previousItem,
	isLastIndex,
	initialValue,
	isMovementPort,
	themeType,
	noLabel,
	allChilds,
	setShowAddBtn,
	name,
	id_prefix,
}) {
	const [unitOptions, setUnitOptions] = useState([]);
	const extraProps = {
		width,
		showLabel    : false,
		mobileSelect : isMobile,
		showIcon     : false,
	};
	const getActualValue = (control) => {
		if (index === 0 && control === 'schedule_departure') {
			const newValue =				(initialValue[0] || {}).schedule_departure
				|| item.fields[control].value;
			if (
				!item.fields[control].value
				|| (initialValue[0] || {}).schedule_departure
					!== item.fields[control].value
			) {
				item.fields[control].onChange(newValue);
				return newValue;
			}
			return newValue;
		}
		if (isLastIndex && control === 'to_port_id' && isMovementPort) {
			const newValue =				(initialValue[0] || {}).to_port_id || item.fields[control].value;
			if (!item.fields[control].value) item.fields[control].onChange(newValue);
			return newValue;
		}
		if (isLastIndex && control === 'schedule_arrival') {
			const newValue =				(initialValue[0] || {}).schedule_arrival || item.fields[control].value;
			if (
				!item.fields[control].value
				|| (initialValue[0] || {}).schedule_arrival !== item.fields[control].value
			) {
				item.fields[control].onChange(newValue);
				return newValue;
			}
			return newValue;
		}
		if (previousItem && control === 'from_port_id' && isMovementPort) {
			const newValue =				((previousItem.fields || {}).to_port_id || {}).value
				|| item.fields[control].value;
			if (
				!item.fields[control].value
				|| (item.fields[control].value
					&& ((previousItem.fields || {}).to_port_id || {}).value
					&& ((previousItem.fields || {}).to_port_id || {}).value
						!== item.fields[control].value)
			) {
				item.fields[control].onChange(newValue);
				return newValue;
			}
			return newValue;
		}

		return item.fields[control].value;
	};

	const handleChange = (control, obj) => {
		if (control === 'code') {
			let options = [];
			if (!obj.unit) {
				options = (obj.units || []).map((unit) => ({
					label : startCase(unit),
					value : unit,
				}));
			} else {
				options = [{ label: startCase(obj.unit), value: obj.unit }];
			}
			setUnitOptions(options);
		}
	};

	const getOptions = (control) => {
		if ((item.fields[control].type || '').includes('select')) {
			let { options = [] } = item.fields[control];
			if (control === 'unit') {
				const filteredOptions = (unitOptions || []).filter(
					(option) => option?.value !== item?.fields[control]?.value,
				);
				const withValueOptions = [
					...filteredOptions,
					{
						label : startCase(item.fields[control].value),
						value : item.fields[control].value,
					},
				];
				options = item.fields[control].value
					? withValueOptions
					: filteredOptions;
			}
			if (control === 'invoice') {
				const includedValues = [];
				const allValues = [];
				allChilds.forEach((child, i) => {
					const { value = [] } = child.fields[control];
					if (i !== index) {
						includedValues.push(...(value || []));
					}
					allValues.push(...(value || []));
				});
				if (options.length === allValues.length) {
					setShowAddBtn(false);
				} else if (options.length >= allValues.length) {
					setShowAddBtn(true);
				}
				return options.filter(
					(option) => !includedValues.includes(option?.value),
				);
			}
			return options;
		}
		return undefined;
	};

	const getIfDisabled = (control) => {
		if (isLastIndex && control === 'to_port_id' && isMovementPort) return true;
		if (index === 0 && control === 'schedule_departure') return true;
		if (isLastIndex && control === 'schedule_arrival') return true;
		return false;
	};

	const isHorizontal = (themeType || '').includes('row');
	return (
		<ItemContainerWithButton isMobile={isMobile}>
			<Row style={{ margin: isHorizontal ? 0 : undefined }}>
				{Object.keys(item.fields).map((control) => {
					const {
						label,
						lowerlabel,
						show = true,
						span = 4,
						...rest
					} = item.fields[control];
					const GridProps = {
						xs  : 12,
						sm  : 12,
						md  : 12,
						lg  : isHorizontal ? 12 : span,
						key : `${'regular_1'}_${control}_${index}`,
					};
					const isError = (rest.message || rest.error) && isHorizontal;
					const propsObj = {
						...item.fields[control],
						...extraProps,
						onChange: (val, obj) => {
							item.fields[control].onChange(val, obj);
							handleChange(control, obj);
						},
						options     : getOptions(control),
						showMessage : !lowerlabel && !isError,
						disabled    : getIfDisabled(control) || item.fields[control].disabled,
						value       : getActualValue(control),
					};
					const props = getExtraProps(propsObj, themeType);
					const idProps = getElementId({
						name        : control,
						parent_name : name,
						index,
						type        : rest.type,
						id_prefix,
					});

					return show ? (
						<Col
							{...GridProps}
							style={{
								marginBottom : isHorizontal ? 7 : 24,
								padding      : isHorizontal ? 0 : 8,
							}}
						>
							<>
								<SpaceBetween
									className={`${themeType} ${isError ? 'error' : ''}`}
								>
									{label && <Label className={themeType}>{label}</Label>}
									<Column
										className={`${themeType} ${propsObj.uploadType || ''} ${
											!label ? 'nolabel' : ''
										}`}
									>
										<DataForm {...propsObj} {...props} {...idProps} />
										{lowerlabel && <LowerLabel>{lowerlabel}</LowerLabel>}
									</Column>
								</SpaceBetween>
								{isError && (
									<ErrorNew>
										{item.fields[control].message
												|| item.fields[control].error}
									</ErrorNew>
								)}
								{(item.fields[control].message
										|| item.fields[control].error)
										&& lowerlabel && (
											<Message themeType="error">
												{item.fields[control].message
													|| item.fields[control].error}
											</Message>
								)}
							</>
						</Col>
					) : (
						<></>
					);
				})}
				{showDeleteButton && index >= noDeleteButtonTill ? (
					<Col
						xs={12}
						sm={12}
						md={1}
						lg={1}
						key={`${'regular_1'}_delete`}
						style={{
							margin       : isMobile ? '0px' : null,
							marginBottom : noLabel ? 0 : (isHorizontal && 7) || 24,
							marginTop    : noLabel ? 8 : (isHorizontal && 7) || 24,
							padding      : isHorizontal ? 0 : 8,
						}}
					>
						<Button
							onClick={() => item.onRemove()}
							id={`${id_prefix}_${name}_${index}_delete_btn`}
						>
							<IconDelete
								cursor="pointer"
								size={1.2}
								themeType="grey.primary_text"
							/>
						</Button>
					</Col>
				) : (
					<></>
				)}
			</Row>
			{showLastDivider && showDivider && <Divider />}
		</ItemContainerWithButton>
	);
}

LineItem.propTypes = {
	item               : string.isRequired,
	width              : string,
	showDeleteButton   : bool,
	showLastDivider    : bool,
	isMobile           : bool.isRequired,
	index              : number.isRequired,
	showDivider        : bool,
	noDeleteButtonTill : number,
	previousItem       : shape({}),
	isLastIndex        : bool,
	initialValue       : arrayOf(shape({})),
	isMovementPort     : bool,
	themeType          : string,
	noLabel            : bool,
	allChilds          : arrayOf(shape({})).isRequired,
	setShowAddBtn      : func.isRequired,
};

LineItem.defaultProps = {
	width              : '100%',
	showDeleteButton   : true,
	showLastDivider    : true,
	showDivider        : true,
	noDeleteButtonTill : 1,
	previousItem       : null,
	isLastIndex        : false,
	initialValue       : [],
	isMovementPort     : false,
	themeType          : '',
	noLabel            : false,
};

export default LineItem;
