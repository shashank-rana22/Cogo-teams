import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import ProcessBtn from './ProcessBtn';
import styles from './styles.module.css';

const ONE = 1;
function getStatusColor(status) {
	switch (status) {
		case 'validated':
			return '#CFEAED';
		case 'invalidated':
			return '#F8AEA8';
		case 'processing':
			return '#FBD1A6';
		case 'partially_added':
			return '#FEF199';
		case 'processed':
			return '#C4DC91';
		case 'uploaded':
			return '#CED1ED';
		default:
			return 'gray';
	}
}
const getTableColumns = ({ refetch = () => {} }) => {
	const tableColumns = [
		{
			Header   : 'File Name',
			accessor : (item) => {
				const arr = (item?.file_url || '').split('/');

				return (
					<div className={styles.styledDiv}>{startCase(decodeURI(arr[arr.length - ONE]))}</div>
				);
			},
		},
		{
			Header: 'Comment', accessor: (item) => <div className={styles.styledDiv}>{item?.comment}</div>,
		},
		{
			Header   : 'Service Name',
			accessor : (item) => <span>{startCase(item?.service_name)}</span>,
		},
		{
			Header   : 'Upload Date',
			accessor : (item) => {
				const formatDates = formatDate({
					date       : item?.created_at,
					formatType : 'dateTime',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
					separator  : ' | ',
				});

				return <span>{formatDates}</span>;
			},
		},
		{
			Header   : 'Status',
			accessor : (row) => {
				const tagStyle = {
					'background-color': getStatusColor(row?.status),
				};
				return (
					<>
						<Pill style={tagStyle}>
							{startCase(row?.status) || '-'}
						</Pill>
						{row?.status === 'validated' ? (
							<ProcessBtn item={row} refetch={refetch} />
						) : null}
					</>
				);
			},
		},
		{
			Header   : 'Stats',
			accessor : (item) => {
				const { total_rates = 0, rates_added = 0 } = item || {};

				if (item?.status === 'partially_added') {
					return (
						<div>
							<div>
								Rates added :
								{' '}
								{+rates_added}
							</div>
							<div>
								Rates not added :
								{' '}
								{total_rates - rates_added || GLOBAL_CONSTANTS.zeroth_index}
							</div>
						</div>
					);
				}

				if (item?.status === 'processed') {
					return (
						<div>
							<div>
								Rates added :
								{' '}
								{+rates_added}
							</div>
						</div>
					);
				}

				return null;
			},
		},
		{
			Header   : 'Uploaded File',
			accessor : (item) => (
				<Button
					themeType="secondary"
					onClick={() => {
						window.open(item?.file_url, '_blank');
					}}
				>
					View / Download
				</Button>
			),
		},
		{
			Header   : 'Resulted File',
			accessor : (item) => {
				if (item?.status === 'uploaded') {
					return null;
				}

				return (
					<Button
						themeType="secondary"
						onClick={() => {
							window.open(item?.resulted_file_url, '_blank');
						}}
					>
						Resulted File
					</Button>
				);
			},
		},
	];

	return tableColumns;
};

export default getTableColumns;
