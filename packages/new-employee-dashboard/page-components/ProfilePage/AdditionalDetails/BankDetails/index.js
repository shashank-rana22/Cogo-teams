import { isEmpty, startCase } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import CommonLoader from '../../../../common/Loader';
import PreviewDocumet from '../../../../common/PreviewDocumet';

import styles from './styles.module.css';

const MAPPING = ['bank_name', 'bank_branch_name', 'ifsc_code', 'account_holder_name', 'account_number'];

function BankDetails({ profileData, getEmployeeDetailsLoading }) {
	const { bank_details } = profileData || {};

	if (getEmployeeDetailsLoading) {
		return <CommonLoader />;
	}

	if (isEmpty(bank_details)) {
		return <EmptyState emptyText="Bank details not found" />;
	}

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
				<PreviewDocumet document_url={bank_details?.[0]?.cancelled_check_url} preview />
			</div>

		</div>

	);
}

export default BankDetails;
