import FieldArray from './FieldArray';
import styles from './styles.module.css';

function ServiceRequirements(props) {
	const { control } = props;

	return (
		<div className={styles.container}>
			<FieldArray
				name="service_requirements"
				control={control}
			/>
		</div>
	);
}

export default ServiceRequirements;
