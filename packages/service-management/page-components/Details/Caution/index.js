import styles from './styles.module.css';

function Caution() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Caution</div>
			<ul>
				<li>
					LSP is buying on the same trade lanes where they have requested to Sell
				</li>
				<li>
					A minimum cooling period of 7 Days to be set if you are approving
				</li>
				<li>Your approvals audit will be sent to the CEO for visibility</li>
			</ul>
		</div>
	);
}

export default Caution;
