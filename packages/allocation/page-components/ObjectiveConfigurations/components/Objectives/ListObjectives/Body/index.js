import Filters from './Filters';
import List from './List';
// import styles from './styles.module.css';

function Body(props) {
	const { setActiveMode } = props;

	return (
		<section>
			<Filters />

			<List setActiveMode={setActiveMode} />
		</section>
	);
}

export default Body;
