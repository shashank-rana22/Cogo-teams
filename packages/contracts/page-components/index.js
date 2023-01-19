import PageView from './PageView';
import styles from './styles.module.css';

function Contracts() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Contracts
			</div>
			<PageView />
		</div>
	);
}

export default Contracts;
