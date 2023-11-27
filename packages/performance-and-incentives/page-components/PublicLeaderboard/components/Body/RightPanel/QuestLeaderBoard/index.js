import { AsyncSelect } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import CustomSelectOption from '../../../../../../common/CustomSelectOption';

import List from './List';
import styles from './styles.module.css';

function QuestLeaderBoard(props) {
	const { quest, setQuest, officeLocation } = props;

	const renderQuestLabel = (data) => CustomSelectOption({ data, key: 'quests' });

	const handleChange = (_, obj) => {
		setQuest(obj);
	};

	return (
		<div>
			<div className={styles.header}>
				<div>
					<div className={styles.heading}>
						Contest Leaderboard
					</div>
					{!isEmpty(quest)
						? (
							<div className={styles.quest_title}>
								{quest?.name}
								{':  '}
								<span className={styles.date_range}>
									{formatDate({
										date       : quest?.start_date,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType : 'date',
									})}
									{' - '}
									{formatDate({
										date       : quest?.end_date,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType : 'date',
									})}
								</span>
							</div>
						) : null}
				</div>
				<div>
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
			</div>
			<List questId={quest?.id} officeLocation={officeLocation} />
		</div>
	);
}

export default QuestLeaderBoard;
