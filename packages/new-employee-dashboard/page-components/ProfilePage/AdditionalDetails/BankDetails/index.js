import { startCase } from '@cogoport/utils';

import PreviewDocumet from '../../../../common/PreviewDocumet';

import styles from './styles.module.css';

function BankDetails({ profileData }) {
	const { bank_details } = profileData || {};

	const MAPPING = ['bank_name', 'bank_branch_name', 'ifsc_code', 'account_holder_name', 'account_number'];

	return (
		<div className={styles.container}>
			<div className={styles.top_bar}>
				{
					(MAPPING || []).map((element) => (
						<div key={element}>
							<div className={styles.label}>
								{startCase(element)}
							</div>
							<div className={styles.value}>
								{bank_details?.[0]?.[element]}
							</div>
						</div>
					))
				}

			</div>

			<div className={styles.cancelled_cheque}>
				<div className={styles.label}>
					Cancelled Cheque
				</div>
				<PreviewDocumet document_url={bank_details?.[0]?.cancelled_check_url} />
			</div>

		</div>

	);
}

export default BankDetails;
