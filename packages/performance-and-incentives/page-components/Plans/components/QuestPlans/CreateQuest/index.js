import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import MODE_KEYS_MAPPING from '../configurations/active-mode-key-mapping';
import CREATE_QUEST_KEYS from '../configurations/create-quest-key-mappings';
import useGetQuestList from '../hooks/useGetQuestList';
import List from '../ListQuests/List';

import QuestConfig from './QuestConfig';
import QuestForm from './QuestForm';
import styles from './styles.module.css';

const { LIST } = MODE_KEYS_MAPPING;

const { OVERLAPPING } = CREATE_QUEST_KEYS;

function CreateQuests({ setMode = () => {} }) {
	const [questMode, setQuestMode] = useState(OVERLAPPING);

	const {
		loading,
		list,
		getNextPage,
		params,
		setParams,
		paginationData,
		refetch,
	} = useGetQuestList({ manual: true });

	return (
		<div>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setMode(LIST)}
				/>

				<div className={styles.title}>Create Quest</div>
			</div>

			<QuestForm setParams={setParams} refetch={refetch} setQuestMode={setQuestMode} />

			{questMode === OVERLAPPING
				? (
					<List
						loading={loading}
						list={list}
						paginationData={paginationData}
						getNextPage={getNextPage}
						params={params}
						setParams={setParams}
					/>
				) : <QuestConfig /> }
		</div>
	);
}

export default CreateQuests;
