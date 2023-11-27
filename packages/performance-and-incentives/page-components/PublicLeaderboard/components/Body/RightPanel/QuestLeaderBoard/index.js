import { AsyncSelect } from '@cogoport/forms';

import List from './List';
import styles from './styles.module.css';

function QuestLeaderBoard(props) {
	const { questId, setQuestId } = props;

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.heading}>Quest Leaderboard</div>
				<AsyncSelect
					name="id"
					asyncKey="agent_scoring_quests"
					valueKey="id"
					onChange={setQuestId}
					value={questId}
					placeholder="Select quest"
					size={window.innerWidth >= 2560 ? 'md' : 'sm'}
					className={styles.quest_selector}
				/>
			</div>
			<List questId={questId} />
		</div>
	);
}

export default QuestLeaderBoard;
