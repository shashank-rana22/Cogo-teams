import PieData from './PieData';
import styles from './styles.module.css';

function ShowMore({ dropdown, rowId }) {
	if (dropdown === rowId) {
		return (
			<div className={styles.dropdown_container_visible}>
				<div className={styles.data_container}>
					<div>
						<div>
							<div className={styles.heading}>Service Type</div>
							<div>----</div>
							<div className={styles.heading}>Cogo Entity</div>
							<div>----</div>
						</div>
					</div>

					<div>
						<div>
							<PieData />
						</div>
					</div>
				</div>
			</div>
		);
	}
	return <div className={styles.dropdown_container_invisible} />;
}

export default ShowMore;
