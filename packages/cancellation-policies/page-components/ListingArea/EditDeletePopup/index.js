import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import styles from './styles.module.css';

function EditDeletePopup({ item = {}, refetch = () => {}, setVisible = () => {} }) {
	return (
		<div className={styles.container}>

			<EditModal
				item={item}
				refetch={refetch}
				setVisible={setVisible}

			/>
			<DeleteModal
				item={item}
				refetch={refetch}
				setVisible={setVisible}

			/>

		</div>
	);
}

export default EditDeletePopup;
