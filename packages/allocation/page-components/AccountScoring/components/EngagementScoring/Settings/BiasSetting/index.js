import { Table } from '@cogoport/components';
import { useState } from 'react';

import getBiasControl from '../../../../configurations/get-add-bias-controls';
import BIAS_ARRAY from '../../../../constants/get-bias-setting-mapping';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

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

const columns = [
	{
		Header   : 'AGE',
		accessor : ({ age = '' }) => (
			<section className={styles.data_container}>
				{age}
			</section>
		),
	},
	{
		Header   : 'MULTIPLIER',
		accessor : ({ multiplier = 0 }) => (
			<section className={styles.data_container}>
				{multiplier}
			</section>
		),
	},
];

function BiasSetting() {
	const [editing, setEditing] = useState(false);

	if (editing) {
		return (
			<EditSetting
				ITEM_ARRAY={BIAS_ARRAY}
				useGetControls={getBiasControl}
				setEditing={setEditing}
				inputStyle="bias_input"
				heading="Bias Settings"
				tooltipData="Bias is used to calculate the warmness of the KAM"
			/>
		);
	}

	return (
		<div className={styles.card}>
			<Header editing={editing} setEditing={setEditing} />

			<Table
				columns={columns}
				data={data || []}
			/>
		</div>
	);
}

export default BiasSetting;
