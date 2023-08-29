import { Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import ListInstances from './ListInstances';

function Instances({ item = {} }) {
	const { t } = useTranslation(['allocation']);

	return (
		<>
			<Modal.Header title={t('allocation:instances_label')} />

			<Modal.Body>
				<ListInstances item={item} />
			</Modal.Body>
		</>
	);
}

export default Instances;
