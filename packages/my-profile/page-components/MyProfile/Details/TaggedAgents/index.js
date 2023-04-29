import styles from './styles.module.css';

function TaggedAgent({ detailsData }) {
	const formatArrayValues = (items) => {
		const formattedItem = items?.map((item) => item?.name);
		return formattedItem.join(',  ') || '';
	};
	return (
		<div className={styles.card_container}>
			<div className={styles.header_text}>
				{`Tagged Sales Agents - ${
					(detailsData?.sales_agents || []).length
				}`}
			</div>
			<div className={styles.sub_container}>
				{(detailsData?.sales_agents || []).length > 0 ? (
					formatArrayValues(detailsData?.sales_agents)
				) : (
					<div className={styles.empty_text}>No tagged Agents</div>
				)}
			</div>
		</div>
	);
}

export default TaggedAgent;
