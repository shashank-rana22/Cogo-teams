import { IcMArrowBack } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';

import styles from './styles.module.css';

const Map = dynamic(() => import('../Map'), {
	ssr: false,
});

function Maps({ setInformationPage }) {
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
				<div className={styles.title}>MAPS</div>
			</div>
			<div> This Map points to Cogoport Location in Mumbai!</div>
			<Map />
		</div>
	);
}

export default Maps;
