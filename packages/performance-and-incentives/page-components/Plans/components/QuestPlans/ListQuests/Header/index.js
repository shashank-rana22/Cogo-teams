import { Button } from '@cogoport/components';

import MODE_KEYS_MAPPING from '../../configurations/active-mode-key-mapping';

import styles from './styles.module.css';

const { CREATE } = MODE_KEYS_MAPPING;

function Header({ setMode = () => {} }) {
	return (
		<div className={styles.header}>
			<h2 className={styles.heading}>Quests</h2>

			<Button
				size="lg"
				themeType="primary"
				type="button"
				onClick={() => setMode(CREATE)}
			>
				Create Quest
			</Button>
		</div>
	);
}

export default Header;
