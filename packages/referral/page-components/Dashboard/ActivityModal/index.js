import { Modal, Pagination } from '@cogoport/components';
import { IcCCogoCoin } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import { ACTIVITY_STATUS } from '../../../constants';

import styles from './styles.module.css';

function ActivityModal({
	activityModal = false, setActivityModal = () => {},
}) {
	const handleClose = () => {
		setActivityModal(false);
	};

	const list = [
		{
			id             : '95f836aa-0d0b-4dea-9d4c-30cf6952d852',
			nominee_id     : 'a55eff34-33e1-47e0-a3b2-de150166492b',
			beneficiary_id : '9ccaf8d8-4a62-4bf7-a27b-e8ca6b611ab5',
			source         : 'kyc_verified',
			source_id      : '6ebe30cb-6961-4b88-a055-27ae6a9ddc04',
			reward_type    : 'cogopoint',
			reward_id      : '35383a5d-fdb5-40d0-8d5f-97bd95c2ef59',
			status         : 'active',
			level          : null,
			reward         : 20000.0,
			reward_details : null,
			nominee_type   : 'user',
			state          : 'provisional',
			created_at     : '2023-05-15T15:26:07.772Z',
			updated_at     : '2023-05-15T15:26:07.772Z',
			rewarded_at    : null,
		},
		{
			id             : '95f836aa-0d0b-4dea-9d4c-30cf6952d852',
			nominee_id     : 'a55eff34-33e1-47e0-a3b2-de150166492b',
			beneficiary_id : '9ccaf8d8-4a62-4bf7-a27b-e8ca6b611ab5',
			source         : 'kyc_verified',
			source_id      : '6ebe30cb-6961-4b88-a055-27ae6a9ddc04',
			reward_type    : 'cogopoint',
			reward_id      : '35383a5d-fdb5-40d0-8d5f-97bd95c2ef59',
			status         : 'inactive',
			level          : null,
			reward         : 20000.0,
			reward_details : null,
			nominee_type   : 'user',
			state          : 'rewarded',
			created_at     : '2023-05-15T15:26:07.772Z',
			updated_at     : '2023-05-15T15:26:07.772Z',
			rewarded_at    : null,
		},
		{
			id             : '95f836aa-0d0b-4dea-9d4c-30cf6952d852',
			nominee_id     : 'a55eff34-33e1-47e0-a3b2-de150166492b',
			beneficiary_id : '9ccaf8d8-4a62-4bf7-a27b-e8ca6b611ab5',
			source         : 'kyc_verified',
			source_id      : '6ebe30cb-6961-4b88-a055-27ae6a9ddc04',
			reward_type    : 'cogopoint',
			reward_id      : '35383a5d-fdb5-40d0-8d5f-97bd95c2ef59',
			status         : 'active',
			level          : null,
			reward         : 20000.0,
			reward_details : null,
			nominee_type   : 'user',
			state          : 'rewarded',
			created_at     : '2023-05-15T15:26:07.772Z',
			updated_at     : '2023-05-15T15:26:07.772Z',
			rewarded_at    : null,
		},
		{
			id             : '95f836aa-0d0b-4dea-9d4c-30cf6952d852',
			nominee_id     : 'a55eff34-33e1-47e0-a3b2-de150166492b',
			beneficiary_id : '9ccaf8d8-4a62-4bf7-a27b-e8ca6b611ab5',
			source         : 'kyc_verified',
			source_id      : '6ebe30cb-6961-4b88-a055-27ae6a9ddc04',
			reward_type    : 'cogopoint',
			reward_id      : '35383a5d-fdb5-40d0-8d5f-97bd95c2ef59',
			status         : 'inactive',
			level          : null,
			reward         : 20000.0,
			reward_details : null,
			nominee_type   : 'user',
			state          : 'provisional',
			created_at     : '2023-05-15T15:26:07.772Z',
			updated_at     : '2023-05-15T15:26:07.772Z',
			rewarded_at    : null,
		},
		{
			id             : '95f836aa-0d0b-4dea-9d4c-30cf6952d852',
			nominee_id     : 'a55eff34-33e1-47e0-a3b2-de150166492b',
			beneficiary_id : '9ccaf8d8-4a62-4bf7-a27b-e8ca6b611ab5',
			source         : 'kyc_verified',
			source_id      : '6ebe30cb-6961-4b88-a055-27ae6a9ddc04',
			reward_type    : 'cogopoint',
			reward_id      : '35383a5d-fdb5-40d0-8d5f-97bd95c2ef59',
			status         : 'inactive',
			level          : null,
			reward         : 20000.0,
			reward_details : null,
			nominee_type   : 'user',
			state          : 'rewarded',
			created_at     : '2023-05-15T15:26:07.772Z',
			updated_at     : '2023-05-15T15:26:07.772Z',
			rewarded_at    : null,
		},
		{
			id             : '95f836aa-0d0b-4dea-9d4c-30cf6952d852',
			nominee_id     : 'a55eff34-33e1-47e0-a3b2-de150166492b',
			beneficiary_id : '9ccaf8d8-4a62-4bf7-a27b-e8ca6b611ab5',
			source         : 'kyc_verified',
			source_id      : '6ebe30cb-6961-4b88-a055-27ae6a9ddc04',
			reward_type    : 'cogopoint',
			reward_id      : '35383a5d-fdb5-40d0-8d5f-97bd95c2ef59',
			status         : 'active',
			level          : null,
			reward         : 20000.0,
			reward_details : null,
			nominee_type   : 'user',
			state          : 'rewarded',
			created_at     : '2023-05-15T15:26:07.772Z',
			updated_at     : '2023-05-15T15:26:07.772Z',
			rewarded_at    : null,
		},
		{
			id             : '95f836aa-0d0b-4dea-9d4c-30cf6952d852',
			nominee_id     : 'a55eff34-33e1-47e0-a3b2-de150166492b',
			beneficiary_id : '9ccaf8d8-4a62-4bf7-a27b-e8ca6b611ab5',
			source         : 'kyc_verified',
			source_id      : '6ebe30cb-6961-4b88-a055-27ae6a9ddc04',
			reward_type    : 'cogopoint',
			reward_id      : '35383a5d-fdb5-40d0-8d5f-97bd95c2ef59',
			status         : 'active',
			level          : null,
			reward         : 20000.0,
			reward_details : null,
			nominee_type   : 'user',
			state          : 'rewarded',
			created_at     : '2023-05-15T15:26:07.772Z',
			updated_at     : '2023-05-15T15:26:07.772Z',
			rewarded_at    : null,
		},
		{
			id             : '95f836aa-0d0b-4dea-9d4c-30cf6952d852',
			nominee_id     : 'a55eff34-33e1-47e0-a3b2-de150166492b',
			beneficiary_id : '9ccaf8d8-4a62-4bf7-a27b-e8ca6b611ab5',
			source         : 'kyc_verified',
			source_id      : '6ebe30cb-6961-4b88-a055-27ae6a9ddc04',
			reward_type    : 'cogopoint',
			reward_id      : '35383a5d-fdb5-40d0-8d5f-97bd95c2ef59',
			status         : 'inactive',
			level          : null,
			reward         : 20000.0,
			reward_details : null,
			nominee_type   : 'user',
			state          : 'rewarded',
			created_at     : '2023-05-15T15:26:07.772Z',
			updated_at     : '2023-05-15T15:26:07.772Z',
			rewarded_at    : null,
		},
		{
			id             : '95f836aa-0d0b-4dea-9d4c-30cf6952d852',
			nominee_id     : 'a55eff34-33e1-47e0-a3b2-de150166492b',
			beneficiary_id : '9ccaf8d8-4a62-4bf7-a27b-e8ca6b611ab5',
			source         : 'kyc_verified',
			source_id      : '6ebe30cb-6961-4b88-a055-27ae6a9ddc04',
			reward_type    : 'cogopoint',
			reward_id      : '35383a5d-fdb5-40d0-8d5f-97bd95c2ef59',
			status         : 'inactive',
			level          : null,
			reward         : 20000.0,
			reward_details : null,
			nominee_type   : 'user',
			state          : 'rewarded',
			created_at     : '2023-05-15T15:26:07.772Z',
			updated_at     : '2023-05-15T15:26:07.772Z',
			rewarded_at    : null,

		},
		{
			id             : '95f836aa-0d0b-4dea-9d4c-30cf6952d852',
			nominee_id     : 'a55eff34-33e1-47e0-a3b2-de150166492b',
			beneficiary_id : '9ccaf8d8-4a62-4bf7-a27b-e8ca6b611ab5',
			source         : 'kyc_verified',
			source_id      : '6ebe30cb-6961-4b88-a055-27ae6a9ddc04',
			reward_type    : 'cogopoint',
			reward_id      : '35383a5d-fdb5-40d0-8d5f-97bd95c2ef59',
			status         : 'active',
			level          : null,
			reward         : 20000.0,
			reward_details : null,
			nominee_type   : 'user',
			state          : 'rewarded',
			created_at     : '2023-05-15T15:26:07.772Z',
			updated_at     : '2023-05-15T15:26:07.772Z',
			rewarded_at    : null,
		},
		{
			id             : '95f836aa-0d0b-4dea-9d4c-30cf6952d852',
			nominee_id     : 'a55eff34-33e1-47e0-a3b2-de150166492b',
			beneficiary_id : '9ccaf8d8-4a62-4bf7-a27b-e8ca6b611ab5',
			source         : 'kyc_verified',
			source_id      : '6ebe30cb-6961-4b88-a055-27ae6a9ddc04',
			reward_type    : 'cogopoint',
			reward_id      : '35383a5d-fdb5-40d0-8d5f-97bd95c2ef59',
			status         : 'inactive',
			level          : null,
			reward         : 20000.0,
			reward_details : null,
			nominee_type   : 'user',
			state          : 'rewarded',
			created_at     : '2023-05-15T15:26:07.772Z',
			updated_at     : '2023-05-15T15:26:07.772Z',
			rewarded_at    : null,
		},
		{
			id             : '95f836aa-0d0b-4dea-9d4c-30cf6952d852',
			nominee_id     : 'a55eff34-33e1-47e0-a3b2-de150166492b',
			beneficiary_id : '9ccaf8d8-4a62-4bf7-a27b-e8ca6b611ab5',
			source         : 'kyc_verified',
			source_id      : '6ebe30cb-6961-4b88-a055-27ae6a9ddc04',
			reward_type    : 'cogopoint',
			reward_id      : '35383a5d-fdb5-40d0-8d5f-97bd95c2ef59',
			status         : 'active',
			level          : null,
			reward         : 20000.0,
			reward_details : null,
			nominee_type   : 'user',
			state          : 'rewarded',
			created_at     : '2023-05-15T15:26:07.772Z',
			updated_at     : '2023-05-15T15:26:07.772Z',
			rewarded_at    : null,
		},
	];
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
			<Modal.Body>
				{(list || []).map((item) => {
					const { state = '', created_at = '', source = '', reward = 0 } = item || {};
					return (
						<>
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
											Nominee Name: Niraj
										</div>

									</div>
								</div>
							</div>
						</>
					);
				})}

			</Modal.Body>
			<Modal.Footer>
				<Pagination
					type="number"
					// className={styles.pagination_container}
					// currentPage={page || 0}
					// totalItems={total_count || 0}
					// pageSize={page_limit || 10}
					// onPageChange={setListPagination}
				/>
			</Modal.Footer>
		</Modal>
	);
}

export default ActivityModal;
