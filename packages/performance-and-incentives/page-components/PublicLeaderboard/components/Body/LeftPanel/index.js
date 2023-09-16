// import List from './List';
import styles from './styles.module.css';
// import TopUsers from './TopUsers';
// import useGetLeaderbordList from './useGetLeaderbordList';

function LeftPanel() {
	// const { list } = useGetLeaderbordList();

	// const [firstUser, secondUser, thirdUser, ...tableList] = list;

	// const topList = [secondUser, firstUser, thirdUser];

	return (
		<div className={styles.container}>
			<p className={styles.heading}>LEADER BOARD</p>

			{/* <TopUsers top_list={topList} />

			<List table_list={tableList} /> */}
		</div>
	);
}

export default LeftPanel;
