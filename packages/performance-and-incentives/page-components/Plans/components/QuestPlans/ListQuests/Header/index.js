import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Header() {
	const { push } = useRouter();

	const onClickCreate = () => {
		push('/performance-and-incentives/plans?tab=quest_plans&mode=create');
	};

	return (
		<div className={styles.header}>
			<h2 className={styles.heading}>Quests</h2>

			<Button
				size="lg"
				themeType="primary"
				type="button"
				onClick={onClickCreate}
			>
				Create Quest
			</Button>
		</div>
	);
}

export default Header;
