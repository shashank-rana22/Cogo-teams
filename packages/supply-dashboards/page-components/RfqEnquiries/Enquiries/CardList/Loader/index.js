import Body from './Body';
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
		</div>
	);
}
export default Card;
