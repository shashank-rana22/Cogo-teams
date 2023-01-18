import { Placeholder } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function List({
	fields, item, loading, headerRequired, setSelectedRate, selectedRate, status,
}) {
	const { push } = useRouter();
	const handleOnClick = () => {
		if (headerRequired) {
			push(
				'/supply/dashboards/rfq-enquiries/[id]',
				`/supply/dashboards/rfq-enquiries/${item?.id}`,
			);
		}
	};
	return (
		<div className={styles.container}>
			{fields.map((field) => {
				const { label, flex, key } = field;
				return (
					<div
						role="presentation"
						onClick={() => {
							if (status === 'awaiting_responses') { handleOnClick(); }
						}}
						className={headerRequired ? styles.item : styles.smallItem}
						key={key || label}
						style={{ flex }}
					>
						{loading ? (
							<div className={styles.placeholder}>
								{' '}
								<Placeholder />
							</div>
						)
							: field.render(item, setSelectedRate, selectedRate) }
					</div>

				);
			})}
			{!headerRequired && <div className={styles.line} />}
		</div>

	);
}
export default List;
