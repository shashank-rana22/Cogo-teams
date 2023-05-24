import Field from './Field';
import styles from './styles.module.css';

function CardHeader({ fields = {} }) {
	return (
		<div className={styles.container}>
			{fields.map((field) => <Field field={field} />)}
		</div>
	);
}

export default CardHeader;
