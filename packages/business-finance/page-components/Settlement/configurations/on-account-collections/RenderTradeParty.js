import styles from './styles.module.css';

function RenderTradeParty({ option = {} }) {
	const {
		legal_business_name = '',
		registration_number = '',
		company_type = '',
	} = option || {};

	return (
		<div className={styles.tradeparty}>
			<div>{legal_business_name || ''}</div>
			<div>
				<span className={styles.label}>Reg.Number :</span>
				{registration_number || ''}
			</div>
			{company_type ? (
				<div>
					<span className={styles.label}>Company Type :</span>
					{company_type || ''}
				</div>
			) : null}
		</div>
	);
}
export default RenderTradeParty;
