import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

const getColumns = ({ onClickOpen }) => [
	{
		Header   : 'SESSION NAME',
		accessor : (item) => (
			<div>{item?.video_name}</div>
		),
	},
	{
		Header   : 'VIDEO URL',
		accessor : (item) => (
			<div>
				<Button
					size="md"
					type="button"
					themeType="tertiary"
					className={styles.view_text}
					onClick={() => onClickOpen(item?.video_link)}
				>
					View
				</Button>
			</div>
		),
	},
	{
		Header   : 'UPDATED AT',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item?.updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'dateTime',
				})}
			</div>
		),
	},
];

export default getColumns;
