import Image from 'next/image';

import styles from './styles.module.css';

function Empty() {
	return (
		<div className={styles.container}>
			<Image
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty.svg"
				alt="empty"
				width={200}
				height={200}
			/>
			<span>No Data Found</span>
		</div>
	);
}

export default Empty;
