import { Table } from '@cogoport/components';
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

	if (editing) {
		return (
			<EditSetting
				ITEM_ARRAY={WARMTH_ARRAY}
				useGetControls={getDistributionControl}
				setEditing={setEditing}
				inputStyle="distribution_input"
				heading="Distribution Settings"
				tooltipData="Multiplier to calculate warmness of the KAM based on the region they lie in"
			/>
		);
	}

	return (
		<div className={styles.card}>
			<Header editing={editing} setEditing={setEditing} />

			<Table columns={columns} data={data} />
		</div>
	);
}

export default DistributionSetting;
