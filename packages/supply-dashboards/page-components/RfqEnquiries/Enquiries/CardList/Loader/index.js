import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function Card() {
	return (
		<div
			className={styles.active_card}
		>
			<Header />
			<div className={styles.line} />
			<Body />
			<div className={styles.line} />
			<Footer />
		</div>
	);
}
export default Card;
