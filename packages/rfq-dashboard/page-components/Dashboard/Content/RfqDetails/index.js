import Filter from './Filter';
import List from './List';
import styles from './styles.module.css';

function RfqDetails(props) {
	return (
		<div className={styles.container}>
			<Filter {...props} />
			<List />
		</div>
	);
}

export default RfqDetails;
