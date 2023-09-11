import { Button } from '@cogoport/components';

import ACTIVE_MODE_KEYS_MAPPING from '../../../../constants/active-mode-key-mapping';

import styles from './styles.module.css';

const { CREATE } = ACTIVE_MODE_KEYS_MAPPING;

function Header(props) {
	const { setActiveMode } = props;

	return (
		<div className={styles.header}>
			<h2 className={styles.heading}>Scoring Plans</h2>

			<Button
				size="lg"
				themeType="primary"
				type="button"
				onClick={() => setActiveMode(CREATE)}
			>
				Create Scoring
			</Button>
		</div>
	);
}

export default Header;
