import { IcMCenterAlign } from '@cogoport/icons-react';

import List from '../../ListQuests/List';
import useGetQuestList from '../hooks/useGetQuestList';

import styles from './styles.module.css';

function OverlappedQuest({ params = {}, setParams = () => {} }) {
	const {
		loading,
		list,
		getNextPage,
		paginationData,
	} = useGetQuestList({ params, setParams });

	return (
		<>
			<div className={styles.heading}>
				<IcMCenterAlign height={18} width={18} />
				Overlapped Quests
			</div>
			<List
				loading={loading}
				list={list}
				paginationData={paginationData}
				getNextPage={getNextPage}
				params={params}
				setParams={setParams}
			/>
		</>
	);
}

export default OverlappedQuest;
