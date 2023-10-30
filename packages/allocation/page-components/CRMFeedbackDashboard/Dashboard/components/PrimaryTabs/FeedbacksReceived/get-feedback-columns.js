import { ButtonIcon, Tooltip, Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEyeopen } from '@cogoport/icons-react';
import { format, startCase, isEmpty } from '@cogoport/utils';

import OrgName from './OrgName';
import styles from './styles.module.css';

export const getFeedbackColumns = ({
	selectAll = false,
	onChangeTableHeadCheckbox = () => {},
	checkedRowsId = [],
	onChangeBodyCheckbox = () => {},
	t = () => {},
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
		Header   : t('allocation:organization_feedback_label'),
		key      : 'organization',
		id       : 'organization',
		accessor : (item) => (
			<OrgName item={item} />

		),
	},
	{
		Header   : t('allocation:cogo_entity'),
		key      : 'cogo_entity',
		id       : 'cogo_entity',
		accessor : ({ cogo_entity }) => (
			<section className={styles.table_cell}>
				{cogo_entity?.business_name || '___'}
			</section>
		),
	},
	{
		Header   : t('allocation:type_label'),
		key      : 'type',
		id       : 'type',
		accessor : ({ source_type }) => (
			<section className={styles.table_cell}>
				{startCase(source_type || '___')}
			</section>
		),
	},
	{
		Header   : t('allocation:sub_type'),
		key      : 'sub_type',
		id       : 'sub_type',
		accessor : ({ feedback_parameter }) => (
			<section className={styles.table_cell}>
				{startCase(feedback_parameter || '___')}
			</section>
		),
	},
	{
		Header   : t('allocation:current_data'),
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
		Header   : t('allocation:feedback_and_proof'),
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
						{startCase(feedback || '___')}
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
		Header   : t('allocation:correction_and_proof'),
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
		Header   : t('allocation:kam_label'),
		key      : 'kam',
		id       : 'kam',
		accessor : ({ created_by }) => (
			<section className={styles.table_cell}>
				{created_by?.name || '___'}
			</section>
		),
	},
	{
		Header   : t('allocation:kam_manager'),
		key      : 'kam_manager',
		id       : 'kam_manager',
		accessor : ({ manager }) => (
			<section className={styles.table_cell}>
				{manager?.name || '___'}
			</section>
		),
	},
	{
		Header   : t('allocation:created_date'),
		key      : 'created_date',
		id       : 'created_date',
		accessor : ({ created_at }) => (
			<section className={styles.table_cell}>
				{created_at ? format(created_at, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']) : '___'}
			</section>
		),
	},
	{
		Header   : t('allocation:validity_status'),
		key      : 'is_valid_feedback',
		id       : 'is_valid_feedback',
		accessor : ({ is_valid_feedback }) => {
			if (is_valid_feedback == null) {
				return <section className={styles.table_cell} />;
			}

			return (
				<section className={styles.table_cell}>
					{is_valid_feedback ? t('allocation:validity_enrichment_status_valid')
						: t('allocation:validity_enrichment_status_invalid')}
				</section>
			);
		},
	},
	{
		Header   : t('allocation:org_created_at'),
		key      : 'org_created_at',
		id       : 'org_created_at',
		accessor : ({ organization }) => {
			const { created_at = '' } = organization || {};

			return (
				<section className={styles.table_cell}>
					{formatDate({
						date       : created_at,
						formatType : 'date',
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					})}

				</section>
			);
		},
	},
];
