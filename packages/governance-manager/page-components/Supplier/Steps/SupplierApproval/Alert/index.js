import styles from './styles.module.css';

function Alert({ t }) {
	return (
		<div className={styles.parent}>
			<div className={styles.header}> Alert</div>
			<div className={styles.list_items}>
				<ul className={styles.list}>
					<li>
						{t('supplier_page_contract_sla_alert_list_item1_label')}
					</li>
					<li>
						{t('supplier_page_contract_sla_alert_list_item2_label')}
					</li>
				</ul>

			</div>
		</div>
	);
}
export default Alert;
