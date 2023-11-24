import { IcMDislike } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ModalHeader() {
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<IcMDislike
					width="20px"
					height="16px"
				/>

				<div className={styles.main_text}>Rate Card Not Satisfactory</div>
			</div>

			<div className={styles.text}>Give feedback on services you think are not satisfactory</div>
		</div>
	);
}

export default ModalHeader;
