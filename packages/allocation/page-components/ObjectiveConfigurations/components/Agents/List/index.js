import Header from './Header';
import ListAgents from './ListAgents';
import styles from './styles.module.css';
import useGetObjectiveAgentsMapping from './useGetObjectiveAgentsMapping';

function List(props) {
	const { setActiveMode } = props;

	const { list, loading, refetch, paginationData, getNextPage, setParams } = useGetObjectiveAgentsMapping();

	return (
		<section className={styles.container}>
			<Header setParams={setParams} />

			<ListAgents
				setActiveMode={setActiveMode}
				list={list}
				loading={loading}
				refetch={refetch}
				paginationData={paginationData}
				getNextPage={getNextPage}
			/>
		</section>
	);
}

export default List;
