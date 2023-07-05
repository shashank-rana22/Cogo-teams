import Filters from './Filters';
import List from './List';
// import styles from './styles.module.css';

function Body(props) {
	const { setActiveTabDetails } = props;

	return (
		<section>
			<Filters />

			<List setActiveTabDetails={setActiveTabDetails} />
		</section>
	);
}

export default Body;
