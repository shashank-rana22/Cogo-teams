import Header from '../../List/Card/Header';

import Body from './Body';
import Footer from './Footer';
import styles from './styles.module.css';

function Card({ serviceData = {} }) {
	return (
		<div className={styles.card_container}>
			<div>
				<Header data={serviceData} />
			</div>
			<div>
				<Body data={serviceData} />
			</div>
			<div>
				<Footer data={serviceData} />
			</div>
		</div>
	);
}

export default Card;
