import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import getDistributionControl from '../../../../configurations/get-add-distribution-controls';
import getDistributionColumns from '../../../../constants/get-distribution-columns';
import useGetDistributionScoringSettings from '../../../../hooks/useGetDistributionScoringSettings ';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

function DistributionSetting(props) {
	const { t } = useTranslation(['allocation']);

	const {
		control, handleSubmit, errors, watch, reset,
	} = props;

	const {
		distributionLoading: settingsLoading = false, distributionRefetch: settingsRefetch = () => {},
		distributionList = [],
	} = useGetDistributionScoringSettings();

	const [editing, setEditing] = useState(false);

	const distributionColumns = getDistributionColumns({ t });

	if (isEmpty(distributionList) && !settingsLoading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="row"
					emptyText={t('allocation:distribution_setting_empty_state')}
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
				reset={reset}
				inputStyle="distribution_input"
				heading={t('allocation:distribution_setting_heading')}
				tooltipData={t('allocation:distribution_setting_tooltip_data')}
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
