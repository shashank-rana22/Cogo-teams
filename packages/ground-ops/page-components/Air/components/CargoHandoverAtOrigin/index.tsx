import React from 'react';

import List from '../../commons/List';
import { CargoHandedOverAtOrigin } from '../../configurations/cargo_handedover_at_origin';

function CargoHandoverAtOrigin() {
	const { fields } = CargoHandedOverAtOrigin;

	return (
		<List fields={fields} />
	);
}

export default CargoHandoverAtOrigin;
