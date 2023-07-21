import List from './List';
import ObjectiveFilters from './ObjectiveFilters';
// import styles from './styles.module.css';

function Body(props) {
	const { setParams, loading, list, paginationData, getNextPage, setActiveTabDetails } = props;

	return (
		<section>
			<ObjectiveFilters setParams={setParams} />

			<List
				setActiveTabDetails={setActiveTabDetails}
				loading={loading}
				list={list}
				paginationData={paginationData}
				getNextPage={getNextPage}
			/>
		</section>
	);
}

export default Body;
