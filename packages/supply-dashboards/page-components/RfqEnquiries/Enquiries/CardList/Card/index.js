import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function Card({ item, selectedCard, setSelectedCard, revertCounts }) {
	return (
		<div
			role="presentation"
			onClick={() => setSelectedCard(item)}
			className={item?.id === selectedCard?.id ? styles.active_card : styles.inactive_card}
		>
			<Header item={item} />
			<div className={styles.line} />
			<Body item={item?.detail} />
			<div className={styles.line} />
			<Footer item={item} revertCounts={revertCounts} />
		</div>
	);
}
export default Card;
