import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import MODE_KEYS_MAPPING from '../configurations/active-mode-key-mapping';

import OverlappedQuest from './OverlappedQuest';
import QuestConfig from './QuestConfig';
import QuestForm from './QuestForm';
import useGetQuest from './QuestForm/hooks/useGetQuest';
import styles from './styles.module.css';

const { LIST } = MODE_KEYS_MAPPING;

function CreateQuests({ setMode = () => {} }) {
	const router = useRouter();

	const { query: { id = null } } = router;

	const { loading: questLoading, data } = useGetQuest({ id });

	const [params, setParams] = useState({});

	const onClickBack = () => {
		if (id) router.push('/performance-and-incentives/plans?tab=quest_plans');
		setMode(LIST);
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

			<QuestForm setParams={setParams} data={data} />

			{id ? <QuestConfig config_id={id} data={data} />
				: <OverlappedQuest params={params} setParams={setParams} />}
		</div>
	);
}

export default CreateQuests;
