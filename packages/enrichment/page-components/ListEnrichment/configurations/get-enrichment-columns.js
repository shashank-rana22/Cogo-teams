import { Button, Pill, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils/';

import UPLOAD_DOCUMENT_STATUS_MAPPING from '../../../constants/upload-document-status-mapping';
import ActionContent from '../common/Enrichment/ActionContent';
import styles from '../styles.module.css';

const getEnrichmentColumns = ({
	handleUploadClick = () => {},
	setSelectedRowId = () => {},
	selectedRowId = '',
	onEnrichmentClick = () => {},
	refetch = () => {},
	activeTab = '',
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
		id       : 'created_at',
		Header   : 'REQUESTED AT',
		accessor : ({ created_at = '' }) => (
			<section>
				{created_at ? (
					<div>
						{formatDate({
							date       : created_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						}) || '-'}

					</div>
				) : (
					'___'
				)}
			</section>
		),
	},
	{
		id       : 'registration_number',
		Header   : 'PAN',
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
          // eslint-disable-next-line no-undef
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
          // eslint-disable-next-line no-undef
					onClick={() => window.open(error_sheet_url, '_blank')}
				>
					Download
				</Button>
			</section>
		),
	},
	{
		id       : 'action',
		Header   : <div className={styles.action_header}>Action</div>,
		accessor : (item) => {
			const { id } = item;

			const onClickCta = (workflow) => {
				if (['add', 'edit'].includes(workflow)) {
					handleUploadClick(id);
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
							activeTab={activeTab}
						/>
					)}
					onClickOutside={() => setSelectedRowId(null)}
				>

					<div
						className={styles.svg_container}
					>
						<IcMOverflowDot
							height={16}
							width={16}
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
