import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header}>

			<div className={styles.profile}>

				<div className={styles.circle}>
					<div>RT</div>
				</div>
			</div>
			<div className={styles.organization}>

				<div>
					<div className={styles.title}>Organization Name :  Rishu Tiles</div>
					<div className={styles.sub_title}> Enrichment Request Date: 23 Sept 2023</div>
					<div className={styles.pan}>PAN: DESPR00322H</div>
				</div>

			</div>
			<div className={styles.address}>
				<div style={{ marginRight: '20px' }}> Address: </div>

				<div>

					Lörem ipsum kavis begon korsspråkande av renoren grindsamhälle
					inaskad usm ifall on vupömubelt. Supragyn lunar. Ludål nixa renat panpatologi.
					Ditäktig nätpoker lans ninyl

				</div>

			</div>
		</div>
	);
}

export default Header;
