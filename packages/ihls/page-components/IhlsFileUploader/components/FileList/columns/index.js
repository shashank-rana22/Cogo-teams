import { Button, Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import ICON_MAPPING from '../../../constants/getIconMapping';
import STATUS_PILL_MAPPING from '../../../constants/getStatusPillMapping';

import NameToolTip from './NameToolTip';
import styles from './style.module.css';

function getColumns({ params, setParams, setFileInfo }) {
	const { setSort, Component } = ICON_MAPPING[params?.sort_type];
	const columns = [
		{
			id       : 1,
			Header   : 'File Id',
			accessor : ({ id = '' }) => id,
		},
		{
			id       : 2,
			Header   : 'File Name',
			accessor : ({ file_name = '', url = null }) => (
				<NameToolTip file_name={file_name} url={url} />
			),
		},
		{
			id       : 4,
			Header   : 'Status',
			accessor : ({ status = '' }) => {
				const { label = '', color = '' } = STATUS_PILL_MAPPING[status] || {};
				return (
					<Pill
						key={label}
						size="md"
						color={color}
					>
						{label}
					</Pill>
				);
			},
		},
		{
			id     : 5,
			Header : (
				<div className={styles.created_container}>
					Created at

					<Component
						onClick={() => setParams({ ...params, page: 1, sort_type: setSort })}
						style={{ cursor: 'pointer', marginLeft: '4px' }}
					/>
				</div>
			),
			accessor: ({ created_at = '' }) => (
				<div>
					{created_at ? (
						<div className={styles.created_date}>
							{formatDate({
								date       : created_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							}) || '___'}
							::
							<div className={styles.created_time}>
								{formatDate({
									date       : created_at,
									timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
									formatType : 'time',
								}) || '___'}
							</div>
						</div>
					) : '___'}
				</div>
			),
		},
		{
			id       : 6,
			Header   : 'View Stats',
			accessor : ({ id, file_name, status = '' }) => (
				<Button
					onClick={() => {
						setFileInfo({ fileName: file_name, fileId: id });
					}}
					size="sm"
					type="button"
					themeType="primary"
					className={styles.btn_stats}
					disabled={!(status === 'success')}
				>
					{status === 'success' ? 'Stats'
						: (
							<Tooltip content="File is not processed." placement="bottom">
								Stats
							</Tooltip>
						)}
				</Button>
			),
		},
	];

	return {
		columns,
	};
}

export default getColumns;
