import { useTranslation } from 'next-i18next';

import { headerData } from './constant';
import styles from './styles.module.css';

const SPAN_LENGTH_DEFAULT = 1;
const HUNDRED_PERCENTAGE = 100;
const TOTAL_SPAN_LENGTH = 12;

function CardHeader() {
	const { t = () => {} } = useTranslation(['settlement']);
	return (
		<div className={styles.container}>
			{headerData({ t }).map((item) => (
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
