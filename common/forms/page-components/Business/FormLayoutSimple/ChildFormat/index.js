import { Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { arrayOf, shape, string, bool } from 'prop-types';
import React, { useState } from 'react';

import LineItem from './single-item';
import ShipmentLineItem from './single-item-shipment';
import { Container, ButtonDiv, Heading, Label } from './styles';

function AddChargeForm({
	controls,
	width,
	showButtons,
	disableButtons,
	buttonText,
	themeType,
	showDivider,
	heading,
	isShipment,
	label = null,
	initialValue,
	isMovementPort,
	id_prefix,
	...rest
}) {
	const [showAddBtn, setShowAddBtn] = useState(true);
	const [initialMode, setInitialMode] = useState(rest.initialMode);
	const isMobile = useSelector((state) => (state.general || {}).isMobile);
	const getButton = () => {
		if (themeType.includes('big')) {
			return (
				<ButtonDiv style={{ padding: 0 }}>
					<Button
						id={`${id_prefix}_add_more`}
						onClick={() => {
							controls.onAdd();
							if (initialMode && initialMode !== 'edit') {
								setInitialMode('edit');
							}
						}}
						disabled={disableButtons}
						className="small uppercase"
						type="button"
					>
						{`+ ${buttonText}`}
					</Button>
				</ButtonDiv>
			);
		}
		return (
			<ButtonDiv>
				<Button
					style={{
						background   : '#F2F2F2',
						border       : '0.5px dashed #BDBDBD',
						borderRadius : '2px',
						opacity      : disableButtons ? 0.6 : 1,
						color        : '#828282',
						fontSize     : '10px',
						width        : '100%',
					}}
					id={`${id_prefix}_add_more`}
					onClick={() => {
						controls.onAdd();
						if (initialMode && initialMode !== 'edit') {
							setInitialMode('edit');
						}
					}}
					disabled={disableButtons}
					className="small"
					type="button"
				>
					{`+ ${buttonText}`}
				</Button>
			</ButtonDiv>
		);
	};
	return (
		<Container>
			{label && (
				<Label className={`bordered ${themeType}`}>
					{typeof label === 'function' ? label() : label}
				</Label>
			)}
			{controls.childFormat.map((item, index) => (
				<>
					{heading && (
						<Heading className={themeType}>{`${heading} ${index + 1}`}</Heading>
					)}
					{(!isShipment && (
						<LineItem
							{...rest}
							id_prefix={id_prefix}
							key={`lineItem${index + 1}`}
							item={item}
							width={isMobile ? '100%' : width}
							index={index}
							showLastDivider={
								index < controls.childFormat.length - 1 || !showButtons
							}
							isMobile={isMobile}
							showDivider={showDivider}
							themeType={themeType}
							initialMode={initialMode}
						/>
					)) || (
						<ShipmentLineItem
							{...rest}
							id_prefix={id_prefix}
							key={`lineItem${index + 1}`}
							item={item}
							width={isMobile ? '100%' : width}
							index={index}
							showLastDivider={
								index < controls.childFormat.length - 1 || !showButtons
							}
							isMobile={isMobile}
							showDivider={showDivider}
							themeType={themeType}
							isLastIndex={index === controls.childFormat.length - 1}
							previousItem={index > 0 ? controls.childFormat[index - 1] : null}
							initialValue={initialValue}
							isMovementPort={isMovementPort}
							allChilds={controls.childFormat}
							setShowAddBtn={(val) => {
								if (val !== showAddBtn) {
									setShowAddBtn(val);
								}
							}}
						/>
					)}
				</>
			))}
			{showButtons && showAddBtn ? getButton() : null}
		</Container>
	);
}

AddChargeForm.propTypes = {
	controls       : arrayOf(shape({})),
	buttonText     : string,
	showButtons    : bool,
	width          : string,
	themeType      : string.isRequired,
	heading        : string,
	showDivider    : bool,
	isShipment     : bool,
	disableButtons : bool,
	initialValue   : arrayOf(shape({})),
	isMovementPort : bool,
};

AddChargeForm.defaultProps = {
	controls       : [],
	buttonText     : 'ADD LINE ITEM',
	showButtons    : false,
	width          : null,
	heading        : null,
	showDivider    : true,
	isShipment     : false,
	disableButtons : false,
	initialValue   : [],
	isMovementPort : false,
};

export default AddChargeForm;
