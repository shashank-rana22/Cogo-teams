import styles from './styles.module.css';

function UpdateAction({ task = {} }) {
	console.log('update action', task);
	return (
		<div className={styles.container}>
			update action
		</div>
	);
}
export default UpdateAction;
