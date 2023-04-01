import { Button, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function computeStatus({ statuses = '' }) {
	const statusesObj = JSON.parse(statuses).reduce((prev, curr) => {
		const key = Object.keys(curr)[0];
		const value = curr[key];
		return { ...prev, [key]: value };
	}, {});

	const { requested = 0, responded = 0 } = statusesObj;

	if (responded !== 0) {
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

export const getRequestColumns = ({
	router,
}) => [
	{
		Header   : 'Serial ID',
		key      : 'serial_id',
		id       : 'serial_id',
		accessor : ({ organization, lead_organization, lead_organization_id }) => (
			<Pill size="md">
				#
				{lead_organization_id ? (
					lead_organization?.serial_id || '___'
				) : (
					organization?.serial_id || '___'
				)}
			</Pill>
		),
	},
	{
		Header   : 'ORGANIZATION',
		key      : 'organization',
		id       : 'organization',
		accessor : ({ organization, lead_organization, lead_organization_id }) => (
			<section>
				{lead_organization_id ? (
					startCase(lead_organization?.business_name || '___')
				) : (
					startCase(organization?.business_name || '___')
				)}
			</section>
		),
	},
	{
		Header   : 'NO. OF FEEDBACKS RECEIVED',
		key      : 'feedback_count',
		id       : 'feedback_count',
		accessor : ({ feedback_count }) => (
			<section className={styles.table_cell}>
				{feedback_count || 'No feedback received'}
			</section>
		),
	},
	{
		Header   : 'STATUS',
		key      : 'status',
		id       : 'status',
		accessor : ({
			statuses = [], organization = {}, lead_organization = {}, lead_organization_id,
		}) => {
			const { status, color } = computeStatus({ statuses });

			const orgObject = lead_organization_id ? lead_organization : organization;

			const type = lead_organization_id ? 'lead_organization' : 'organization';

			const { id = '', business_name = '' } = orgObject || {};

			const url = `/allocation/feedbacks/${id}?organization=${business_name}&status=${status}&type=${type}`;

			return (
				<section className={styles.view}>
					<Pill size="md" color={color}>
						{status || 'Nil'}
					</Pill>

					<Button size="sm" themeType="secondary" onClick={() => router.push(url)}>
						View Request
					</Button>
				</section>
			);
		},
	},
];
