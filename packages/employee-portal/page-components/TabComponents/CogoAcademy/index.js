import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

function CogoAcademy({ setInformationPage }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					role="presentation"
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setInformationPage('')}
				/>
				<div className={styles.title}>COGO ACADEMY</div>
			</div>
			<div> Cogo Academy !</div>
		</div>
	);
}

export default CogoAcademy;
