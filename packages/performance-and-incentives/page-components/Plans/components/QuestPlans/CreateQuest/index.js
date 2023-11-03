import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import MODE_KEYS_MAPPING from '../configurations/active-mode-key-mapping';
import useGetQuestList from '../hooks/useGetQuestList';
import List from '../ListQuests/List';

import QuestConfig from './QuestConfig';
import QuestForm from './QuestForm';
import styles from './styles.module.css';

const { LIST } = MODE_KEYS_MAPPING;

function CreateQuests({ setMode = () => {} }) {
	const router = useRouter();

	const { query: { id = null } } = router;

	const {
		loading,
		list,
		getNextPage,
		params,
		setParams,
		paginationData,
		refetch,
	} = useGetQuestList({ manual: true });

	const onClickBack = () => {
		if (id) router.push('/performance-and-incentives/plans?tab=quest_plans');
		setMode(LIST);
	};

	return (
		<div>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={onClickBack}
				/>

				<div className={styles.title}>Create Quest</div>
			</div>

			<QuestForm setParams={setParams} refetch={refetch} />

			{id ? <QuestConfig />
				: 	(
					<List
						loading={loading}
						list={list}
						paginationData={paginationData}
						getNextPage={getNextPage}
						params={params}
						setParams={setParams}
					/>
				)}
		</div>
	);
}

export default CreateQuests;
