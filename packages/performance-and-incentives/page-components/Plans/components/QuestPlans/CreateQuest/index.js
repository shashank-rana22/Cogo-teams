import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetQuest from './hooks/useGetQuest';
import OverlappedQuest from './OverlappedQuest';
import QuestConfigForm from './QuestConfigForm';
import LoadingState from './QuestConfigForm/LoadingState';
import QuestForm from './QuestForm';
import styles from './styles.module.css';

function CreateQuests() {
	const router = useRouter();

	const { query: { id } = {} } = router;

	const { loading: questLoading, data, refetch } = useGetQuest({ id });

	const [params, setParams] = useState({});

	const [showOverlapped, setShowOverlapped] = useState(false);

	const [questData, setQuestData] = useState({});

	const onClickBack = () => {
		router.push('/performance-and-incentives/plans?tab=quest_plans');
	};

	if (questLoading) return <LoadingState />;

	return (
		<>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={onClickBack}
				/>

				<div className={styles.title}>Create Quest</div>
			</div>

			<QuestForm
				questData={questData}
				setQuestData={setQuestData}
				setParams={setParams}
				data={data}
				setShowOverlapped={setShowOverlapped}
			/>

			{id ? (
				<QuestConfigForm
					questData={questData}
					data={data}
					refetch={refetch}
				/>
			) : null}

			{!id && showOverlapped
				? <OverlappedQuest params={params} setParams={setParams} showOverlapped={showOverlapped} />
				: null}
		</>
	);
}

export default CreateQuests;
