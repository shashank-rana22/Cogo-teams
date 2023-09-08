import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function computeStatus({ statuses = '', t = () => {} }) {
	const statusesObj = JSON.parse(statuses).reduce((prev, curr) => {
		const key = Object.keys(curr)[GLOBAL_CONSTANTS.zeroth_index];
		const value = curr[key];
		return { ...prev, [key]: value };
	}, {});

	const { requested = 0, responded = 0 } = statusesObj;

	if (responded !== GLOBAL_CONSTANTS.zeroth_index) {
		const responsesReceived = responded;
		const totalRequested = requested + responded;

		return {
			translatedStatus : `${responsesReceived}/${totalRequested} ${t('allocation:responses_received')}`,
			status           : `${responsesReceived}/${totalRequested} Responses Received`,
			color            : 'green',
		};
	}

	return {
		translatedStatus : t('allocation:request_created'),
		status           : 'Request Created',
		color            : 'blue',
	};
}

export const getRequestColumns = ({
	router,
	t = () => {},
}) => [
	{
		Header   : t('allocation:serial_id'),
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
		Header   : t('allocation:organization_feedback_label'),
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
		Header   : t('allocation:feedback_count'),
		key      : 'feedback_count',
		id       : 'feedback_count',
		accessor : ({ feedback_count }) => (
			<section className={styles.table_cell}>
				{feedback_count || t('allocation:no_feedback_received')}
			</section>
		),
	},
	{
		Header   : t('allocation:status'),
		key      : 'status',
		id       : 'status',
		accessor : ({
			statuses = [], organization = {}, lead_organization = {}, lead_organization_id,
		}) => {
			const { status, color, translatedStatus } = computeStatus({ statuses, t });

			const orgObject = lead_organization_id ? lead_organization : organization;

			const type = lead_organization_id ? 'lead_organization' : 'organization';

			const { id = '', business_name = '' } = orgObject || {};

			const url = `/allocation/feedbacks/${id}?organization=${business_name}&status=${status}&type=${type}`;

			return (
				<section className={styles.view}>
					<Pill size="md" color={color}>
						{translatedStatus || t('allocation:nill_value')}
					</Pill>

					<Button size="sm" themeType="secondary" onClick={() => router.push(url)}>
						{t('allocation:view_request')}
					</Button>
				</section>
			);
		},
	},
];
