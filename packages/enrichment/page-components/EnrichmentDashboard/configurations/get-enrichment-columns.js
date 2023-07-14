import { Button, ButtonIcon, Pill, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils/';

import UPLOAD_DOCUMENT_STATUS_MAPPING from '../../../constants/upload-document-status-mapping';
import ActionContent from '../components/ManualEnrichment/components/ActionContent';
import styles from '../styles.module.css';

const getEnrichmentColumns = ({
	handleEditDetails = () => {},
	setSelectedRowId = () => {},
	selectedRowId = '',
	onEnrichmentClick = () => {},
	refetch = () => {},
	loadingComplete = false,
	secondaryTab = 'active',
	user_id = '',
}) => [
	{
		id       : 'id',
		Header   : 'SERIAL ID',
		accessor : ({ organization, lead_organization }) => (
			<section>
				<Pill>
					#
					{lead_organization?.serial_id || organization?.serial_id}
				</Pill>
			</section>
		),
	},
	{
		id       : 'file_id',
		Header   : 'SERIAL ID',
		accessor : ({ serial_id }) => (
			<section>
				<Pill>
					#
					{serial_id || '-'}
				</Pill>
			</section>
		),
	},
	{
		id       : 'business_name',
		Header   : 'ORGANIZATION',
		accessor : ({ organization, lead_organization, lead_organization_id }) => (
			<section>
				{lead_organization_id
					? (lead_organization || {}).business_name || '-'
					: (organization || {}).business_name || '-'}
			</section>
		),
	},

	{
		id       : 'registration_number',
		Header   : 'TAX Number',
		accessor : ({ organization, lead_organization, lead_organization_id }) => (
			<section>
				{lead_organization_id
					? (lead_organization || {}).registration_number || '-'
					: (organization || {}).registration_number || '-'}
			</section>
		),
	},
	{
		id       : 'submission_date',
		Header   : ' SUBMISSION DATE',
		accessor : () => <section>-</section>,
	},
	{
		id       : 'file_name',
		Header   : 'FILE NAME',
		accessor : ({ file_name }) => (
			<section>{startCase(file_name) || '-'}</section>
		),
	},
	{
		id       : 'upload_date',
		Header   : 'UPLOAD DATE',
		accessor : ({ created_at }) => (
			<section>
				{created_at
					? formatDate({
						date       : created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					}) : '-'}

			</section>
		),
	},
	{
		id       : 'organizations',
		Header   : 'ORGANIZATIONS',
		accessor : ({ organizations }) => <section>{organizations || '-'}</section>,
	},
	{
		id       : 'requested_agent',
		Header   : 'Agent',
		accessor : ({ assigned_user = {} }) => (
			<section
				className={styles.value_container}
			>
				{startCase(assigned_user?.name || '___')}
				<div className={styles.email_id}>{assigned_user?.email || '___'}</div>

			</section>
		),

	},
	{
		id       : 'num_pocs',
		Header   : 'POCS COUNT',
		accessor : ({ num_pocs }) => <section>{num_pocs || '-'}</section>,
	},
	{
		id       : 'sheet_url',
		Header   : 'SHEET URL',
		accessor : ({ sheet_url }) => (
			<section>
				<Button
					themeType="secondary"
					size="md"
					type="button"
					disabled={sheet_url === null}
					onClick={() => window.open(sheet_url, '_blank')}
				>
					Download
				</Button>
			</section>
		),
	},
	{
		id       : 'error_sheet_url',
		Header   : 'ERROR SHEET URL',
		accessor : ({ error_sheet_url }) => (
			<section>
				<Button
					themeType="secondary"
					size="md"
					type="button"
					disabled={!error_sheet_url}
					onClick={() => window.open(error_sheet_url, '_blank')}
				>
					Download
				</Button>
			</section>
		),
	},

	{
		id       : 'created_at',
		Header   : 'REQUESTED AT',
		accessor : ({ created_at = '' }) => (
			<section>
				{created_at ? (
					<div>
						{formatDate({
							date       : created_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'dateTime',
						}) || '-'}

					</div>
				) : (
					'___'
				)}
			</section>
		),
	},

	{
		id       : 'action',
		Header   : <div className={styles.action_header}>Action</div>,
		accessor : (item) => {
			const { id, assigned_user = {} } = item;

			const onClickCta = (workflow) => {
				if (['add', 'edit'].includes(workflow)) {
					handleEditDetails(id);
				} else {
					onEnrichmentClick({ id, workflow, refetch });
				}
			};

			return (
				<Popover
					placement="bottom"
					interactive
					visible={selectedRowId === id}
					render={(
						<ActionContent
							onClickCta={onClickCta}
							secondaryTab={secondaryTab}
							loadingComplete={loadingComplete}
						/>
					)}
					onClickOutside={() => setSelectedRowId(null)}
				>

					<div className={styles.action_cta}>
						<ButtonIcon
							size="md"
							themeType="primary"
							type="button"
							disabled={assigned_user && !isEmpty(assigned_user) && assigned_user.id !== user_id}
							icon={(
								<IcMOverflowDot
									height={16}
									width={16}
								/>
							)}
							onClick={() => setSelectedRowId(() => (selectedRowId === id ? null : id))}
						/>
					</div>

				</Popover>
			);
		},
	},
	{
		id       : 'status',
		Header   : 'STATUS',
		accessor : ({ status }) => (
			<seaction>
				<Pill size="md" color={UPLOAD_DOCUMENT_STATUS_MAPPING[status]}>
					{startCase(status) || '-'}
				</Pill>
			</seaction>
		),
	},
];

export default getEnrichmentColumns;
