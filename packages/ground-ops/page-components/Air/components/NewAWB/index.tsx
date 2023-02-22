import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import GenerateMAWB from '../../../GenerateMAWB';
import List from '../../commons/List';
import { NewAWBFields } from '../../configurations/new_awb_fields';

function NewAWB({ data, loading }) {
	const router = useRouter();
	const { fields } = NewAWBFields;
	const [generate, setGenerate] = useState(false);
	const [item, setItem] = useState({});

	const handleGenerateMAWB = (singleItem) => {
		setGenerate(true);
		setItem(singleItem);
	};

	const functions = {
		handleGenerate: (singleItem:any) => (
			<Button onClick={() => { handleGenerateMAWB(singleItem); }}>Generate</Button>
		),

	};
	return (
		<>
			{!generate && <List fields={fields} data={data} loading={loading} functions={functions} />}

			{generate && <GenerateMAWB shipment_id={item.shipmentId} task={item} />}
		</>
	);
}

export default NewAWB;
