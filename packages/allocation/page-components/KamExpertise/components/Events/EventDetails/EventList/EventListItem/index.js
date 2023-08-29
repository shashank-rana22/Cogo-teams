import { Pill, Modal, Button } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import useDeleteEvent from '../../../../../hooks/useDeleteEvent';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

const getCompletionMapping = ({ t = () => {} }) => ({
	completed   : t('allocation:shipment_completion_label'),
	in_progress : t('allocation:shipment_creation_label'),
});

function EventListItem({
	data,
	index,
	setEventListData,
	listRefetch,
}) {
	const { t } = useTranslation(['allocation']);

	const completionMapping = getCompletionMapping({ t });

	const {
		condition_name: conditionName = '',
		expertise_type: expertiseType = '',
		description = '',
		rules = [],
		id = '',
	} = data || {};

	const { onDelete, showDeleteModal, setShowDeleteModal, deleteLoading } = useDeleteEvent({ id, listRefetch, t });

	return (
		<section className={styles.container}>
			<div className={styles.top_div}>
				#
				{index + FIRST_INDEX}

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
					{t('allocation:expertise_header')}
					{' '}
					:
					{' '}
					<b className={styles.margin_left}>{startCase(expertiseType || '')}</b>
				</p>

				<p className={styles.info_tag}>
					{t('allocation:event_name_label')}
					{' '}
					:
					{' '}
					<b className={styles.margin_left}>{conditionName || ''}</b>
				</p>

				<p className={styles.info_tag}>
					{t('allocation:description_label')}
					{' '}
					:
					{' '}
					<i className={styles.margin_left}>{description || ''}</i>
				</p>
			</div>

			<div>
				<div className={styles.rule_head}>
					{t('allocation:rule_label')}
				</div>

				{rules.map((res, i) => {
					const { parameters = [] } = res || {};

					const startCaseArray = parameters?.map((parameter) => startCase(parameter)) || [];

					return (
						<div className={styles.rule_body} key={res.id}>
							<div className={styles.margin_right}>
								{t('allocation:rule_label')}
								{' '}
								#
								{i + FIRST_INDEX}
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
								{t('allocation:is_triggered_on')}
							</div>

							<span className={styles.margin_right}>
								<Pill
									key="Shipment_creation"
									size="lg"
									color="#FEF3E9"
								>
									{completionMapping[data.event_state_on] || t('allocation:event_label')}
								</Pill>
							</span>

							<span className={styles.margin_right}>
								{t('allocation:having_parameter')}
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
					<Modal.Header title={t('allocation:delete_event_heading')} />

					<Modal.Body>
						<p>
							{' '}
							{t('allocation:confirmation_text_to_delete_event')}
						</p>
					</Modal.Body>

					<Modal.Footer>
						<Button onClick={() => onDelete()} loading={deleteLoading}>
							{t('allocation:yes_label')}
						</Button>
					</Modal.Footer>

				</Modal>
			)}

		</section>
	);
}

export default EventListItem;
