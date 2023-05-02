import { IcCGreenCircle, IcCRedCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

const ICON_DIM = 10;

function RequiredDocs({ item = {} }) {
	const { documents = [] } = item || {};

	return (
		<div className={styles.container}>
			{documents?.map((doc) => {
				const { status = '', label = '' } = doc || {};

				return (
					<div className={styles.doc_container}>
						<span className={styles.doc_icon}>
							{status === 'completed'
								? <IcCGreenCircle height={ICON_DIM} width={ICON_DIM} />
								: <IcCRedCircle height={ICON_DIM} width={ICON_DIM} />}
						</span>

						<span className={styles.doc_label}>{label}</span>
					</div>
				);
			})}
		</div>
	);
}
export default RequiredDocs;
