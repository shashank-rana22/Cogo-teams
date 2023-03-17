import { Grid } from '@cogoport/components';

import Field from './Field';
import styles from './styles.module.css';

// const { Row } = Grid;
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
			<div style={stylesdiv}>
				{/* {fields.map((field) => <Field field={field} />)} */}
			</div>
		</div>
	);
}

export default CardHeader;
