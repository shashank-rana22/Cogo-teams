import { Table } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import getDistributionControl from '../../../../configurations/get-add-distribution-controls';
import WARMTH_ARRAY from '../../../../constants/get-warmth-mapping';
import useGetDistributionScoringSettings from '../../../../hooks/useGetDistributionScoringSettings ';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

const columns = [
	{
		Header   : 'WARMTH',
		accessor : ({ warmth = '' }) => (
			<section className={styles.data_container}>
				{startCase(warmth)}
			</section>
		),
	},
	{
		Header   : 'RANGE',
		accessor : ({ lower_limit = 0, upper_limit = 0 }) => (
			<section className={styles.data_container}>
				{lower_limit}
				-
				{upper_limit}
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

function DistributionSetting() {
	const [editing, setEditing] = useState(false);

	const {
		settingsLoading = false, settingsRefetch = () => {}, distributionList = [],
	} = useGetDistributionScoringSettings();

	if (editing) {
		return (
			<EditSetting
				ITEM_ARRAY={WARMTH_ARRAY}
				useGetControls={getDistributionControl}
				setEditing={setEditing}
				refetch={settingsRefetch}
				preFilledList={distributionList}
				inputStyle="distribution_input"
				heading="Distribution Settings"
				tooltipData="Multiplier to calculate warmness of the KAM based on the region they lie in"
			/>
		);
	}

	return (
		<div className={styles.card}>
			<Header editing={editing} setEditing={setEditing} />

			<Table
				columns={columns}
				data={distributionList || []}
				loading={settingsLoading}
			/>
		</div>
	);
}

export default DistributionSetting;
