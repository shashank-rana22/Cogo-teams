import { Popover, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RenderPopover({ item = {}, onClickDelete = () => {}, deleteLoading = false }) {
	return (
		<div className={styles.popover_button}>
			Are you sure?

			<Button
				size="sm"
				themeType="primary"
				onClick={() => {
					if (!deleteLoading) onClickDelete(item);
				}}
				style={{ marginLeft: 12 }}
			>
				Yes
			</Button>
		</div>
	);
}

const getColumns = ({ openLink, onClickDelete, deleteLoading = false }) => [
	{
		Header   : 'NAME',
		accessor : (item) => (
			<div>{item?.video_name || '-'}</div>
		),
	},
	{
		Header   : 'VIDEO LINK',
		accessor : (item) => (
			<div
				role="presentation"
				className={styles.view_video_link}
				onClick={() => openLink(item?.video_link)}
			>
				View
			</div>
		),
	},
	{
		Header   : 'UPDATED AT',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item?.updated_at || null,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
					formatType : 'dateTime',
				}) || '-'}
			</div>
		),
	},
	{
		Header   : 'ACTION',
		accessor : (item) => (
			<div role="presentation" className={styles.delete_icon}>
				<Popover
					placement="top"
					content={(
						<RenderPopover
							item={item}
							onClickDelete={onClickDelete}
							deleteLoading={deleteLoading}
						/>
					)}
				>
					<IcMDelete height={20} width={20} />
				</Popover>
			</div>
		),
	},
];

export default getColumns;
