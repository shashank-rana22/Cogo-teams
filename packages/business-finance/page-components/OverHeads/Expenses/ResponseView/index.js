/* eslint-disable max-len */
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import useUpdateBillStatus from '../hooks/useUpdateBillStatus';
import useUpdateConfiguration from '../hooks/useUpdateConfiguration';

import styles from './styles.module.css';

function ResponseView() {
	const {
		profile,
	} = useSelector((state:any) => state);
	const userId = profile?.user?.id;

	const { query } = useRouter();
	const { type, action, id } = query || {};
	const {
		updateNonRecurringStatus,
		nonRecurringLoading, nonRecurringResponse,
	} = useUpdateBillStatus({ id, userId, action });

	const {
		updateRecurringStatus,
		recurringLoading, recurringResponse,
	} = useUpdateConfiguration({ id, userId, action });

	useEffect(() => {
		if (type === 'expense') {
			updateNonRecurringStatus();
		} else {
			updateRecurringStatus();
		}
	}, [type, updateNonRecurringStatus, updateRecurringStatus]);

	const status = (action === 'FINANCE_ACCEPTED' || action === 'ACCEPTED') ? 'Approved' : 'Rejected';

	return (
		<div>
			<div className={styles.container}>
				{(!type || !action || !id) ? <h1>Nothing to show</h1> : (
					<div>
						{nonRecurringLoading || recurringLoading ? (
							<div>
								<div>
									<img
										style={{ height: '200px' }}
										alt="loading"
										src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/loading-cargo-insurance.svg"
									/>
								</div>
							</div>
						) : (
							<div>
								{type === 'expense' && nonRecurringResponse?.id && (
									<div className={styles.body_container}>
										<h1>
											Expense is
											{' '}
											<span className={styles.approve_reject}>
												{status}
												.
											</span>
										</h1>
										<div>
											{status === 'Approved' ? (
												<div>
													<img
														src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/reject-animation.gif"
														alt="approved"
														className={styles.gif_icons}
													/>

												</div>
											) : (
												<div>
													<img
														src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Rejected.gif"
														alt="rejected"
														className={styles.gif_icons}
													/>

												</div>
											)}
										</div>
									</div>
								)}
								{type === 'expense' && !nonRecurringResponse?.id && (
									<div className={styles.body_container}>
										<h1 className={styles.failed}>
											The Expense could not be updated !
										</h1>
										<div>
											<img
												src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Rejected.gif"
												alt="failed"
												className={styles.gif_icons}
											/>
										</div>
									</div>
								)}
								{type === 'configuration' && recurringResponse?.data && (
									<div className={styles.body_container}>
										<h1>
											Recurring record is
											{' '}
											<span className={styles.approve_reject}>
												{status}
												.
											</span>
										</h1>
										<div>
											{status === 'Approved' ? (
												<div>
													<img
														src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/reject-animation.gif"
														alt="approved"
														className={styles.gif_icons}
													/>

												</div>
											) : (
												<div>
													<img
														src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Rejected.gif"
														alt="rejected"
														className={styles.gif_icons}
													/>

												</div>
											)}
										</div>
									</div>

								)}
								{type === 'configuration' && !recurringResponse?.data && (
									<div className={styles.body_container}>
										<h1 className={styles.failed}>
											The Record could not be updated !
										</h1>
										<div>
											<img
												src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Rejected.gif"
												alt="failed"
												className={styles.gif_icons}
											/>
										</div>
									</div>
								)}
							</div>
						)}

					</div>
				)}

			</div>
		</div>
	);
}

export default ResponseView;
