import { Button } from '@cogoport/components';

import ACTIVE_MODE_KEYS_MAPPING from '../../../constants/active-mode-key-mapping';

import styles from './styles.module.css';

const { CREATE } = ACTIVE_MODE_KEYS_MAPPING;

function ListScoringPlans({ setActiveMode = {} }) {
	return (
		<div className={styles.container}>
			<h2>Scoring Plans</h2>

			<Button
				size="md"
				themeType="primary"
				onClick={() => setActiveMode(CREATE)}
			>
				Create Scoring
			</Button>
		</div>
	);
}

export default ListScoringPlans;
