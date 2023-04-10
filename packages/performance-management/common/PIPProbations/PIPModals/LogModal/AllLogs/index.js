import { Placeholder } from '@cogoport/components';
import { startCase, isEmpty, format } from '@cogoport/utils';
import { useEffect } from 'react';

import EmptyState from '../../../../EmptyState';
import useGetAllLogs from '../../../../../hooks/useGetAllLogs';

import styles from './styles.module.css';

function AllLogs({ item = {} }) {
	const { LogData = {}, loading = false, setParams } = useGetAllLogs();
	const { list = [] } = LogData;

	useEffect(() => {
		setParams({ LogID: item.id });
	}, [item, setParams]);

	if (loading) {
		return (
			<div className={styles.main_container}>
				<div className={styles.sub_container}>
					<div className={styles.flex_container}>
						<div className={styles.circle} />
						<Placeholder width="80px" />
					</div>

					<div className={styles.content}>
						<Placeholder width="140px" />
						<Placeholder width="80px" />
						<Placeholder width="120px" />
						<Placeholder width="120px" />
					</div>
				</div>
			</div>
		);
	}

	if (isEmpty(list)) {
		return (
			<div className={styles.main_container}>
				<div className={styles.empty}>
					<EmptyState
						flexDirection="column"
						emptyText="No Logs Found"
						textSize="16px"
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.main_container}>
			{(list || []).map((object) => (
				<div className={styles.sub_container} key={object.created_at}>
					<div className={styles.flex_container}>
						<div className={styles.circle} />
						<div className={styles.date}>{format(object.created_at, 'dd-MMM-yyyy')}</div>
					</div>

					<div className={styles.content}>
						<div>
							{' '}
							By
							{' '}
							<b>{startCase(object.name?.name || '---')}</b>
						</div>
						<div className={styles.label}>Comments:</div>
						<div>{object.comment || '---'}</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default AllLogs;
