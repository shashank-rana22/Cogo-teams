import { ButtonIcon, Tooltip, Checkbox } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { format, startCase, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

export const getFeedbackColumns = ({
	selectAll = false,
	onChangeTableHeadCheckbox = () => {},
	checkedRowsId = [],
	onChangeBodyCheckbox = () => {},
}) => [
	{
		id     : 'checkbox',
		key    : 'checkbox',
		Header : <Checkbox
			checked={selectAll}
			onChange={(event) => onChangeTableHeadCheckbox(event)}
		/>,
		accessor: ({ id = '' }) => (
			<Checkbox
				checked={checkedRowsId.includes(id)}
				onChange={(event) => onChangeBodyCheckbox(event, id)}
			/>
		),
	},
	{
		Header   : 'ORGANIZATION',
		key      : 'organization',
		id       : 'organization',
		accessor : ({ organization, lead_organization_id, lead_organization }) => (
			<section className={styles.table_cell}>
				{lead_organization_id ? (
					startCase(lead_organization?.business_name || '___')
				) : (
					startCase(organization?.business_name || '___')
				)}
			</section>
		),
	},
	{
		Header   : 'COGO-ENTITY',
		key      : 'cogo_entity',
		id       : 'cogo_entity',
		accessor : ({ cogo_entity }) => (
			<section className={styles.table_cell}>
				{cogo_entity?.business_name || '___'}
			</section>
		),
	},
	{
		Header   : 'TYPE',
		key      : 'type',
		id       : 'type',
		accessor : ({ source_type }) => (
			<section className={styles.table_cell}>
				{startCase(source_type || '___') }
			</section>
		),
	},
	{
		Header   : 'SUB-TYPE',
		key      : 'sub_type',
		id       : 'sub_type',
		accessor : ({ feedback_parameter }) => (
			<section className={styles.table_cell}>
				{startCase(feedback_parameter || '___') }
			</section>
		),
	},
	{
		Header   : 'CURRENT DATA',
		key      : 'current_data',
		id       : 'current_data',
		accessor : ({ feedback_parameter_value }) => (
			<section className={styles.feedback}>
				<Tooltip
					content={<span className={styles.tooltip}>{feedback_parameter_value}</span>}
					placement="top"
					interactive
					disabled={isEmpty(feedback_parameter_value)}
					className={styles.tooltip}
				>
					<span className={styles.tooltip_text}>
						{feedback_parameter_value || '___'}
					</span>
				</Tooltip>
			</section>
		),
	},
	{
		Header   : 'FEEDBACK & PROOF',
		key      : 'feedback',
		id       : 'feedback',
		accessor : ({ feedback, other_feedback, feedback_reference_document_url }) => (
			<section className={styles.feedback}>
				<Tooltip
					content={(
						<span className={styles.tooltip}>
							{feedback === 'other' ? (startCase(other_feedback) || 'Other') : (startCase(feedback))}
						</span>
					)}
					placement="top"
					interactive
					disabled={isEmpty(feedback)}
				>
					<span className={styles.tooltip_text}>
						{startCase(feedback || '___') }
					</span>
				</Tooltip>
				{feedback_reference_document_url ? (
					<a href={feedback_reference_document_url} target="_blank" rel="noreferrer">
						<ButtonIcon
							size="md"
							themeType="primary"
							icon={<IcMEyeopen />}
						/>
					</a>
				) : (
					null
				)}
			</section>
		),
	},
	{
		Header   : 'CORRECTION & PROOF',
		key      : 'correction',
		id       : 'correction',
		accessor : ({
			kam_response, kam_response_reference_document_url,
		}) => (
			<section className={styles.feedback}>
				<Tooltip
					content={<span className={styles.tooltip}>{kam_response}</span>}
					placement="top"
					interactive
					disabled={isEmpty(kam_response)}
				>
					<div>
						<span className={styles.tooltip_text}>
							{kam_response || '___'}
						</span>
					</div>
				</Tooltip>
				{kam_response_reference_document_url
					? (
						<a href={kam_response_reference_document_url} target="_blank" rel="noreferrer">
							<ButtonIcon
								size="md"
								themeType="primary"
								icon={<IcMEyeopen />}
							/>
						</a>
					) : (
						null
					)}
			</section>
		),
	},
	{
		Header   : 'KAM',
		key      : 'kam',
		id       : 'kam',
		accessor : ({ created_by }) => (
			<section className={styles.table_cell}>
				{created_by?.name || '___'}
			</section>
		),
	},
	{
		Header   : 'KAM Manager',
		key      : 'kam_manager',
		id       : 'kam_manager',
		accessor : ({ manager }) => (
			<section className={styles.table_cell}>
				{manager?.name || '___'}
			</section>
		),
	},
	{
		Header   : 'CREATION DATE',
		key      : 'created_date',
		id       : 'created_date',
		accessor : ({ created_at }) => (
			<section className={styles.table_cell}>
				{created_at ? format(created_at, 'dd MMM yyyy') : '___'}
			</section>
		),
	},
];
