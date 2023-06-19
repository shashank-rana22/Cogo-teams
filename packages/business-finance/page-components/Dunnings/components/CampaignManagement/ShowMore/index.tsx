import PieData from './PieData';
import styles from './styles.module.css';

interface Props {
	dropdown?:string,
	rowId?:string,
}

function ShowMore({ dropdown, rowId }:Props) {
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
