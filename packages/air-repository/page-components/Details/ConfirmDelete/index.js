import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useHandleRepository from '../../../hooks/useHandleRepository';

import styles from './styles.module.css';

function ConfirmDelete({ item = {}, listRepository = () => {} }) {
	const { t } = useTranslation(['airRepository']);
	const { handleRepository, loading } = useHandleRepository(true);

	const handleDelete = () => {
		const payload = { id: item?.id, action_name: 'delete' };
		handleRepository({ payload, listRepository });
	};

	return (
		<div className={styles.confirm_delete_container}>
			<div>
				{t('airRepository:delete_confirm_text')}
			</div>
			<div className={styles.confirm_delete_buttons}>
				<Button size="sm" disabled={loading} onClick={handleDelete}>
					{t('airRepository:confirm_button')}
				</Button>
			</div>
		</div>
	);
}

export default ConfirmDelete;
