// import { useRouter } from '@cogo/next';
import CardBody from './CardBody';
import CardHeader from './CardHeader';
import styles from './styles.module.css';

function Card({ data = {} }) {
	// const router = useRouter();
	// const navigateToShipment = () => {
	// 	router.push('/shipments/[id]', `/shipments/${data.id}`);
	// };

	return (
		<div className={styles.container}>
			<CardHeader data={data} />

			<CardBody data={data} />
		</div>
	);
}

export default Card;
