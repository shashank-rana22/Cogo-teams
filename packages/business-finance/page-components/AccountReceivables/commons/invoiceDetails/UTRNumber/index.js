import styles from './styles.module.css';

function UtrNumber({ eventData }) {
	const { knockOffData } = eventData || {};

	if (knockOffData === undefined) {
		return <div>UTR Does Not Exist</div>;
	}

	return (knockOffData || []).map((item) => {
		const { data } = item || [];
		const { paymentInfoRec } = data || [];

		return (paymentInfoRec || []).map((dataItem) => (
			<div className={styles.container}>
				<div className={styles.sub_container}>
					{dataItem.sourceType}
					{' '}
					<span style={{ fontWeight: 600 }}>{dataItem.documentNumber}</span>
					{' '}
				</div>
			</div>
		));
	});
}
export default UtrNumber;
