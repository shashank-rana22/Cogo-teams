import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoaderPortsCard() {
	return (
		<div className={styles.loader_box}>
			<div className={styles.service}>
				<Placeholder
					width="30px"
					height="20px"
					// margin="8px 5px"
					className={styles.placeholder}
				/>
				<Placeholder
					width="30px"
					height="20px"
					margin="8px 0 0 0 "
					className={styles.placeholder}
				/>
			</div>
			<div className={styles.ports_tags_container}>
				<Placeholder
					width="520px"
					height="20px"
					// margin="8px 5px"
					className={styles.placeholder}
				/>
				<Placeholder
					width="520px"
					height="20px"
					margin="8px 0 0 0 "
					className={styles.placeholder}
				/>
			</div>
			<div className={styles.service_stats}>
				<Placeholder
					width="150px"
					height="48px"
					margin="0 10px 0 0"
					className={styles.placeholder}
				/>
				<Placeholder
					width="150px"
					height="48px"
					margin="0 10px 0 0"
					className={styles.placeholder}
				/>
				<Placeholder
					width="150px"
					height="48px"
					// margin="8px 5px"
					className={styles.placeholder}
				/>
			</div>
			<div className={styles.price_fright_ctr_section}>
				<Placeholder
					width="100px"
					height="20px"
					// margin="8px 5px"
					className={styles.placeholder}
				/>
				<Placeholder
					width="100px"
					height="20px"
					margin="8px 0 0 0"
					className={styles.placeholder}
				/>
			</div>

		</div>
	);
}

export default LoaderPortsCard;
