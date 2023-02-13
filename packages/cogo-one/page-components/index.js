import Conversations from './Conversations';
import Customers from './Customers';
import styles from './styles.module.css';
import Tabs from './Tabs';

function CogoOne() {
	return (
		<>
			<div className={styles.header}>Cogo One</div>
			<div className={styles.layout_container}>
				<Tabs />
				<Customers />
				<Conversations />
			</div>
		</>
	);
}

export default CogoOne;
