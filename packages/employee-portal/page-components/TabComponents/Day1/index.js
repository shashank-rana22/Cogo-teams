import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Day1({ setInformationPage }) {
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
				<div className={styles.title}>DAY 1</div>
			</div>
			<div> Day 1!</div>
		</div>
	);
}

export default Day1;
