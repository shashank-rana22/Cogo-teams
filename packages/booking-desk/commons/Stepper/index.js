import Child from './Child';
import styles from './styles.module.css';

function Stepper({ options = [], value = '', onChange = () => {} }) {
	return (
		<div className={styles.container}>
			{options?.map((item) => (
				<Child item={item} value={value} onChange={onChange} />
			))}
		</div>
	);
}

export default Stepper;
