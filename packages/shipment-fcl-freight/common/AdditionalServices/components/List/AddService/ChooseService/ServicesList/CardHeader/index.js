import Field from './Field';
import styles from './styles.module.css';

function CardHeader({ fields = {} }) {
	const stylesRow = {
		paddingBottom  : 0,
		borderBottom   : 'none',
		display        : 'flex',
		flexDirection  : 'row',
		justifyContent : 'space-between',
		margin         : 0,
	};

	return (
		<div className={styles.container}>
			<div>
				{/* {fields.map((field) => <Field field={field} />)} */}
			</div>
		</div>
	);
}

export default CardHeader;
