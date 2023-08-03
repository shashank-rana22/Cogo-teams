import Field from './Field/index';
import styles from './styles.module.css';

function CardHeader({ fields }) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{fields?.map((field) => <Field key={field.key} field={field} />)}
			</div>
		</div>
	);
}

export default CardHeader;
