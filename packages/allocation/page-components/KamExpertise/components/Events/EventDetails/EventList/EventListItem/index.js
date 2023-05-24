import { Pill } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const COMPLETION_MAPPING = {
	completed   : 'Shipment Completion',
	in_progress : 'Shipment Creation',

};

function EventListItem({ data, index, setEventListData }) {
	const {
		condition_name: conditionName = '',
		expertise_type: expertiseType = '',
		description = '',
		rules = [],
	} = data || {};

	return (
		<section className={styles.container}>
			<div className={styles.top_div}>
				#
				{index + 1}

				<IcMEdit
					style={{ cursor: 'pointer' }}
					onClick={() => setEventListData({ data, toggleEvent: 'updateEvent' })}
				/>
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

				{rules.map((res, i) => (
					<div className={styles.rule_body}>
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
								{startCase(res.parameters || '')}
							</Pill>
						</span>
					</div>
				))}
			</div>

		</section>
	);
}

export default EventListItem;
