import { IcMArrowBack } from '@cogoport/icons-react';

import MODE_KEYS_MAPPING from '../configurations/active-mode-key-mapping';
import List from '../ListQuests/List';
import useGetQuestList from '../ListQuests/useGetQuestList';

import QuestForm from './QuestForm';
import styles from './styles.module.css';

const { LIST } = MODE_KEYS_MAPPING;

function CreateQuests({ setMode = () => {} }) {
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

			<QuestForm setParams={setParams} refetch={refetch} />

			<List
				loading={loading}
				list={list}
				paginationData={paginationData}
				getNextPage={getNextPage}
				params={params}
				setParams={setParams}
			/>
		</div>
	);
}

export default CreateQuests;
