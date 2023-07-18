import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetFuelPayment from '../../hooks/useGetFuelPayment';
import useGetPendingTasks from '../../hooks/useGetPendingTasks';
import useListCollectionParties from '../../hooks/useListCollectionParties';
import Card from '../Card';

import styles from './styles.module.css';

const SUBSIDIARY_SERVICE = 'subsidiary_service';
const COMPLETED_STATUS = 'completed';
const NUMBER_OF_ALLOWED_TRUCKS = 1;
const MANDATORY_TASKS = ['upload_lorry_receipt', 'upload_load_truck_image'];

function CardList({ servicesList = [], shipment_data = {} }) {
	const filteredServices = servicesList.filter((item) => item?.service_type !== SUBSIDIARY_SERVICE);

	const {
		data: pendingTaskData,
		loading: pendingTaskLoading,
	} = useGetPendingTasks({ shipment_data });

	const {
		getFuelPayment,
		loading: loadingGetFuelPayment,
		data: dataGetFuelPayment,
	} = useGetFuelPayment({ shipment_data });

	const {
		data: collectionPartiesData,
		loading: collectionPartiesLoading,
	} = useListCollectionParties({ shipment_data });

	let isTaskCompleted = false;

	if (!isEmpty(pendingTaskData)) {
		const finalTasks = (pendingTaskData.list || []).filter(
			(singleTask) => MANDATORY_TASKS.includes(singleTask?.task),
		);

		isTaskCompleted = finalTasks.every(
			(singleTask) => singleTask?.status === COMPLETED_STATUS,
		);
	}

	if (filteredServices.length > NUMBER_OF_ALLOWED_TRUCKS) {
		return <h1 className={styles.heading}>Not Valid for Multiple trucks !!</h1>;
	}

	if (loadingGetFuelPayment || collectionPartiesLoading || pendingTaskLoading) {
		return (
			<div className={styles.loading_container}>
				<Loader className={styles.loader} />
			</div>
		);
	}

	if (!isTaskCompleted && !pendingTaskLoading) {
		return (
			<h1 className={styles.heading}>
				Complete Mandatory Tasks to Proceed further !!
			</h1>
		);
	}

	return (
		<div>
			{filteredServices?.map((item) => (
				<Card
					key={item?.id}
					service={item}
					getFuelPayment={getFuelPayment}
					dataGetFuelPayment={dataGetFuelPayment}
					collectionPartiesData={collectionPartiesData}
					shipment_data={shipment_data}
				/>
			))}
		</div>
	);
}

export default CardList;
