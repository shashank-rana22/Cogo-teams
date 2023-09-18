import React from 'react';
import Grid from '@cogoport/front/components/Grid';
import Button from '@cogoport/front/components/admin/Button';
import Item from '@cogo/business-modules/form/Layout/Item';
import { IcMDelete } from '@cogoport/icons-react';
import { Containers } from './styles';
import LocationFormat from './Locations';

const { Row, Col } = Grid;

const Container = ({
	controls,
	control,
	field,
	index,
	name,
	remove,
	watch,
	error,
	showElements = {},
}) => {
	return (
		<Containers className={`form-fieldArray-${name}-${index}`}>
			<Row className="form">
				{controls.map((controlItem) => {
					const schedules = `${name}.${index}.${controlItem.name}`;
					const { span = 6, type } = controlItem;
					const show =
						!(controlItem.name in showElements) ||
						showElements[controlItem.name];
					if (type === 'fieldArray') {
						return (
							<LocationFormat
								index={index}
								key={index}
								container_name={name}
								container_index={index}
								watch={watch}
								{...controlItem}
								control={control}
								error={error?.locations}
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
								key={schedules}
							>
								<Item
									{...controlItem}
									id={schedules}
									itemKey={schedules}
									control={control}
									name={schedules}
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
							key={schedules}
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
						Remove Container
					</Button>
				) : null}
			</Row>
		</Containers>
	);
};
export default Container;
