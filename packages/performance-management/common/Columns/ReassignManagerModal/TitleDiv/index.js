function TitleDiv({ item, styles }) {
	return (
		<>
			<div className={styles.user}>
				{item.name}
			</div>
			<div className={styles.manager}>
				Currently Under :
				{' '}
				<span className={styles.manager_name}>{item.manager_name}</span>
			</div>
		</>
	);
}
export default TitleDiv;
