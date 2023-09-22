import styles from '../styles.module.css';

function RemarkRender({ invoice = {} }) {
	return (
		<div className={styles.remarkcontainer}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{invoice?.remarks}</div>
		</div>
	);
}

export default RemarkRender;
