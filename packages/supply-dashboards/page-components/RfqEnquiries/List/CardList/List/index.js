import { Placeholder } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function List({
	fields, item, loading,
}) {
	const { push } = useRouter();
	return (
		<div className={styles.container}>
			{fields.map((field) => {
				const { label, flex, key } = field;
				return (
					<div
						role="presentation"
						onClick={() => push(
							'/supply/dashboards/rfq-enquiries/[id]',
							`/supply/dashboards/rfq-enquiries/${item?.id}`,
						)}
						className={styles.item}
						key={key || label}
						style={{ flex }}
					>
						{loading ? <Placeholder /> : field.render(item) }
					</div>
				);
			})}
		</div>
	);
}
export default List;
