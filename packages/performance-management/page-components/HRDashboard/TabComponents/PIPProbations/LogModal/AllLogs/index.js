import { format } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';
import useGetAllLogs from '../../../../../../hooks/useGetAllLogs';

import styles from './styles.module.css';

function AllLogs({ item = {} }) {
	// const obect = [{
	// 	manager_name : 'Neelam P',
	// 	status       : {
	// 		name       : 'PIP Extended',
	// 		start_date : format(currentDate, 'dd-MMM-yyyy'),
	// 		end_date   : '22-Apr-2023',
	// 	},
	// 	options: [{
	// 		key      : 'Email',
	// 		children : 'Email',
	// 		prefix   : <IcMTick />,
	// 		disabled : true,
	// 	},
	// 	{
	// 		key      : 'Performance',
	// 		children : 'Performance',
	// 		prefix   : <IcMTick />,
	// 		disabled : true,
	// 	}],
	// 	comments: 'This is a example of a commentIn publishing and graphic design,',
	// },
	// {
	// 	manager_name : 'Neelam P',
	// 	status       : {
	// 		name       : 'PIP Extended',
	// 		start_date : format(currentDate, 'dd-MMM-yyyy'),
	// 		end_date   : '22-Apr-2023',
	// 	},
	// 	options: [{
	// 		key      : 'Email',
	// 		children : 'Email',
	// 		prefix   : <IcMTick />,
	// 		disabled : true,
	// 	},
	// 	{
	// 		key      : 'Performance',
	// 		children : 'Performance',
	// 		prefix   : <IcMTick />,
	// 		disabled : true,
	// 	}],
	// 	comments: 'This is a example of a commentIn publishing and graphic design,',
	// }];

	const { LogData = {}, loading = false } = useGetAllLogs(item?.id);
	const { list = [] } = LogData;
	console.log('dataList::', list);

	return (
		<div className={styles.main_container}>
			{list?.map((object) => {
				if (!object) {
					return (
						<div className={styles.empty}>
							<EmptyState
								flexDirection="column"
								emptyText="No Logs Found"
								textSize="16px"
							/>
						</div>
					);
				}

				return (
					<div className={styles.sub_container}>
						<div className={styles.flex_container}>
							<div className={styles.circle} />
							<div className={styles.date}>{format(object.created_at, 'dd-MMM-yyyy')}</div>
						</div>

						<div className={styles.content}>
							<div>
								{' '}
								By
								{' '}
								<b>{object.name}</b>
							</div>
							<div className={styles.lable}>Comments:</div>
							<div>{object.comment}</div>

						</div>
					</div>
				);
			})}
		</div>
	);
}

export default AllLogs;
