import Card from './Card';
import ListProfit from './ListProfit';
import styles from './styles.module.css';

function PLStatement() {
	return (
		<div>
			<Card />
			<ListProfit />
			<div className={styles.amount}>All amounts are in INR*</div>
		</div>
	);
}
export default PLStatement;
