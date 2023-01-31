import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Requests() {
	return (
		<section className={styles.container}>
			<Header />

			<List />

			{/* Create And Edit Modal */}
		</section>
	);
}

export default Requests;
