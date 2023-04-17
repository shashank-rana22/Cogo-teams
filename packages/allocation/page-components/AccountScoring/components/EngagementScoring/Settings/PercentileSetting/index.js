import { Table } from '@cogoport/components';
import { useState } from 'react';

import getPercentileControl from '../../../../configurations/get-add-percentile-controls';
import WARMTH_ARRAY from '../../../../constants/get-warmth-mapping';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

const columns = [
	{ Header: 'PERCENTILE RANGE', accessor: 'percentileRange' },
	{ Header: 'BIAS SCORE', accessor: 'biasScore' },
	{ Header: 'CURRENT NUMBER OF ACCOUNTS', accessor: 'numberOfAccounts' },
];

const data = [
	{
		percentileRange  : '81-100',
		biasScore        : 10,
		numberOfAccounts : 200,

	},
	{
		percentileRange  : '61-80',
		biasScore        : 10,
		numberOfAccounts : 200,

	},
	{
		percentileRange  : '41-60',
		biasScore        : 10,
		numberOfAccounts : 200,

	},
	{
		percentileRange  : '21-40',
		biasScore        : 10,
		numberOfAccounts : 200,

	},
	{
		percentileRange  : '0-20',
		biasScore        : 10,
		numberOfAccounts : 200,

	},
];

function PercentileSetting() {
	const [editing, setEditing] = useState(false);

	return (
		<div className={styles.card}>
			<Header editing={editing} setEditing={setEditing} />

			{editing
				? <EditSetting ITEM_ARRAY={WARMTH_ARRAY} useGetControls={getPercentileControl} />

				: <Table columns={columns} data={data} />}
		</div>
	);
}

export default PercentileSetting;
