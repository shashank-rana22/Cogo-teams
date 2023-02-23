import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import GenerateHawb from '../../../GenerateHawb';
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
			<Button
				style={{ border: '1px solid #333', padding: '2px 8px', fontSize: 12 }}
				themeType="secondary"
				onClick={() => { handleGenerateMAWB(singleItem); }}
			>
				Generate

			</Button>
		),

	};
	return (
		<>
			<Button onClick={() => setGenerate(!generate)}>HAWB</Button>
			{!generate && <List fields={fields} data={data} loading={loading} functions={functions} />}

			{generate && <GenerateHawb shipment_id={item.shipmentId} task={item} />}

			{generate && <GenerateMAWB item={item} task={item} />}
		</>
	);
}

export default NewAWB;
