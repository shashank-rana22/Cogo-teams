import React from 'react';
import Grid from '@cogoport/front/components/Grid';
import Button from '@cogoport/front/components/admin/Button';
import Item from '@cogo/business-modules/form/Layout/Item';
import { IcMDelete } from '@cogoport/icons-react';
import { Containers } from './styles';
import MilestoneFormat from './Milestones';

const { Row, Col } = Grid;

const Location = ({
	controls,
	control,
	field,
	index,
	locationName,
	name,
	remove,
	watch,
	error,
	indexnumber,
	showElements = {},
}) => {
	return (
		<Containers className={`form-fieldArray-${name}-${index}`}>
			<Row className="form">
				{controls.map((controlItem) => {
					const milestoneName = `${locationName}.${index}.${controlItem.name}`;
					const { span = 6, type } = controlItem;
					const show =
						!(controlItem.name in showElements) ||
						showElements[controlItem.name];
					if (type === 'fieldArray') {
						return (
							<MilestoneFormat
								index={index}
								indexnumber={indexnumber}
								key={index}
								watch={watch}
								milestoneName={milestoneName}
								{...controlItem}
								control={control}
								error={error?.milestones}
							/>
						);
					}

					if (watch) {
						return show ? (
							<Col
								xs={12}
								md={span || 12}
								lg={span || 12}
								xl={span || 12}
								key={milestoneName}
							>
								<Item
									{...controlItem}
									id={milestoneName}
									itemKey={milestoneName}
									control={control}
									name={milestoneName}
									value={field[controlItem.name]}
									error={error?.[controlItem.name]}
								/>
							</Col>
						) : null;
					}
					return show ? (
						<Col
							xs={12}
							md={span || 12}
							lg={span || 12}
							xl={span || 12}
							key={milestoneName}
						>
							<Item
								{...controlItem}
								{...(controlItem.rules || {})}
								defaultValue={field[controlItem.name]}
								error={error?.[controlItem.name]}
							/>
						</Col>
					) : null;
				})}

				{index !== 0 ? (
					<Button className="secondary sm" onClick={() => remove(index, 1)}>
						<IcMDelete width={20} height={20} />
						Remove Location
					</Button>
				) : null}
			</Row>
		</Containers>
	);
};
export default Location;
