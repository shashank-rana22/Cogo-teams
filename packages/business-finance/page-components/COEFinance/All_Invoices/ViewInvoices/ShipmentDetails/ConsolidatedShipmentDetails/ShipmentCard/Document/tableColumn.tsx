import { Button } from '@cogoport/components';
import startCase from '@cogoport/utils/src/utilities/startCase';
import { saveAs } from 'file-saver';

import { formatDate } from '../../../../../../../commons/utils/formatDate';

export const tableColumn = () => [
	{
		label  : 'Document Type',
		render : (item) => startCase(item?.document_type),
		span   : 2.5,
	},
	{
		label  : 'Uploaded By',
		render : (item) => item?.uploaded_by_user?.name,
		span   : 2.5,
	},
	{
		label  : 'Uploaded On',
		render : (item) => formatDate(item?.uploaded_at, 'dd:MM:yyyy hh:mm', {}, true),
		span   : 2.5,
	},
	{
		label  : 'State',
		render : (item) => startCase(item?.state),
		span   : 2.5,
	},
	{
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
		label  : '',
		render : (item) => <Button themeType="linkUi" onClick={() => saveAs(item?.document_url)}>Download</Button>,
		span   : 1,
	},
];
