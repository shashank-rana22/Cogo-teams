import { Button, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function computeStatus({ statuses = '' }) {
	const statusesArr = JSON.parse(statuses);

	const statusesObj = statusesArr.reduce((acc, curr) => {
		const key = Object.keys(curr)[0];
		const value = curr[key];
		return { ...acc, [key]: value };
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

export const REQUEST_COLUMNS = ({
	router,
}) => [
	{
		Header   : <div>Serial ID</div>,
		key      : 'serial_id',
		id       : 'serial_id',
		accessor : ({ organization = {}, lead_organization = {}, lead_organization_id = '' }) => (
			<Pill size="md">
				#
				{lead_organization_id ? (
					lead_organization?.serial_id || '__'
				) : (
					organization?.serial_id || '__'
				)}
			</Pill>
		),
	},
	{
		Header   : <div>ORGANIZATION</div>,
		key      : 'organization',
		id       : 'organization',
		accessor : ({ organization = {}, lead_organization = {}, lead_organization_id = '' }) => (
			<section>
				{lead_organization_id ? (
					startCase(lead_organization?.business_name || '__')
				) : (
					startCase(organization?.business_name || '__')
				)}
			</section>
		),
	},
	{
		Header   : <div>NO. OF FEEDBACKS RECEIVED</div>,
		key      : 'feedback_count',
		id       : 'feedback_count',
		accessor : ({ feedback_count = '' }) => (
			<section className={styles.table_cell}>
				{feedback_count || 'No feedback received'}
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
			console.log('statuses in main::', statuses);
			const { status, color } = computeStatus({ statuses });

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
