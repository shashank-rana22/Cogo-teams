import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const downloadFileAtUrl = ({ url }) => {
	fetch(url).then((response) => response.blob()).then((blob) => {
		const blobURL = URL.createObjectURL(new Blob([blob]));
		const fileName = url?.split('/').pop();
		const aTag = document.createElement('a');
		aTag.href = blobURL;
		aTag.setAttribute('download', fileName);
		document.body.appendChild(aTag);
		aTag.click();
		aTag.remove();
	});
};

const getColumns = ({ onClickViewDocument, setShowUploaderModal }) => [
	{
		Header   : 'DOCUMENT NAME',
		accessor : (item) => <div className={styles.name}>{startCase(item?.name)}</div>,
	},
	{
		Header   : 'FILE',
		accessor : (item) => (
			<div
				role="presentation"
				className={styles.view_container}
				onClick={() => onClickViewDocument({ url: item?.signed_document_url || item?.document_url })}
			>
				<div style={{ margin: '0 4px', textDecoration: 'underLine' }}>
					View
				</div>

				<IcMEyeopen
					width={14}
					height={14}
					style={{ cursor: 'pointer' }}

				/>
			</div>
		),
	},
	{
		Header   : 'UPLOAD DATE',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item.created_at || new Date(),
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
					formatType : 'date',
				})}
			</div>
		),
	},
	{
		Header   : 'STATUS',
		accessor : (item) => (
			<div>{startCase(item?.status)}</div>
		),
	},
	{
		Header   : 'ACTION',
		accessor : (item) => (
			<div className={styles.button_container}>
				<div className={styles.button}>
					<Button
						size="sm"
						onClick={() => setShowUploaderModal(item?.id)}
					>
						UPLOAD
					</Button>
				</div>

				<div className={styles.button}>
					<Button
						size="sm"
						onClick={() => downloadFileAtUrl({ url: item?.document_url })}
					>
						DOWNLOAD
					</Button>
				</div>
			</div>

		),
	},
];

export default getColumns;
