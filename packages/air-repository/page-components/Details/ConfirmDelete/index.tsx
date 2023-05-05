import { Button } from '@cogoport/components';

import useHandleRepository from '../../../hooks/useHandleRepository';

import styles from './styles.module.css';

interface NestedObj {
	[key: string]: string;
}
interface Props {
	item:NestedObj;
	listRepository: React.FC;

}

function ConfirmDelete({ item, listRepository }:Props) {
	const { handleRepository, loading } = useHandleRepository(true);

	const handleDelete = () => {
		const payload = { id: item?.id, action_name: 'delete' };
		handleRepository(payload, listRepository);
	};

	return (
		<div className={styles.confirm_delete_container}>
			<div>Are you sure to delete this Repository?</div>
			<div className={styles.confirm_delete_buttons}>
				<Button size="sm" disabled={loading} onClick={() => handleDelete()}>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default ConfirmDelete;
