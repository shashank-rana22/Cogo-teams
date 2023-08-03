import { Loader, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useEffect, useMemo, useState } from 'react';

import groupedSimilarServicesData from '../../../../../../helpers/groupSimilarServices';
import useListShipmentBookingConfirmationPreferences from
	'../../../../../../hooks/useListShipmentBookingConfirmationPreferences';
import useUpdateShipmentBookingConfirmationPreferences from
	'../../../../../../hooks/useUpdateShipmentBookingConfirmationPreferences';

import Card from './Card';
import SelectNormal from './SelectNormal';
import styles from './styles.module.css';

function SelectRate({
	setStep,
	setSelectedCard,
	task = {},
	servicesList = [],
	selectedCard = [],
	step = 1,
}) {
	const ONE = 1;
	const TWO = 2;
	const { similarServiceIds, title } = groupedSimilarServicesData(servicesList, task.service_type, task.service_id);
	const { data, loading } = useListShipmentBookingConfirmationPreferences({
		shipment_id    : task.shipment_id,
		defaultFilters : { service_type: task.service_type },
	});

	const [activeTab, setActiveTab] = useState(similarServiceIds[GLOBAL_CONSTANTS.zeroth_index]);

	const keys = useMemo(() => Array(data?.length).fill(null).map(() => Math.random()), [data?.length]);

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
	}, [data, setStep, setSelectedCard]);

	const { apiTrigger } = useUpdateShipmentBookingConfirmationPreferences({ setStep, step });
	const SIMILAR_LENGTH = similarServiceIds.length;

	useEffect(() => {
		if (selectedCard.length === SIMILAR_LENGTH && step === ONE) {
			apiTrigger(selectedCard);
		}
	}, [selectedCard, SIMILAR_LENGTH, step, apiTrigger]);

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
						{(data?.list || []).map((item, idx) => (
							<Card
								key={keys?.[idx]}
								item={item}
								priority={item.priority}
								setStep={setStep}
								setSelectedCard={setSelectedCard}
								similarServiceIds={similarServiceIds}
								selectedCard={selectedCard}
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
								{(data?.list || []).map((item, idx) => (
									item?.service_id === service_id ? (
										<Card
											key={keys?.[idx]}
											item={item}
											priority={item.priority}
											setStep={setStep}
											setSelectedCard={setSelectedCard}
											similarServiceIds={similarServiceIds}
											selectedCard={selectedCard}
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
