import Curriculum from './components/Curriculum';
import Header from './Header';
import styles from './styles.module.css';

function RightComponent({ activeTab }) {
	return (
		<div className={styles.conatiner}>
			<Header activeTab={activeTab} />

			<Curriculum />
		</div>
	);
}

export default RightComponent;
