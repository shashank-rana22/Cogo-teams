import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import getBiasControl from '../../../../configurations/get-add-bias-controls';
import biasColumns from '../../../../constants/get-bias-columns';
import EditSetting from '../EditSetting/index';

import Header from './Header';
import styles from './styles.module.css';

function BiasSetting(props) {
	const {
		settingsLoading, settingsRefetch, biasList,
		control, handleSubmit, errors,
	} = props;

	const [editing, setEditing] = useState(false);

	if (settingsLoading) {
		<div className={styles.card}>
			<Header setEditing={setEditing} loading={settingsLoading} />

			<Table
				columns={biasColumns || []}
				data={[]}
				loading={settingsLoading}
			/>
		</div>;
	}

	if (isEmpty(biasList)) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="row"
					emptyText="Bias Data not found"
					textSize={20}
				/>
			</div>
		);
	}

	if (editing) {
		return (
			<EditSetting
				useGetControls={getBiasControl}
				setEditing={setEditing}
				refetch={settingsRefetch}
				preFilledList={biasList}
				control={control}
				handleSubmit={handleSubmit}
				errors={errors}
				inputStyle="bias_input"
				heading="Bias Settings"
				tooltipData="Bias is used to calculate the warmness of the KAM."
			/>
		);
	}

	return (
		<div className={styles.card}>
			<Header editing={editing} setEditing={setEditing} />

			<Table
				columns={biasColumns || []}
				data={biasList || []}
				loading={settingsLoading}
			/>
		</div>
	);
}

export default BiasSetting;
