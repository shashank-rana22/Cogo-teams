import { Modal, Pagination, Placeholder } from '@cogoport/components';
import { IcCCogoCoin } from '@cogoport/icons-react';
import { format, startCase, isEmpty } from '@cogoport/utils';
import Image from 'next/image';

import { ACTIVITY_STATUS, NETWORK_EMPTY_STATE } from '../../../constants';
import useGetReferralTransactions from '../../../hooks/useGetReferralTransactions';

import styles from './styles.module.css';

const func = () => {};
function ActivityModal({
	activityModal = false, setActivityModal = func,
	userDate = {},

}) {
	const {
		transactionsData = {}, transactionsLoading = false,
		setPagination = () => {},
	} = useGetReferralTransactions({ userDate });
	const { list = [], page, total_count, page_limit } = transactionsData;
	const handleClose = () => {
		setActivityModal(false);
	};
	const emptyCheck = isEmpty(list);
	function LoadingState() {
		return (
			<>
				<div className={styles.activity_date}>
					<div className={styles.dot} />
					<div className={styles.durations}>
						<Placeholder height="12px" width="90px" margin="0px 0px 0px 5px" />
					</div>
				</div>
				<div className={styles.main_card}>
					<div
						className={styles.loading_card}
					/>
				</div>
			</>
		);
	}

	function EmptyState() {
		return (
			<div className={styles.empty_state}>
				<Image
					src={NETWORK_EMPTY_STATE}
					alt="empty-state"
					width={120}
					height={120}
				/>
			</div>
		);
	}

	function TransactionalList() {
		return (
			<>
				{(list || []).map((item) => {
					const {
						id = '',
						state = '', created_at = '', source = '', reward = 0, nominee_name = '',
					} = item || {};
					return (
						<div key={id}>
							<div className={styles.activity_date}>
								<div className={styles.dot} />
								<div className={styles.durations}>
									{format(created_at, 'hh:mm a,')}
									{format(created_at, ' MMM dd')}
								</div>
							</div>
							<div className={styles.main_card}>
								<div
									className={styles.card}
									style={{
										borderLeft: `2px solid
								 ${ACTIVITY_STATUS[state]}`,
									}}
								>
									<div className={styles.status_details}>
										<div className={styles.user_status}>
											{startCase(state)}
										</div>
										<div className={styles.user_source}>
											{startCase(source)}
										</div>
									</div>

									<div className={styles.details}>
										<div className={styles.cogopoints_container}>
											Reward :
											{' '}
											<IcCCogoCoin className={styles.coin_icon} />
											<div className={styles.number}>{reward}</div>
										</div>

										<div className={styles.name}>
											Nominee Name:
											{' '}
											{startCase(nominee_name)}
										</div>

									</div>
								</div>
							</div>
						</div>
					);
				})}
			</>
		);
	}

	const componentMapping = () => {
		if (transactionsLoading) {
			return (
				<>
					{[...Array(4)].map((itm) => (
						<LoadingState key={itm} />
					))}
				</>
			);
		}
		if (!emptyCheck) {
			return <TransactionalList />;
		}
		return <EmptyState />;
	};

	return (
		<Modal
			size="sm"
			show={activityModal}
			closeOnOuterClick={handleClose}
			onClose={handleClose}
			placement="right"
			className={styles.modal_container}
		>
			<Modal.Header title="Activity Logs" />

			<Modal.Body className={styles.modal_body}>
				{componentMapping()}
			</Modal.Body>
			{!emptyCheck && (
				<Modal.Footer>
					<Pagination
						type="number"
						disabled={transactionsLoading}
						className={styles.pagination_container}
						currentPage={page || 0}
						totalItems={total_count || 0}
						pageSize={page_limit || 10}
						onPageChange={setPagination}
					/>
				</Modal.Footer>
			)}

		</Modal>
	);
}

export default ActivityModal;
