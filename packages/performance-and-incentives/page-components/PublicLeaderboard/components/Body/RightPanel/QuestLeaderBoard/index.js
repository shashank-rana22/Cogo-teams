import { AsyncSelect } from '@cogoport/forms';

import styles from './styles.module.css';
import useGetQuestWinner from './useGetQuestWinner';

function QuestLeaderBoard(props) {
	const { questId, setQuestId } = props;

	const { loading, data } = useGetQuestWinner({ questId });

	console.log('loading::', loading);
	console.log('data::', data);

	return (
		<div className={styles.container}>
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
		</div>
	);
}

export default QuestLeaderBoard;
