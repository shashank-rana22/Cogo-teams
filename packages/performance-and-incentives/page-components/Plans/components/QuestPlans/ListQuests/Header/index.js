import { Button } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Header({ control = {}, debounceQuery = () => {} }) {
	const { push } = useRouter();

	const onClickCreate = () => {
		push('/performance-and-incentives/plans?tab=quest_plans&mode=create');
	};

	return (
		<div className={styles.header}>

			<div className={styles.heading}>Quests</div>

			<div className={styles.header_end}>
				<InputController
					name="q"
					placeholder="Search name"
					type="text"
					onChange={debounceQuery}
					control={control}
					size="md"
					className={styles.search_input}
				/>

				<Button
					size="md"
					themeType="primary"
					type="button"
					onClick={onClickCreate}
					className={styles.create_button}
				>
					Create Quest
				</Button>
			</div>
		</div>
	);
}

export default Header;
