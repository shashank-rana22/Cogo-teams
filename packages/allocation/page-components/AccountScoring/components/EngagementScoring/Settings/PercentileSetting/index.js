import { Table } from '@cogoport/components';
import { useState } from 'react';

import getPercentileControl from '../../../../configurations/get-add-percentile-controls';
import WARMTH_ARRAY from '../../../../constants/get-warmth-mapping';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

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

const columns = [
	{
		Header   : 'PERCENTILE RANGE',
		accessor : ({ percentileRange = 0 }) => (
			<section className={styles.data_container}>
				{percentileRange}
			</section>
		),
	},
	{
		Header   : 'BIAS SCORE',
		accessor : ({ biasScore = 0 }) => (
			<section className={styles.data_container}>
				{biasScore}
			</section>
		),
	},
	{
		Header   : 'CURRENT NUMBER OF ACCOUNTS',
		accessor : ({ numberOfAccounts = 0 }) => (
			<section className={styles.data_container}>
				{numberOfAccounts}
			</section>
		),
	},
];

function PercentileSetting() {
	const [editing, setEditing] = useState(false);

	if (editing) {
		return (
			<EditSetting
				ITEM_ARRAY={WARMTH_ARRAY}
				useGetControls={getPercentileControl}
				setEditing={setEditing}
				inputStyle="percentile_input"
				heading="Percentile Setting"
				tooltipData="When the account lies in the respective percentile it would be assigned
				a score at that time based on the table given below to show the region in which
				the account lies whether (COLD , ICE COLD , WARM , HOT , FLAMING HOT)"
			/>
		);
	}

	return (
		<div className={styles.card}>
			<Header setEditing={setEditing} />

			<Table
				layoutType="table"
				columns={columns}
				data={data || []}
			/>
		</div>
	);
}

export default PercentileSetting;
