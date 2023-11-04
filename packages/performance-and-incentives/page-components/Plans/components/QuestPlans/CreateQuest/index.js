import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import OverlappedQuest from './OverlappedQuest';
import QuestConfig from './QuestConfig';
import QuestForm from './QuestForm';
import useGetQuest from './QuestForm/hooks/useGetQuest';
import styles from './styles.module.css';

function CreateQuests() {
	const router = useRouter();

	const { query: { id = null } } = router;

	const { loading: questLoading, data } = useGetQuest({ id });

	const [params, setParams] = useState({});

	const [showOverlapped, setShowOverlapped] = useState(false);

	const onClickBack = () => {
		router.push('/performance-and-incentives/plans?tab=quest_plans');
	};

	if (questLoading) return null;

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

			<QuestForm setParams={setParams} data={data} setShowOverlapped={setShowOverlapped} />

			{id ? <QuestConfig quest_id={id} data={data} /> : null}

			{!id && showOverlapped
				? <OverlappedQuest params={params} setParams={setParams} showOverlapped={showOverlapped} />
				: null}
		</div>
	);
}

export default CreateQuests;
