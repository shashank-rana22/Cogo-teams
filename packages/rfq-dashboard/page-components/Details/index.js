import BasicDetails from './BasicDetails';
import Graph from './Graph';
import Header from './Header';
import Services from './Services';
import styles from './styles.module.css';

function Details() {
	const loading = false;
	return (
		<div className={styles.container}>
			<Header loading={loading} />
			<div className={styles.basic_details}>
				<BasicDetails loading={loading} />
				<Graph loading={loading} />
			</div>
			<div className={styles.rfq_list}>
				<Services loading={loading} />
			</div>
		</div>
	);
}

export default Details;
