import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import getDistributionControl from '../../../../configurations/get-add-distribution-controls';
import distributionColumns from '../../../../constants/get-distribution-columns';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

function DistributionSetting(props) {
	const {
		settingsLoading, settingsRefetch, distributionList,
		control, handleSubmit, errors, watch,
	} = props;

	const [editing, setEditing] = useState(false);

	if (isEmpty(distributionList) && !settingsLoading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="row"
					emptyText="Distribution Data not found"
					textSize={20}
				/>
			</div>
		);
	}

	if (editing && !settingsLoading) {
		return (
			<EditSetting
				useGetControls={getDistributionControl}
				setEditing={setEditing}
				refetch={settingsRefetch}
				preFilledList={distributionList}
				control={control}
				handleSubmit={handleSubmit}
				errors={errors}
				watch={watch}
				inputStyle="distribution_input"
				heading="Distribution Settings"
				tooltipData="Multiplier to calculate warmness of the KAM based on the region they lie in."
			/>
		);
	}

	return (
		<div className={styles.card}>
			<Header setEditing={setEditing} />

			<Table
				columns={distributionColumns || []}
				data={distributionList || []}
				loading={settingsLoading}
			/>
		</div>
	);
}

export default DistributionSetting;
