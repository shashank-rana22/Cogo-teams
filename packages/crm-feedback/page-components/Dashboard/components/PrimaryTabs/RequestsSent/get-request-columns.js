import { Button, Pill } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

export const REQUEST_COLUMNS = ({
	router,
}) => [
	{
		Header   : <div>S. No.</div>,
		key      : 'serial_id',
		id       : 'serial_id',
		accessor : ({ serial_id = '' }) => (
			<section>
				#
				{serial_id || '__'}
			</section>
		),
	},
	{
		Header   : <div>ORGANIZATION</div>,
		key      : 'organization',
		id       : 'organization',
		accessor : ({ organization = '' }) => (
			<section>
				{organization || '__'}
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
		Header   : <div>LAST FEEDBACK</div>,
		key      : 'last_feedback_date',
		id       : 'last_feedback_date',
		accessor : ({ last_feedback_date = '' }) => (
			<section>
				{format(last_feedback_date, 'dd MMM yyyy') || '__'}
			</section>
		),
	},
	{
		Header   : <div>COGO ENTITY</div>,
		key      : 'cogo_entity',
		id       : 'cogo_entity',
		accessor : ({ cogo_entity = '' }) => (
			<section>
				{startCase(cogo_entity) || '__'}
			</section>
		),
	},
	{
		Header   : <div>STATUS</div>,
		key      : 'status',
		id       : 'status',
		accessor : ({
			status = '', organization_id = '', organization = '',
		}) => (
			<section className={styles.view}>
				<Pill
					size="md"
					color={status !== 'Request Created' ? ('green') : ('blue')}
				>
					{status || 'Status not found'}
				</Pill>
				<Button
					size="sm"
					themeType="secondary"
					onClick={() => {
						router.push(`/feedbacks/${organization_id}?organization=${organization}&status=${status}`);
					}}
				>
					View Request
				</Button>

			</section>
		),
	},
];
