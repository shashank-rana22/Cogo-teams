import React from 'react';
import Grid from '@cogoport/front/components/Grid';
import Button from '@cogoport/front/components/admin/Button';
import Item from '@cogo/business-modules/form/Layout/Item';
import { IcMDelete } from '@cogoport/icons-react';
import { Container, ButtonContainer } from './styles';

const { Row, Col } = Grid;

const Milestone = ({
	controls,
	control,
	field,
	index,
	name,
	watch,
	error,
	remove,
	showElements = {},
	milesname,
}) => {
	return (
		<Container className={`form-fieldArray-${name}-${index}`} key={field.id}>
			<Row className="form">
				{controls.map((controlItem) => {
					const legs = `${milesname}.${index}.${controlItem.name}`;
					const { span = 6 } = controlItem;
					const show =
						!(controlItem.name in showElements) ||
						showElements[controlItem.name];

					if (watch) {
						return show ? (
							<Col xs={12} md={span || 12} lg={span || 12} xl={span || 12}>
								<Item
									{...controlItem}
									key={legs}
									id={legs}
									itemKey={legs}
									control={control}
									name={legs}
									value={field[controlItem.name]}
									error={error?.[controlItem.name]}
								/>
							</Col>
						) : null;
					}
					return show ? (
						<Col xs={12} md={span || 12} lg={span || 12} xl={span || 12}>
							<Item
								{...controlItem}
								key={legs}
								{...(controlItem.rules || {})}
								defaultValue={field[controlItem.name]}
								error={error?.[controlItem.name]}
							/>
						</Col>
					) : null;
				})}
			</Row>
			{index !== 0 ? (
				<ButtonContainer>
					<Button className="secondary sm" onClick={() => remove(index, 1)}>
						<IcMDelete width={20} height={20} />
						Remove Milestone
					</Button>
				</ButtonContainer>
			) : null}
		</Container>
	);
};
export default Milestone;
