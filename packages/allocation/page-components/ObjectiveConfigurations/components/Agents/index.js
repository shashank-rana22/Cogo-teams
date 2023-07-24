import Header from './Header';
import ListAgents from './ListAgents';
import styles from './styles.module.css';
import useGetObjectiveAgentsMapping from './useGetObjectiveAgentsMapping';

function Agents(props) {
	const { setActiveTabDetails } = props;

	const { list, loading, paginationData, getNextPage, setParams } = useGetObjectiveAgentsMapping();

	return (
		<section className={styles.container}>
			<Header setParams={setParams} />

			<ListAgents
				setActiveTabDetails={setActiveTabDetails}
				list={list}
				loading={loading}
				paginationData={paginationData}
				getNextPage={getNextPage}
			/>
		</section>
	);
}

export default Agents;
