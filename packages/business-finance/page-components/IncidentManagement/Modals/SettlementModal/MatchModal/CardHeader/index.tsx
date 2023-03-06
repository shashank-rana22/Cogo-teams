import { HeaderData } from './constant';
import styles from './styles.module.css';

function CardHeader() {
	return (
		<div className={styles.container}>
			{HeaderData.map((item) => (
				<div className={styles.item}>
					{item?.label}
				</div>

			))}
		</div>
	);
}
export default CardHeader;
