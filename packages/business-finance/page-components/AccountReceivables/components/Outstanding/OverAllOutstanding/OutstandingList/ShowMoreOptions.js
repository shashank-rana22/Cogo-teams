import { Button } from '@cogoport/components';

import useUpdateLegalDocuments from '../../../../hooks/useUpdateLegalDocuments';

import styles from './styles.module.css';

function ShowMoreOptions({ item = {}, setChangeStatus = () => {} }) {
	const { registrationNumber = '' } = item || {};
	const { updateLegalDocuments = () => {} } = useUpdateLegalDocuments();

	return (
		<div className={styles.more_options}>
			<Button
				size="sm"
				className={styles.btn_margin}
				onClick={() => setChangeStatus(true)}
			>
				Change Status
			</Button>

			<Button
				size="sm"
				onClick={() => updateLegalDocuments(registrationNumber)}
			>
				Save Legal Documents
			</Button>
		</div>
	);
}

export default ShowMoreOptions;
