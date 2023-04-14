import { Card, Table } from '@cogoport/components';
import { useState } from 'react';

import getDistributionControl from '../../../../configurations/get-add-distribution-controls';
import WARMTH_ARRAY from '../../../../constants/get-warmth-mapping';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

const columns = [
	{ Header: 'WARMTH ', accessor: 'warmth' },
	{ Header: 'RANGE', accessor: 'range' },
];

const data = [
	{
		warmth : 'Flaming Hot',
		range  : '9-10',

	},
	{
		warmth : 'Hot',
		range  : '9-10',

	},
	{
		warmth : 'Warm',
		range  : '9-10',

	},
	{
		warmth : 'Cold',
		range  : '9-10',

	},
	{
		warmth : 'Ice Cold',
		range  : '9-10',

	},
];

function DistributionSetting() {
	const [editing, setEditing] = useState(false);

	return (
		<Card className={styles.card}>
			<Card.Title title={<Header editing={editing} setEditing={setEditing} />} />

			{
                editing
                	? (
	<EditSetting
		ITEM_ARRAY={WARMTH_ARRAY}
		useGetControls={getDistributionControl}
		inputStyle="distribution_input"
	/>
                	)
                	: <Table columns={columns} data={data} />
            }

		</Card>
	);
}

export default DistributionSetting;
