import Header from './Header';
import ListAgents from './ListAgents';
import styles from './styles.module.css';

function Agents(props) {
	const { setActiveTabDetails } = props;

	return (
		<section className={styles.container}>
			<Header />

			<ListAgents setActiveTabDetails={setActiveTabDetails} />
		</section>
	);
}

export default Agents;
