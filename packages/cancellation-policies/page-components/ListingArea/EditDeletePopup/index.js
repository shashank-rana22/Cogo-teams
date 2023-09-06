import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import styles from './styles.module.css';

function EditDeletePopup({ id = '' }) {
	return (
		<div className={styles.container}>

			<EditModal
				id={id}
			/>
			<DeleteModal />

		</div>
	);
}

export default EditDeletePopup;
