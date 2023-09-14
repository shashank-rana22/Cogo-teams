import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import getPercentileControl from '../../../../configurations/get-add-percentile-controls';
import getPercentileColumns from '../../../../constants/get-percentile-columns';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

function PercentileSetting(props) {
	const { t } = useTranslation(['allocation']);

	const {
		settingsLoading, settingsRefetch, percentileList,
		control, handleSubmit, errors, reset,
	} = props;

	const [editing, setEditing] = useState(false);

	const percentileColumns = getPercentileColumns({ t });

	if (isEmpty(percentileList) && !settingsLoading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="row"
					emptyText={t('allocation:percentile_setting_empty_state')}
					textSize={20}
				/>
			</div>
		);
	}

	if (editing && !settingsLoading) {
		return (
			<EditSetting
				useGetControls={getPercentileControl}
				setEditing={setEditing}
				refetch={settingsRefetch}
				preFilledList={percentileList}
				control={control}
				handleSubmit={handleSubmit}
				errors={errors}
				reset={reset}
				inputStyle="percentile_input"
				heading={t('allocation:percentile_setting_heading')}
				tooltipData={t('allocation:percentile_setting_tooltip_data')}
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
				loading={settingsLoading}
			/>
		</div>
	);
}

export default PercentileSetting;
