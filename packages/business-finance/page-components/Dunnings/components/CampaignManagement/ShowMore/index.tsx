import PieData from './PieData';
import styles from './styles.module.css';

interface Props {
	dropdown?: string;
	rowId?: string;
	data?: object[];
}

function ShowMore({ dropdown, rowId, data = null }:Props) {
	if (dropdown === rowId) {
		return (
			<div className={styles.dropdown_container_visible}>
				{data ? (
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
				)
					: (
						<div className={styles.empty_container}>
							<div>
								<h1 className={styles.no_data_text}>
									No data to show
								</h1>

							</div>
						</div>
					)}
			</div>
		);
	}
	return <div className={styles.dropdown_container_invisible} />;
}

export default ShowMore;
