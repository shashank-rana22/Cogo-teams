import Header from './Header';
import ListAgents from './ListAgents';
import styles from './styles.module.css';

function Agents() {
	return (
		<section className={styles.container}>
			<Header />

			<ListAgents />
		</section>
	);
}

export default Agents;
