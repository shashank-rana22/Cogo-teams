import Body from './Body';
import Footer from './Footer';
import styles from './styles.module.css';

function SingleServiceCard({ serviceData = {}, price, shipmentData, walletAmount = {} }) {
	return (
		<div className={styles.card_container}>
			<div>
				<Body data={serviceData} price={price} shipmentData={shipmentData} />
			</div>
			<div>
				<Footer data={serviceData} walletAmount={walletAmount} />
			</div>
		</div>
	);
}

export default SingleServiceCard;
