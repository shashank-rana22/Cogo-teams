import IconDelete from '@cogo/deprecated_legacy/icons/ic-delete.svg';
import { Message, Grid1 } from '@cogo/deprecated_legacy/ui';
import { PrimaryDataField as DataForm } from '@cogo/smart-components';
import { string, bool, number } from 'prop-types';
import React, { useMemo, useState } from 'react';

import getElementId from '../../../utils/get-element-id';
import getExtraProps from '../../../utils/getExtraProps';
import { ErrorNew, Label } from '../styles';

import {
	ItemContainerWithButton,
	Divider,
	LowerLabel,
	Button,
	SpaceBetween,
	RowNew,
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
	themeType,
	noDeleteButtonTill,
	showDivider,
	noLabel,
	initialMode,
	name,
	id_prefix,
}) {
	const [mode, setMode] = useState(initialMode);
	const extraProps = {
		width,
		showLabel    : false,
		mobileSelect : isMobile,
		showIcon     : false,
	};
	const isHorizontal = (themeType || '').includes('row');
	const isNewDesign = (themeType || '').includes('new');
	const rowBottomMargin = useMemo(() => {
		if (isHorizontal) return 7;
		if (isNewDesign) return 0;
		return 24;
	}, [isHorizontal, isNewDesign]);
	const rowTopMargin = useMemo(() => {
		if (isHorizontal) return 7;
		return 24;
	}, [isHorizontal, isNewDesign]);
	return (
		<ItemContainerWithButton isMobile={isMobile}>
			<Row style={{ margin: isHorizontal ? 0 : undefined }}>
				{Object.keys(item.fields).map((control) => {
					const { label, lowerlabel, span = 4, show: fieldShow = true, ...rest } = item.fields[control];
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
						showMessage: !lowerlabel,
					};
					const show = typeof fieldShow === 'function' ? fieldShow(item.fields) : fieldShow;
					const props = getExtraProps(propsObj, themeType);
					const idProps = getElementId({ name: control, parent_name: name, index, type: rest.type, id_prefix });
					return show ? (
						<Col
							{...GridProps}
							style={{
								marginBottom : rowBottomMargin,
								padding      : isHorizontal ? 0 : 8,
							}}
						>
							<>
								<SpaceBetween className={`${themeType} ${isError ? 'error' : ''}`}>
									{label && (
										<Label className={themeType}>
											{label}
										</Label>
									)}
									<Column
										className={`${themeType} ${propsObj.uploadType || ''} ${
											!label ? 'nolabel' : ''
										}`}
									>
										{mode === 'view' ? item?._meta?.[control] || 'Getting Values...' : <DataForm {...propsObj} {...props} {...idProps} />}
										{lowerlabel && <LowerLabel>{lowerlabel}</LowerLabel>}
									</Column>
								</SpaceBetween>
								{isError && (
									<ErrorNew>
										{item.fields[control].message || item.fields[control].error}
									</ErrorNew>
								)}
								{(item.fields[control].message || item.fields[control].error) && lowerlabel && (
									<Message themeType="error">
										{item.fields[control].message || item.fields[control].error}
									</Message>
								)}
							</>

						</Col>
					) : <></>;
				})}
				{((showDeleteButton && index >= noDeleteButtonTill) || initialMode === 'view') ? (
					<Col
						xs={12}
						sm={12}
						md={1}
						lg={1}
						key={`${'regular_1'}_delete`}
						style={{
							margin       : isMobile ? '0px' : null,
							marginBottom : noLabel ? 0 : rowBottomMargin,
							marginTop    : rowTopMargin,
							padding      : isHorizontal ? 0 : 8,
						}}
					>
						<RowNew className={`${themeType}`}>
							<Button
								onClick={() => { item.onRemove(); if (mode && mode === 'edit') { setMode('view'); } }}
								type="button"
								id={`${id_prefix}_${name}_${index}_delete_btn`}
							>
								<IconDelete cursor="pointer" size={1.2} />
							</Button>
							{/* {mode === 'view' ? <Btn className="small outline" onClick={() => setMode('edit')} style={{ marginLeft: 16 }}>Edit</Btn> : null} */}
						</RowNew>
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
	themeType          : string.isRequired,
	isMobile           : bool.isRequired,
	index              : number.isRequired,
	showDivider        : bool,
	noDeleteButtonTill : number,
	noLabel            : bool,
	initialMode        : string,
};

LineItem.defaultProps = {
	width              : '100%',
	showDeleteButton   : true,
	showLastDivider    : true,
	showDivider        : true,
	noDeleteButtonTill : 1,
	noLabel            : false,
	initialMode        : null,
};

export default LineItem;
