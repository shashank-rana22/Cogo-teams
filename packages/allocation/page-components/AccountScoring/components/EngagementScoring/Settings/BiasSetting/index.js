import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import getBiasControl from '../../../../configurations/get-add-bias-controls';
import getBiasColumns from '../../../../constants/get-bias-columns';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

function BiasSetting(props) {
	const { t } = useTranslation(['allocation']);

	const {
		settingsLoading, settingsRefetch, biasList,
		control, handleSubmit, errors, reset,
	} = props;

	const [editing, setEditing] = useState(false);

	const biasColumns = getBiasColumns({ t });

	if (isEmpty(biasList) && !settingsLoading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="row"
					emptyText={t('allocation:bias_setting_empty_state')}
					textSize={20}
				/>
			</div>
		);
	}

	if (editing && !settingsLoading) {
		return (
			<EditSetting
				useGetControls={getBiasControl}
				setEditing={setEditing}
				refetch={settingsRefetch}
				preFilledList={biasList}
				control={control}
				handleSubmit={handleSubmit}
				errors={errors}
				reset={reset}
				inputStyle="bias_input"
				heading={t('allocation:bias_setting_heading')}
				tooltipData={t('allocation:bias_setting_tooltip_data')}
			/>
		);
	}

	return (
		<div className={styles.card}>
			<Header setEditing={setEditing} />

			<Table
				columns={biasColumns || []}
				data={biasList || []}
				loading={settingsLoading}
			/>
		</div>
	);
}

export default BiasSetting;
