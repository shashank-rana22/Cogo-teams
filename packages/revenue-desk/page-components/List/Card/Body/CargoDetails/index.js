import CargoDetailPills from './CargoDetailPills';
import styles from './styles.module.css';

function CargoDetails({ data }) {
	return (
		<div className={styles.cargo_detail}>
			<CargoDetailPills detail={data} />
		</div>
	);
}

export default CargoDetails;
