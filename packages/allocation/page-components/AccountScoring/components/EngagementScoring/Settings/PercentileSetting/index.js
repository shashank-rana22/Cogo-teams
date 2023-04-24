import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import getPercentileControl from '../../../../configurations/get-add-percentile-controls';
import percentileColumns from '../../../../constants/get-percentile-columns';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

function PercentileSetting(props) {
	const {
		settingsLoading, settingsRefetch, percentileList,
		control, handleSubmit, errors,
	} = props;

	const [editing, setEditing] = useState(false);

	if (settingsLoading) {
		return (
			<div className={styles.card}>
				<Header setEditing={setEditing} loading={settingsLoading} />

				<Table
					layoutType="table"
					columns={percentileColumns || []}
					data={[]}
					loading={settingsLoading}
				/>
			</div>
		);
	}

	if (isEmpty(percentileList)) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="row"
					emptyText="Percentile Data not found"
					textSize={20}
				/>
			</div>
		);
	}

	if (editing) {
		return (
			<EditSetting
				useGetControls={getPercentileControl}
				setEditing={setEditing}
				refetch={settingsRefetch}
				preFilledList={percentileList}
				control={control}
				handleSubmit={handleSubmit}
				errors={errors}
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
				columns={percentileColumns || []}
				data={percentileList || []}
			/>
		</div>
	);
}

export default PercentileSetting;
