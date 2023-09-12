import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import ACTIVE_MODE_KEYS_MAPPING from '../../../constants/active-mode-key-mapping';
import useGetScoringConfig from '../../../hooks/useGetScoringConfig';

import BlockwiseScoring from './BlockwiseScoring';
import ScoringApplicability from './ScoringApplicability';
import styles from './styles.module.css';

const { LIST } = ACTIVE_MODE_KEYS_MAPPING;

function CreateScoringPlan({ setActiveMode = {} }) {
	const { query } = useRouter();
	const { id } = query;
	const { data } = useGetScoringConfig();

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

			{id ? <BlockwiseScoring data={data} /> : null}

		</>

	);
}

export default CreateScoringPlan;
