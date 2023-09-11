import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import ACTIVE_MODE_KEYS_MAPPING from '../../../constants/active-mode-key-mapping';

import BlockwiseScoring from './BlockwiseScoring';
import ScoringApplicability from './ScoringApplicability';
import styles from './styles.module.css';

const { LIST } = ACTIVE_MODE_KEYS_MAPPING;

function CreateScoringPlan({ setActiveMode = {} }) {
	return (
		<>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setActiveMode(LIST)}
				/>

				<div role="presentation" className={styles.title}>Create Scoring Plan</div>

			</div>

			<ScoringApplicability />

			<BlockwiseScoring />
		</>

	);
}

export default CreateScoringPlan;
