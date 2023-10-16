import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { getByKey, startCase } from '@cogoport/utils';

import ActionRejected from '../accessorComponent/ActionRejected';
import ClickableIncidentId from '../accessorComponent/ClickableIncidentId';
import CompanyName from '../accessorComponent/CompanyName';
import DateName from '../accessorComponent/DateName';
import Remarks from '../accessorComponent/Remarks';
import StatusName from '../accessorComponent/StatusName';

import SortData from './SortData';
import styles from './styles.module.css';

const rejectedColumn = ({
	isSortActive, setIsSortActive,
	setGlobalFilters, refetch, setActiveTab, setPayload,
}) => [
	{
		Header   : <div>INCIDENT ID</div>,
		id       : 'referenceId',
		accessor : (row) => (
			<ClickableIncidentId itemData={row} setActiveTab={setActiveTab} setPayload={setPayload} />
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
		Header   : <div>REJECTED BY & ON</div>,
		id       : 'rejectedBy',
		accessor : (row) => (
			<div>
				<DateName itemData={row} />
			</div>
		),
	},
	{
		Header:
	<div>
		<SortData isSortActive={isSortActive} setIsSortActive={setIsSortActive} setGlobalFilters={setGlobalFilters} />
	</div>,
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
								date: reversedDate,
								dateFormat:
										GLOBAL_CONSTANTS.formats.date[
											'dd MMM yyyy'
										],
								formatType: 'date',
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
		Header   : 'REMARKS',
		id       : 'remarks',
		accessor : (row) => (
			<div>
				<Remarks itemData={row} />
			</div>
		),
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
		id       : 'action',
		accessor : (row) => (
			<div>
				<ActionRejected itemData={row} refetch={refetch} />
			</div>
		),

	},

];
export default rejectedColumn;
