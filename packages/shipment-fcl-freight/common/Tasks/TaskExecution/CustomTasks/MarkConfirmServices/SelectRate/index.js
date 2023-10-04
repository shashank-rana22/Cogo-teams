import { Loader, Tabs, TabPanel } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useEffect, useState } from 'react';

import useListShipmentBookingConfirmationPreferences
	from '../../../../../../hooks/useListShipmentBookingConfirmationPreferences';
import useUpdateShipmentBookingConfirmationPreferences from
	'../../../../../../hooks/useUpdateShipmentBookingConfirmationPreferences';
import groupedSimilarServicesData from '../../../helpers/groupSimilarServices';

import Card from './Card';
import SelectNormal from './SelectNormal';
import styles from './styles.module.css';

function SelectRate({
	setStep = () => {},
	setSelectedCard = () => {},
	selectedCard = [],
	task = {},
	servicesList = [],
}) {
	const TWO = 2;
	const ONE = 1;
	const { similarServiceIds, title } = groupedSimilarServicesData(servicesList, task.service_type, task.service_id);
	const { data, loading } = useListShipmentBookingConfirmationPreferences({
		shipment_id    : task.shipment_id,
		defaultFilters : { service_type: task.service_type, service_id: similarServiceIds },
	});

	const [activeTab, setActiveTab] = useState(similarServiceIds[GLOBAL_CONSTANTS.zeroth_index]);

	useEffect(() => {
		const list = data?.list || [];
		const SELECTED_PRIORITY = [];

		(list || []).forEach((item) => {
			if (item.priority === item.selected_priority) {
				SELECTED_PRIORITY.push(item);
			}
		});
		if (SELECTED_PRIORITY.length) {
			setSelectedCard(SELECTED_PRIORITY);
			setStep(TWO);
		}
	}, [setStep, setSelectedCard, data]);

	const { apiTrigger } = useUpdateShipmentBookingConfirmationPreferences({ });

	const handleProceed = async (item) => {
		setSelectedCard((prev) => [...prev, item]);
		if (selectedCard.length >= similarServiceIds.length - ONE) {
			await apiTrigger([...selectedCard, item]);
			setStep((prev) => prev + ONE);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.selection_div}>
				{loading ? (
					<div className={styles.loader}>
						<Loader />
						{' '}
						Loading Task...
					</div>
				) : null}
				{(similarServiceIds || []).length <= ONE ? (
					<>
						{(data?.list || []).map((item) => (
							<Card
								key={item?.service_id}
								item={item}
								priority={item.priority}
								similarServiceIds={similarServiceIds}
								selectedCard={selectedCard}
								handleProceed={handleProceed}
							/>
						))}
						<SelectNormal
							setStep={setStep}
						/>
					</>
				) : (
					<Tabs activeTab={activeTab} onChange={setActiveTab}>
						{(similarServiceIds || []).map((service_id) => (
							<TabPanel
								name={service_id}
								title={title[service_id]}
								key={service_id}
							>
								{(data?.list || []).map((item) => (
									item?.service_id === service_id ? (
										<Card
											key={item?.service_id}
											item={item}
											priority={item.priority}
											similarServiceIds={similarServiceIds}
											selectedCard={selectedCard}
											handleProceed={handleProceed}
										/>
									) : null
								))}
								<SelectNormal
									setStep={setStep}
								/>
							</TabPanel>
						))}
					</Tabs>
				)}
			</div>
		</div>
	);
}

export default SelectRate;
