import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { getByKey, startCase } from '@cogoport/utils';

import CompanyName from '../accessorComponent/CompanyName';
import DeleteModal from '../accessorComponent/DeleteModal';
import StatusName from '../accessorComponent/StatusName';
import ViewRequested from '../accessorComponent/ViewRequested';

import SortData from './SortData';
import styles from './styles.module.css';

const requestedColumn = ({
	isSortActive,
	setIsSortActive,
	setGlobalFilters,
	refetch,
}) => [
	{
		Header   : <div>INCIDENT ID</div>,
		id       : 'referenceId',
		accessor : (row) => (
			<div>
				<div className={styles.reference_id}>
					{getByKey(row, 'referenceId')}
				</div>
			</div>
		),
	},
	{
		Header   : <div>COMPANY NAME</div>,
		id       : 'businessName',
		accessor : (row) => (
			<div>
				<CompanyName itemdata={row} />
			</div>
		),
	},
	{
		Header   : <div>REQUEST TYPE</div>,
		id       : 'type',
		accessor : (row) => (
			<div className={styles.request_type}>
				{startCase(getByKey(row, 'type'))}
			</div>
		),
	},
	{
		Header   : 'REQUEST SUB TYPE',
		accessor : 'incidentSubtype',
		id       : 'request_sub_type',
	},
	{
		Header: (
			<div>
				<SortData
					isSortActive={isSortActive}
					setIsSortActive={setIsSortActive}
					setGlobalFilters={setGlobalFilters}
				/>
			</div>
		),
		id       : 'createdAt',
		accessor : (row) => {
			const { createdAt = '' } = row || {};
			const [date, time] = createdAt?.split(' ') || [];
			const [day, month, year] = date.split('-');
			const reversedDate = `${year}-${month}-${day} ${time}`;

			return (
				<>
					<div className={styles.time}>
						{date
							? formatDate({
								date       : reversedDate,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
								formatType : 'date',
							})
							: '_'}
					</div>
					<div>
						{time
							? formatDate({
								date: reversedDate,
								timeFormat:
										GLOBAL_CONSTANTS.formats.time[
											'hh:mm aaa'
										],
								formatType: 'time',
							})
							: '_'}
					</div>
				</>
			);
		},
	},
	{
		Header   : <div>STATUS</div>,
		id       : 'userIncidentStatus',
		accessor : (row) => (
			<div>
				<div>
					<StatusName itemData={row} />
				</div>
			</div>
		),
	},

	{
		Header   : '',
		id       : 'view',
		accessor : (row) => (
			<div>
				<ViewRequested itemData={row} name="" refetch={refetch} />
			</div>
		),
	},
	{
		Header : '',
		id     : 'delete',

		accessor: (row) => (
			<div>
				<DeleteModal itemData={row} refetch={refetch} />
			</div>
		),
	},
	{
		Header   : '',
		id       : 'ribbon',
		accessor : (row) => {
			const { deadlineTag } = row;
			return (
				deadlineTag &&	(
					<div>
						{deadlineTag === 'RED' && (
							<div className={deadlineTag === 'RED' && styles.ribbon_red}>
								Urgent
							</div>
						)}
						{
								deadlineTag === 'ORANGE' && (
									<div className={deadlineTag === 'ORANGE' && styles.ribbon_orange}>
										Urgent
									</div>
								)
							}
					</div>
				)
			);
		},
	},
];
export default requestedColumn;
