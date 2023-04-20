import { Table } from '@cogoport/components';
import { useState } from 'react';

import getPercentileControl from '../../../../configurations/get-add-percentile-controls';
import WARMTH_ARRAY from '../../../../constants/get-warmth-mapping';
import useGetEngagementScoringSettings from '../../../../hooks/useGetEngagementScoringSettings';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

const columns = [
	{
		Header   : 'PERCENTILE RANGE',
		accessor : ({ lower_limit = 0, upper_limit = 0 }) => (
			<section className={styles.data_container}>
				{lower_limit}
				-
				{upper_limit}
			</section>
		),
	},
	{
		Header   : 'BIAS SCORE',
		accessor : ({ score = 0 }) => (
			<section className={styles.data_container}>
				{score}
			</section>
		),
	},
];

function PercentileSetting() {
	const [editing, setEditing] = useState(false);

	const {
		settingsLoading = false, settingsRefetch = () => {},
		percentileList = [],
	} = useGetEngagementScoringSettings();

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
				refetch={settingsRefetch}
				preFilledList={percentileList}
			/>
		);
	}

	return (
		<div className={styles.card}>
			<Header setEditing={setEditing} />

			<Table
				layoutType="table"
				columns={columns}
				data={percentileList || []}
				loading={settingsLoading}
			/>
		</div>
	);
}

export default PercentileSetting;
