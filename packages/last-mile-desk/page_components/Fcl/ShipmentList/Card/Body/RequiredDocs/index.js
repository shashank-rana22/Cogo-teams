import { IcCGreenCircle, IcCRedCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RequiredDocs({ item }) {
	const { documents = [] } = item || {};

	return (
		<div className={styles.container}>
			{documents?.map((doc) => {
				const { status, label } = doc || {};
				return (
					<div className={styles.doc_container}>
						<span className={styles.doc_icon}>
							{status === 'completed' ? <IcCGreenCircle height={10} width={10} />
								: <IcCRedCircle height={10} width={10} />}
						</span>
						<span className={styles.doc_label}>{label}</span>
					</div>
				);
			})}
		</div>
	);
}
export default RequiredDocs;
