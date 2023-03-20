import { format, getByKey, startCase } from '@cogoport/utils';

import CompanyName from '../accessorComponent/CompanyName';
import DeleteModal from '../accessorComponent/DeleteModal';
import StatusName from '../accessorComponent/StatusName';
import ViewRequested from '../accessorComponent/ViewRequested';

import SortData from './SortData.tsx';
import styles from './styles.module.css';

const requestedColumn = ({ isSortActive, setIsSortActive, setGlobalFilters, refetch }) => [
	{
		Header   : <div>INCIDENT ID</div>,
		id       : 'referenceId',
		accessor : (row) => (
			<div>
				<div className={styles.reference_id}>
					{getByKey(row, 'referenceId') as string}
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
				{startCase(getByKey(row, 'type') as string)}
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
			const { createdAt } = row;
			return (
				<div>
					{format(createdAt, 'dd MMM YYYY', {}, false)}
					<div>{format(createdAt, 'hh:mm a', {}, false)}</div>
				</div>
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
