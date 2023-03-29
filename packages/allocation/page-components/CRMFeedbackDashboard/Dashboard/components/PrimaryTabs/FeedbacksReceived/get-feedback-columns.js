import { ButtonIcon, Tooltip, Checkbox } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { format, startCase, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

export const FEEDBACK_COLUMNS = ({
	selectAll = false,
	onChangeTableHeadCheckbox = () => {},
	checkedRowsId = [],
	onChangeBodyCheckbox = () => {},
}) => [
	{
		id  : 'checkbox',
		key : 'checkbox',
		Header:
	<div>
		<Checkbox
			checked={selectAll}
			onChange={(event) => onChangeTableHeadCheckbox(event)}
		/>
	</div>,
		accessor: ({ id = '' }) => (
			<div>
				<Checkbox
					checked={checkedRowsId.includes(id)}
					onChange={(event) => onChangeBodyCheckbox(event, id)}
				/>
			</div>
		),
	},
	{
		Header   : <div>ORGANIZATION</div>,
		key      : 'organization',
		id       : 'organization',
		accessor : ({ organization = {}, lead_organization_id = '', lead_organization = {} }) => (
			<section className={styles.table_cell}>
				{lead_organization_id ? (
					startCase(lead_organization?.business_name || '__')
				) : (
					startCase(organization?.business_name || '__')
				)}

			</section>
		),
	},
	{
		Header   : <div>COGO-ENTITY</div>,
		key      : 'cogo_entity',
		id       : 'cogo_entity',
		accessor : ({ cogo_entity = {} }) => (
			<section className={styles.table_cell}>
				{cogo_entity?.business_name || '__'}
			</section>
		),
	},
	{
		Header   : <div>TYPE</div>,
		key      : 'type',
		id       : 'type',
		accessor : ({ source_type = '' }) => (
			<section className={styles.table_cell}>
				{startCase(source_type) || '__'}
			</section>
		),
	},
	{
		Header   : <div>SUB-TYPE</div>,
		key      : 'sub_type',
		id       : 'sub_type',
		accessor : ({ feedback_parameter = '' }) => (
			<section className={styles.table_cell}>
				{startCase(feedback_parameter) || '__'}
			</section>
		),
	},
	{
		Header   : <div>CURRENT DATA</div>,
		key      : 'current_data',
		id       : 'current_data',
		accessor : ({ feedback_parameter_value = '' }) => (
			<section className={styles.feedback}>
				<Tooltip
					content={<span className={styles.tooltip}>{startCase(feedback_parameter_value)}</span>}
					placement="top"
					interactive
					disabled={isEmpty(feedback_parameter_value)}
					className={styles.tooltip}
				>
					<span className={styles.tooltip_text}>
						{startCase(feedback_parameter_value) || '__'}
					</span>
				</Tooltip>
			</section>
		),
	},
	{
		Header   : <div>FEEDBACK & PROOF</div>,
		key      : 'feedback',
		id       : 'feedback',
		accessor : ({ feedback = '', other_feedback = '', feedback_reference_document_url = '' }) => (
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
						{startCase(feedback) || '__'}
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
		Header   : <div>CORRECTION & PROOF</div>,
		key      : 'correction',
		id       : 'correction',
		accessor : ({
			kam_response = '', kam_response_reference_document_url = '',
		}) => (
			<section className={styles.feedback}>
				<Tooltip
					content={<span className={styles.tooltip}>{startCase(kam_response)}</span>}
					placement="top"
					interactive
					disabled={isEmpty(kam_response)}
				>
					<div>
						<span className={styles.tooltip_text}>
							{startCase(kam_response) || '__'}
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
		Header   : <div>CREATION DATE</div>,
		key      : 'created_date',
		id       : 'created_date',
		accessor : ({ created_at }) => (
			<section className={styles.table_cell}>
				{created_at ? format(created_at, 'dd MMM yyyy') : '___'}
			</section>
		),
	},
	{
		Header   : <div>KAM Manager</div>,
		key      : 'kam_manager',
		id       : 'kam_manager',
		accessor : ({ manager = {} }) => (
			<section className={styles.table_cell}>
				{manager?.name || '__'}
			</section>
		),
	},
	{
		Header   : <div>KAM</div>,
		key      : 'kam',
		id       : 'kam',
		accessor : ({ created_by = {} }) => (
			<section className={styles.table_cell}>
				{created_by?.name || '__'}
			</section>
		),
	},
];
