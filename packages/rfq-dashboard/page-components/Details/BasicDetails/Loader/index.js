import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			<Placeholder
				width="675px"
				height="20px"
				margin="8px 5px"
				className={styles.placeholder_area}
			/>

			<Placeholder
				width="675px"
				height="20px"
				margin="8px 5px"
				className={styles.placeholder_area}
			/>

			<Placeholder
				width="675px"
				height="20px"
				margin="8px 5px"
				className={styles.placeholder_area}
			/>

			<div className={styles.placeholder_row}>
				<Placeholder
					width="150px"
					height="35px"
					margin="8px 5px"
					className={styles.placeholder_area}
				/>
				<Placeholder
					width="150px"
					height="35px"
					margin="8px 5px"
					className={styles.placeholder_area}
				/>
				<Placeholder
					width="150px"
					height="35px"
					margin="8px 5px"
					className={styles.placeholder_area}
				/>
			</div>

		</div>
	);
}

export default Loader;
