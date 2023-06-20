import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { saveAs } from 'file-saver';

export const tableColumn = () => [
	{
		key    : 'document_type',
		label  : 'Document Type',
		render : (item) => startCase(item?.document_type),
		span   : 2.5,
	},
	{
		key    : 'uploaded_by',
		label  : 'Uploaded By',
		render : (item) => item?.uploaded_by_user?.name,
		span   : 2.5,
	},
	{
		key    : 'uploaded_on',
		label  : 'Uploaded On',
		render : (item) => formatDate({
			date       : item?.uploaded_at,
			formatType : 'dateTime',
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm'],
		}),
		span: 2.5,
	},
	{
		key    : 'state',
		label  : 'State',
		render : (item) => startCase(item?.state),
		span   : 2.5,
	},
	{
		key    : 'view_document',
		label  : '',
		render : (item) =>	(
			<Button
				themeType="linkUi"
				onClick={() => window.open(item?.document_url, '_blank')}
			>
				View
			</Button>
		),
		span: 1,
	},
	{
		key    : 'download_document',
		label  : '',
		render : (item) => <Button themeType="linkUi" onClick={() => saveAs(item?.document_url)}>Download</Button>,
		span   : 1,
	},
];
