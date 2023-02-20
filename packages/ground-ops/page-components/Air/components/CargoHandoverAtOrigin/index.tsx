import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import GenerateMAWB from '../../../GenerateMAWB';
import List from '../../commons/List';
import { CargoHandedOverAtOrigin } from '../../configurations/cargo_handedover_at_origin';

function CargoHandoverAtOrigin({ data, loading }) {
	const { fields } = CargoHandedOverAtOrigin;
	const [generate, setGenerate] = useState(false);
	const [item, setItem] = useState({});
	const functions = {
		handleGenerate: (singleItem:any) => (
			<Button onClick={() => { setGenerate(true); setItem(singleItem); }}>Generate</Button>
		),

	};
	return (
		<>
			{!generate && <List fields={fields} data={data} loading={loading} functions={functions} />}

			{generate && <GenerateMAWB shipment_id={item.shipmentId} task={item} />}
		</>
	);
}

export default CargoHandoverAtOrigin;
