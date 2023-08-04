import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import UPLOAD_DOCUMENT_STATUS_MAPPING from './upload-document-status-mapping';

const getEnrichmentSheetsColumns = () => [
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
				{created_at ? formatDate({
					date       : created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) : '-'}
			</section>
		),
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

export default getEnrichmentSheetsColumns;
