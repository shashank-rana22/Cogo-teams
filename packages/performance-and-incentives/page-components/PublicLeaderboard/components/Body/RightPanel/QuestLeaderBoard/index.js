import { AsyncSelect } from '@cogoport/forms';

import CustomSelectOption from '../../../../../../common/CustomSelectOption';

import List from './List';
import styles from './styles.module.css';

function QuestLeaderBoard(props) {
	const { quest, setQuest, officeLocation } = props;

	const renderQuestLabel = (data) => CustomSelectOption({ data, key: 'quests' });

	const handleChange = (val, obj) => {
		setQuest(obj);
	};

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.heading}>Quest Leaderboard</div>
				<AsyncSelect
					name="id"
					asyncKey="agent_scoring_quests"
					valueKey="id"
					onChange={handleChange}
					value={quest?.id}
					placeholder="Select quest"
					size={window.innerWidth >= 2560 ? 'md' : 'sm'}
					className={styles.quest_selector}
					renderLabel={renderQuestLabel}
				/>
			</div>
			<List questId={quest?.id} officeLocation={officeLocation} />
		</div>
	);
}

export default QuestLeaderBoard;
