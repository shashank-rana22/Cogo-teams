import List from './List';
import ObjectiveFilters from './ObjectiveFilters';
// import styles from './styles.module.css';

function Body(props) {
	const { setActiveTabDetails } = props;

	return (
		<section>
			<ObjectiveFilters />

			<List setActiveTabDetails={setActiveTabDetails} />
		</section>
	);
}

export default Body;
