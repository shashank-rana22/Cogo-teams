import React from 'react';
import getValue from '@cogo/bookings/ShipmentDetails/utils/getValue';
import { Container, Item, ItemLabel, ItemValue } from './styles';

const Details = ({ details, shipment_data }) => {
	return (
		<Container>
			{details.map((item) => {
				const value = getValue(shipment_data, item);
				if (!value) {
					return null;
				}

				return (
					<Item>
						<ItemLabel>{item.label} :</ItemLabel>
						<ItemValue> {value}</ItemValue>
					</Item>
				);
			})}
		</Container>
	);
};

export default Details;
