import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetScoringConfig from '../../../hooks/useGetScoringConfig';

import BlockwiseScoring from './BlockwiseScoring';
import ScoringApplicability from './ScoringApplicability';
import styles from './styles.module.css';

function CreateScoringPlan() {
	const { push, query: { mode } } = useRouter();

	const isEditMode = mode === 'edit';

	const [editApplicability, setEditApplicability] = useState(!isEditMode);

	const { data = {}, refetch, getConfigLoading } = useGetScoringConfig();

	return (
		<>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => push('/performance-and-incentives/plans')}
				/>

				<div className={styles.title}>Create Scoring Plan</div>
			</div>

			<ScoringApplicability
				key={getConfigLoading}
				data={data}
				getConfigLoading={getConfigLoading}
				editApplicability={editApplicability}
				setEditApplicability={setEditApplicability}
			/>

			{!editApplicability ? (
				<BlockwiseScoring
					data={data}
					refetch={refetch}
					getConfigLoading={getConfigLoading}
				/>
			) : null}

		</>

	);
}

export default CreateScoringPlan;
