import { Button } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useUpdateShipmentBookingConfirmationPreferences from
	'../../../../../../hooks/useUpdateShipmentBookingConfirmationPreferences';

import cardValues from './cardValues';
import styles from './styles.module.css';

function Card({
	item, priority, similarServiceIds,
	selectedCard,
	setSelectedCard, handleUpdateTask,
}) {
	const ONE = 1;
	const dataArr = Array.isArray(item?.data) ? item?.data : [item?.data];
	const [serviceProvider, setServiceProvider] = useState(
		item?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.service_provider_id,
	);

	const { apiTrigger } = useUpdateShipmentBookingConfirmationPreferences({ handleUpdateTask });

	const onSubmit = async () => {
		setSelectedCard([...selectedCard, { ...item, serviceProvider }]);
		if (selectedCard.length >= similarServiceIds.length - ONE) {
			await apiTrigger([...selectedCard, { ...item, serviceProvider }]);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<div className={styles.priority_text}>
					(
					{priority}
					&nbsp;
					Priority)
					&nbsp;
				</div>
				<div>
					{`${startCase(dataArr?.[GLOBAL_CONSTANTS.zeroth_index]?.source)} Booking Note`}
				</div>
			</div>
			<div className={styles.space_between}>
				{(dataArr || []).map((dataObj) => cardValues(dataObj, item)?.map((eachItem) => (
					<div className={styles.item} key={eachItem?.id}>
						<div className={styles.heading}>{eachItem?.label}</div>
						<div className={styles.sub_heading}>{eachItem?.value}</div>
					</div>
				)))}
			</div>

			<div className={styles.text}>Choose Service Provider (Fcl Freight Local)</div>

			<AsyncSelect
				name="id"
				asyncKey="organizations"
				valueKey="id"
				initialCall={false}
				onChange={(sp) => setServiceProvider(sp)}
				value={serviceProvider}
				placeholder="Select Service Provider"
				size="sm"
			/>

			<div className={styles.button_wrap}>
				<Button
					size="sm"
					onClick={() => onSubmit()}
					disabled={(selectedCard || []).find((service) => item.service_id === service.service_id)}
				>
					{selectedCard.length
						=== (similarServiceIds.length - ONE) ? 'Proceed With Preference' : 'Save This Preference'}
				</Button>
			</div>
		</div>
	);
}

export default Card;
