import Step from './Step';
import styles from './styles.module.css';

export default function StepperTabs({ options = [], value = '', onChange = () => {} }) {
	return (
		<div className={styles.container}>
			{options?.map((item) => (
				<Step key={item?.value} item={item} value={value} onChange={onChange} />
			))}
		</div>
	);
}
