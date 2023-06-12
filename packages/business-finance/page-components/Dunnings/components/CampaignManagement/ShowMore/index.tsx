import PieData from './PieData';
import styles from './styles.module.css';

function ShowMore({ dropdown, rowId }) {
	if (dropdown === rowId) {
		return (
			<div className={styles.dropdown_container_visible}>
				<div className={styles.data_container}>
					<div style={{ width: '20%' }}>
						<div>
							<div className={styles.heading}>Service Type</div>
							<div>XXXX</div>
							<div className={styles.heading}>Cogo Entity</div>
							<div>XXXX</div>
						</div>
					</div>

					<div style={{ width: '80%' }}>
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
