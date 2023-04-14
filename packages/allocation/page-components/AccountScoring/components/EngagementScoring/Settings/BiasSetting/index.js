import { Card, Table } from '@cogoport/components';
import { useState } from 'react';

import getBiasControl from '../../../../configurations/get-add-bias-controls';
import BIAS_ARRAY from '../../../../constants/get-bias-setting-mapping';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

const columns = [
	{ Header: 'AGE', accessor: 'age' },
	{ Header: 'MULTIPLIER', accessor: 'multiplier' },
];

const data = [
	{
		age        : '0-15',
		multiplier : 0.5,

	},
	{
		age        : '30-60',
		multiplier : 0.25,

	},
	{
		age        : '60-90',
		multiplier : 0.15,

	},
	{
		age        : '90-',
		multiplier : 0.1,

	},
];

function BiasSetting() {
	const [editing, setEditing] = useState(false);

	return (
		<Card className={styles.card}>
			<Card.Title title={<Header editing={editing} setEditing={setEditing} />} />

			{
                editing
                	? (
	<EditSetting
		ITEM_ARRAY={BIAS_ARRAY}
		useGetControls={getBiasControl}
		inputStyle="bias_input"
	/>
                	)
                	: <Table columns={columns} data={data} />
            }

		</Card>
	);
}

export default BiasSetting;
