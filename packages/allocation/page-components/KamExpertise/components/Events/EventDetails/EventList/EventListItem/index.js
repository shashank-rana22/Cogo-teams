import { Pill, Modal, Button } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useDeleteEvent from '../../../../../hooks/useDeleteEvent';

import styles from './styles.module.css';

const COMPLETION_MAPPING = {
	completed   : 'Shipment Completion',
	in_progress : 'Shipment Creation',

};

function EventListItem({ data, index, setEventListData, listRefetch }) {
	const {
		condition_name: conditionName = '',
		expertise_type: expertiseType = '',
		description = '',
		rules = [],
		id = '',
	} = data || {};

	const { onDelete, showDeleteModal, setShowDeleteModal, deleteLoading } = useDeleteEvent({ id, listRefetch });

	return (
		<section className={styles.container}>
			<div className={styles.top_div}>
				#
				{index + 1}

				<div>
					<IcMEdit
						style={{ cursor: 'pointer' }}
						onClick={() => setEventListData({ data, toggleEvent: 'updateEvent' })}
					/>
					<IcMDelete
						style={{ marginLeft: '12px', cursor: 'pointer' }}
						onClick={() => setShowDeleteModal(true)}
					/>
				</div>

			</div>

			<div>
				<p className={styles.info_tag}>
					Expertise :
					{' '}
					<b className={styles.margin_left}>{startCase(expertiseType || '')}</b>
				</p>

				<p className={styles.info_tag}>
					Event Name :
					{' '}
					<b className={styles.margin_left}>{conditionName || ''}</b>
				</p>

				<p className={styles.info_tag}>
					Description :
					{' '}
					<i className={styles.margin_left}>{description || ''}</i>
				</p>
			</div>

			<div>
				<div className={styles.rule_head}>
					Rule
				</div>

				{rules.map((res, i) => {
					const { parameters = [] } = res || {};

					const startCaseArray = parameters?.map((parameter) => startCase(parameter)) || [];

					return (
						<div className={styles.rule_body} key={res.id}>
							<div className={styles.margin_right}>
								Rule #
								{i + 1}
							</div>
							<span className={styles.margin_right}>
								<Pill
									key="Reactivation"
									size="lg"
									color="blue"
								>
									{startCase(res.name || '')}
								</Pill>
							</span>

							<div className={styles.margin_right}>
								is triggered on
							</div>

							<span className={styles.margin_right}>
								<Pill
									key="Shipment_creation"
									size="lg"
									color="#FEF3E9"
								>
									{COMPLETION_MAPPING[data.event_state_on] || 'Event'}
								</Pill>
							</span>

							<span className={styles.margin_right}>
								having parameter
							</span>

							{' '}
							<span className={styles.margin_right}>
								<Pill
									key="Account"
									size="lg"
									color="#FEF3E9"
								>
									{startCaseArray.join(', ')}
								</Pill>
							</span>
						</div>
					);
				})}
			</div>

			{showDeleteModal && (
				<Modal
					size="sm"
					placement="top"
					show={showDeleteModal}
					showCloseIcon
					onClose={() => setShowDeleteModal(false)}
				>
					<Modal.Header title="Delete Event" />

					<Modal.Body>
						<p> Are you sure you want to delete this event?</p>
					</Modal.Body>

					<Modal.Footer>
						<Button onClick={() => onDelete()} loading={deleteLoading}>
							Yes
						</Button>
					</Modal.Footer>

				</Modal>
			)}

		</section>
	);
}

export default EventListItem;
