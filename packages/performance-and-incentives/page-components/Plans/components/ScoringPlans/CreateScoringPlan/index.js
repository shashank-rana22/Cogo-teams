import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import ACTIVE_MODE_KEYS_MAPPING from '../../../constants/active-mode-key-mapping';
import useGetScoringConfig from '../../../hooks/useGetScoringConfig';

import BlockwiseScoring from './BlockwiseScoring';
import ScoringApplicability from './ScoringApplicability';
import styles from './styles.module.css';

const { LIST } = ACTIVE_MODE_KEYS_MAPPING;

function CreateScoringPlan(props) {
	const { setActiveMode } = props;

	const { data = {}, scoring_confing_id, refetch } = useGetScoringConfig();

	return (
		<>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setActiveMode(LIST)}
				/>

				<div className={styles.title}>Create Scoring Plan</div>
			</div>

			<ScoringApplicability data={data} />

			{scoring_confing_id ? <BlockwiseScoring data={data} refetch={refetch} /> : null}

		</>

	);
}

export default CreateScoringPlan;
