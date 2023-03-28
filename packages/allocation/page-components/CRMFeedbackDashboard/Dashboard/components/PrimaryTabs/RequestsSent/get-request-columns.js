import { Button, Pill } from '@cogoport/components';

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
		accessor : ({ organization = {}, lead_organization = {}, lead_organization_id = '' }) => (
			<section>
				#
				{lead_organization_id ? (
					lead_organization?.serial_id || '__'
				) : (
					organization?.serial_id || '__'
				)}
			</section>
		),
	},
	{
		Header   : <div>ORGANIZATION</div>,
		key      : 'organization',
		id       : 'organization',
		accessor : ({ organization = {}, lead_organization = {}, lead_organization_id = '' }) => (
			<section>
				{lead_organization_id ? (
					lead_organization?.business_name || '__'
				) : (
					organization?.business_name || '__'
				)}
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
			statuses = [], organization = {}, lead_organization = {}, lead_organization_id = '',
		}) => {
			const { status, color } = computeStatus(statuses);

			const orgObject = lead_organization_id ? (lead_organization) : (organization);

			const type = lead_organization_id ? ('lead_organization') : ('organization');

			const { id = '', business_name = '' } = orgObject || {};

			const url = `/allocation/feedbacks/${id}?organization=${business_name}&status=${status}&type=${type}`;

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
