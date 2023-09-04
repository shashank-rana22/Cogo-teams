import { HEADER_DATA } from './constant';
import styles from './styles.module.css';

function CardHeader() {
	return (
		<div className={styles.container}>
			{HEADER_DATA.map((item) => (
				<div className={styles.item} key={item?.id}>
					{item?.label}
				</div>

			))}
		</div>
	);
}
export default CardHeader;
