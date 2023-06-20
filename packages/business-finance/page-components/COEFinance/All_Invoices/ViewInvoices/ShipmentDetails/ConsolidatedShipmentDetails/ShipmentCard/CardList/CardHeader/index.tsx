import Field from './Field/index';
import styles from './styles.module.css';

function CardHeader({ fields = [], showCode = false }) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{fields?.map((field) => {
					if (field.show === false) {
						return null;
					}
					return <Field key={field.label} field={field} showCode={showCode} />;
				})}
			</div>
		</div>
	);
}

export default CardHeader;
