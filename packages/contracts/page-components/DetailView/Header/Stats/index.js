import Content from './Content';
import styles from './styles.module.css';

function Stats({ data }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>
					<div className={styles.contract_id}>
						#
						{data?.contract_reference_id}
					</div>
					<div className={styles.trade}>
						Export
					</div>
				</div>
				<div className={styles.details}>
					<div className={styles.pair}>
						<div>
							No. of Containers :
						</div>
						<div className={styles.value}>
							10 June  2022
						</div>
					</div>
					<div className={styles.pair}>
						<div>
							Request Date :
						</div>
						<div className={styles.value}>
							10 June  2022
						</div>
					</div>
					<div className={styles.pair}>
						<div>
							Validity :
						</div>
						<div className={styles.value}>
							10 June  2022
						</div>
					</div>
				</div>
			</div>
			<Content data={data} />
		</div>
	);
}
export default Stats;
