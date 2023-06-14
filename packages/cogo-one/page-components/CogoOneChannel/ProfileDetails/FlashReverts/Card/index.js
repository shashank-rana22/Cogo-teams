import CargoDetails from './CargoDetails';
import RouteDetails from './RouteDetails';
import styles from './styles.module.css';

function Card({ data = {} }) {
	return (
		(data.list || []).map((item) => (
			<div className={styles.container} key={item?.id}>
				<RouteDetails item={item} />
				<CargoDetails item={item} />
			</div>
		))
	);
}
export default Card;
