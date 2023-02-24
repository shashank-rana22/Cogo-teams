import { Message, UICustomTheme } from '@cogo/deprecated_legacy/ui';
import usei18n from '@cogo/i18n';
import { PrimaryDataField as DataForm } from '@cogo/smart-components';
import { useSelector } from '@cogoport/store';
import { arrayOf, shape, objectOf, string, bool, func } from 'prop-types';
import React, { useMemo } from 'react';

// import CUSTOM_THEME from '../../utils/custom-theme';
// import getElementId from '../../utils/get-element-id';
// import getExtraProps from '../../utils/getExtraProps';

import ChildFormat from './ChildFormat';
import { Row, Col } from './StyleCorrectedGrid';
import {
	Label,
	LowerLabel,
	Divider,
	Column,
	SpaceBetween,
	ErrorNew,
} from './styles';
// import styles from './styles.module.css';

function FormLayout({
	controls,
	fields,
	themeType,
	isShipment,
	handleChange,
	id_prefix = 'form',
}) {
	const isMobile = useSelector((state) => (state.general || {}).isMobile);
	const { date } = usei18n();

	const schedule_departure = (fields.schedule_departure || {}).value;
	const schedule_arrival = (fields.schedule_arrival || {}).value;

	const isHorizontal = (themeType || '').includes('row');
	const isNewDesign = (themeType || '').includes('new');

	const rowBottomMargin = useMemo(() => {
		if (isHorizontal) return 7;
		if (isNewDesign) return 0;
		return 24;
	}, [isHorizontal, isNewDesign]);

	return (
		<UICustomTheme
			theme={isHorizontal || isNewDesign ? CUSTOM_THEME(themeType) : {}}
		>
			<Row
				className={themeType || ''}
				style={{ margin: isHorizontal ? 0 : undefined }}
			>
				{controls.map((control) => {
					const i18n =						control.type === 'datepicker' || control.type === 'date-picker'
						? date
						: undefined;
					const {
						span = 6,
						show: fieldShow = true,
						showDivider = false,
						lowerlabel,
						label,
						disableButtons,
						...rest
					} = fields[control.name];
					const show =						typeof fieldShow === 'function' ? fieldShow(fields) : fieldShow;
					const props = getExtraProps(rest, themeType);
					const isError = (rest.message || rest.error) && isHorizontal;
					const idProps = getElementId({
						name        : rest.name,
						parent_name : null,
						index       : null,
						type        : rest.type,
						id_prefix,
					});
					if (control.type === 'childformat' && show) {
						return (
							<Col
								xs={12}
								sm={12}
								md={12}
								lg={12}
								xl={12}
								key={`${'regular_1'}_${control.name}`}
								style={{ padding: isHorizontal ? 0 : 8 }}
								className={`${themeType || ''} ${rest.error ? 'error' : ''}`}
							>
								<ChildFormat
									{...control}
									controls={fields[control.name]}
									buttonText={fields[control.name].buttonText}
									themeType={themeType}
									disableButtons={disableButtons}
									isShipment={isShipment}
									label={label}
									id_prefix={id_prefix}
									noLabel={rest?.noLabel}
									initialValue={
										(control.isMovementDetails && [
											{
												...((control.initialValue || [])[0] || {}),
												schedule_departure,
												schedule_arrival,
											},
										])
										|| control.initialValue
									}
									isMovementPort={control.isMovementPort}
								/>
								{showDivider && <Divider className="childFormat" />}
							</Col>
						);
					}

					return show ? (
						<Col
							xs={12}
							sm={12}
							md={isHorizontal ? 12 : 6}
							lg={isHorizontal ? 12 : span}
							key={`${'regular_1'}_${control.name}`}
							style={{
								marginBottom : rowBottomMargin,
								padding      : isHorizontal ? 0 : 8,
							}}
							className={`${themeType || ''} ${rest.error ? 'error' : ''}`}
						>
							<>
								<SpaceBetween
									className={`${themeType} ${isError ? 'error' : ''}`}
								>
									{label && (
										<Column className={themeType}>
											<Label className={`${control.labelType} ${themeType}`}>
												{label}
											</Label>

											{lowerlabel && control.labelType && (
												<LowerLabel className={control.labelType || ''}>
													{lowerlabel}
												</LowerLabel>
											)}
										</Column>
									)}
									<Column className={`${themeType} ${rest.uploadType || ''}`}>
										<DataForm
											{...{
												...rest,
												...props,
												...idProps,
												i18n,
												width        : '100%',
												showLabel    : false,
												showMessage  : !lowerlabel && !isError,
												mobileSelect : isMobile,
												showIcon     : false,
												isMobile,
												onChange     : (val, obj) => {
													fields[control.name].onChange(val, obj);
													if (handleChange) {
														handleChange(val, fields[control.name], obj);
													}
												},
												onIncrease: control.valueDependent
													? fields[control.dependentValue].onAdd
													: null,
												onDecrease:
													control.valueDependent
													&& (fields[control.dependentValue].childFormat || [])
														.length > 0
														? fields[control.dependentValue].childFormat[
															fields[control.dependentValue].childFormat
																.length - 1
														  ].onRemove
														: null,
											}}
										/>
										{lowerlabel && !control.labelType && (
											<LowerLabel>{lowerlabel}</LowerLabel>
										)}
									</Column>
								</SpaceBetween>
								{isError && <ErrorNew>{rest.message || rest.error}</ErrorNew>}
								{(rest.message || rest.error) && lowerlabel && !isError && (
									<Message showIcon={false} themeType="error">
										{rest.message || rest.error}
									</Message>
								)}
							</>
							{showDivider && <Divider />}
						</Col>
					) : (
						<></>
					);
				})}
			</Row>
		</UICustomTheme>
	);
}

FormLayout.propTypes = {
	controls     : arrayOf(shape({})),
	fields       : objectOf(shape({})),
	themeType    : string,
	isShipment   : bool,
	handleChange : func,
};

FormLayout.defaultProps = {
	controls     : [],
	fields       : {},
	themeType    : '',
	isShipment   : false,
	handleChange : () => {},
};

export default FormLayout;
