import { Table } from '@cogoport/components';
import { useState } from 'react';

import getBiasControl from '../../../../configurations/get-add-bias-controls';
import BIAS_ARRAY from '../../../../constants/get-bias-setting-mapping';
import useGetEngagementScoringSettings from '../../../../hooks/useGetEngagementScoringSettings';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

const columns = [
	{
		Header   : 'AGE',
		accessor : ({ lower_limit = '', upper_limit = '' }) => (
			<section className={styles.data_container}>
				{lower_limit}
				-
				{upper_limit}
			</section>
		),
	},
	{
		Header   : 'MULTIPLIER',
		accessor : ({ score = 0 }) => (
			<section className={styles.data_container}>
				{score}
			</section>
		),
	},
];

function BiasSetting() {
	const [editing, setEditing] = useState(false);

	const {
		settingsLoading = false, settingsRefetch = () => {},
		biasList = [],
	} = useGetEngagementScoringSettings();

	if (editing) {
		return (
			<EditSetting
				ITEM_ARRAY={BIAS_ARRAY}
				useGetControls={getBiasControl}
				setEditing={setEditing}
				refetch={settingsRefetch}
				preFilledList={biasList}
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
				data={biasList || []}
				loading={settingsLoading}
			/>
		</div>
	);
}

export default BiasSetting;
