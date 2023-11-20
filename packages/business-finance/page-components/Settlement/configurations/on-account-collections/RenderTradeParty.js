import styles from './styles.module.css';

function RenderTradeParty({
	option = {
		legal_business_name : '',
		registration_number : '',
		company_type        : '',
	},
}) {
	return (
		<div className={styles.tradeparty}>
			<div>{option?.legal_business_name || ''}</div>
			<div>
				<span className={styles.label}>Reg.Number :</span>
				{option?.registration_number || ''}
			</div>
			{option?.company_type ? (
				<div>
					<span className={styles.label}>Company Type :</span>
					{option?.company_type || ''}
				</div>
			) : null}
		</div>
	);
}
export default RenderTradeParty;
