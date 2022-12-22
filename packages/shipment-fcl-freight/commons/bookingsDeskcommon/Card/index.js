// import { useRouter } from '@cogo/next';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import styles from './styles.module.css'

const Card = ({ data = {} }) => {
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
};

export default Card;