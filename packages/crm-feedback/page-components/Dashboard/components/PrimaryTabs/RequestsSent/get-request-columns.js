import { Button, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function computeStatus({ statuses = '[]' }) {
	const { requested, responded } = JSON.parse(statuses);
	if (requested && responded) {
		const responsesReceived = responded;
		const totalRequested = requested + responded;
		return {
			status : `${responsesReceived}/${totalRequested} Responses Received`,
			color  : 'green',
		};
	}
	return {
		status : 'Request Created',
		color  : 'blue',
	};
}

export const REQUEST_COLUMNS = ({
	router,
}) => [
	{
		Header   : <div>Serial ID</div>,
		key      : 'serial_id',
		id       : 'serial_id',
		accessor : ({ organization = {} }) => (
			<section>
				#
				{organization?.serial_id || '__'}
			</section>
		),
	},
	{
		Header   : <div>ORGANIZATION</div>,
		key      : 'organization',
		id       : 'organization',
		accessor : ({ organization = '' }) => (
			<section>
				{startCase(organization?.business_name || '__')}
			</section>
		),
	},
	{
		Header   : <div>NO. OF FEEDBACKS RECEIVED</div>,
		key      : 'count_of_feedbacks',
		id       : 'count_of_feedbacks',
		accessor : ({ count_of_feedbacks = '' }) => (
			<section className={styles.table_cell}>
				{count_of_feedbacks || '__'}
			</section>
		),
	},
	{
		Header   : <div>STATUS</div>,
		key      : 'status',
		id       : 'status',
		accessor : ({
			statuses = [], organization = {},
		}) => {
			const { status, color } = computeStatus(statuses);

			const { id, business_name } = organization;

			const url = `/feedbacks/${id}?organization=${business_name}&status=${status}`;

			return (
				<section className={styles.view}>
					<Pill size="md" color={color}>
						{status || 'Status not found'}
					</Pill>

					<Button size="sm" themeType="secondary" onClick={() => router.push(url)}>
						View Request
					</Button>
				</section>
			);
		},
	},
];
