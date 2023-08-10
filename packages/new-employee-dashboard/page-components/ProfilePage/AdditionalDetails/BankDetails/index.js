import { Button } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import CommonLoader from '../../../../common/Loader';
import PreviewDocumet from '../../../../common/PreviewDocumet';

import styles from './styles.module.css';
import useUpdateBankDetails from './useUpdateBankDetails';

const BANK_DETAILS_INDEX = 0;

const MAPPING = ['bank_name', 'bank_branch_name', 'ifsc_code', 'account_holder_name', 'account_number'];

function BankDetails({ profileData, getEmployeeDetailsLoading, getEmployeeDetails }) {
	const { bank_details } = profileData || {};

	const { id, status } = bank_details?.[BANK_DETAILS_INDEX] || {};

	const { updateBankDetails } = useUpdateBankDetails({ id, getEmployeeDetails });

	if (getEmployeeDetailsLoading) {
		return <CommonLoader />;
	}

	if (isEmpty(bank_details)) {
		return <EmptyState emptyText="Bank details not found" />;
	}

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.top_bar}>
					{(MAPPING || []).map((element) => (
						<div key={element}>
							<div className={styles.label}>
								{startCase(element)}
							</div>
							<div className={styles.value}>
								{bank_details?.[BANK_DETAILS_INDEX]?.[element]}
							</div>
						</div>
					))}
				</div>

				<div className={styles.cancelled_cheque}>
					<div className={styles.label}>
						Cancelled Cheque
					</div>
					<PreviewDocumet document_url={bank_details?.[BANK_DETAILS_INDEX]?.cancelled_check_url} preview />
				</div>
			</div>

			{status === 'active'
				? (
					<div className={styles.button_container}>
						<div style={{ paddingRight: 16 }}>
							<Button
								size="md"
								themeType="secondary"
								onClick={() => updateBankDetails({ status: 'rejected' })}
							>
								Reject
							</Button>
						</div>

						<Button
							size="md"
							themeType="primary"
							onClick={() => updateBankDetails({ status: 'approved' })}
						>
							Approve
						</Button>
					</div>
				) : null}
		</div>
	);
}

export default BankDetails;
