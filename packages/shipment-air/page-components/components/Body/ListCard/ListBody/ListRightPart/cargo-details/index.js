import { Pill } from '@cogoport/components';
import React from 'react';

import SERVICE_WISE_LABELS from '../../../../../../constants/service-wise-label';

import renderValue from './renderValue';

function CargoDetails({ item = {} }) {
	const { shipment_type = '' } = item;

	return (
		<>
			{(SERVICE_WISE_LABELS[shipment_type] || []).map((label) => {
				if (item?.[label] && renderValue(label, item)) {
					return (
						<Pill key={label}>
							{renderValue(label, item)}
						</Pill>
					);
				}
				return null;
			})}

		</>
	);
}
export default CargoDetails;
