import styles from './styles.module.css';

function Remarks({ itemData }) {
	const { remark } = itemData || {};
	// const { remark } = data || {};
	return (
		<div className={styles.container}>
			{remark}
		</div>
	);
}
export default Remarks;
