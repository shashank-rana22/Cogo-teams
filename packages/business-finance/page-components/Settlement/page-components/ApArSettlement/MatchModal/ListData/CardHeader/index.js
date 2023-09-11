import { HEADER_DATA } from './constant';
import styles from './styles.module.css';

const SPAN_LENGTH_DEFAULT = 1;
const HUNDRED_PERCENTAGE = 100;
const TOTAL_SPAN_LENGTH = 12;

function CardHeader() {
	return (
		<div className={styles.container}>
			{(HEADER_DATA || []).map((item) => (
				<div
					className={styles.item}
					style={{
						width: `${((item.span || SPAN_LENGTH_DEFAULT) * (HUNDRED_PERCENTAGE / TOTAL_SPAN_LENGTH))}%`,
					}}
					key={item?.id}
				>
					{item?.label}
				</div>

			))}
		</div>
	);
}
export default CardHeader;
