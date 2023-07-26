import { Button, Select } from '@cogoport/components';
import {
	InputController,
	useForm,
} from '@cogoport/forms';
import React, { useEffect } from 'react';

import services from '../../../../../../../configurations/service-options';
import useCreateShipmentCapacities from '../../../../../../../hooks/useCreateShipmentCapacities';

import styles from './styles.module.css';

function ShipmentCapacities({ agentExperienceSlabs = [], configId = '', setActiveItem = () => {}, data = {} }) {
	const { loading, createShipmentCapacities } = useCreateShipmentCapacities({ setActiveItem });

	const { control, formState: { errors }, handleSubmit, reset, setValue } = useForm();

	useEffect(() => {
		const serviceWiseData = services?.map((service) => {
			const filteredData = data.shipment_capacities?.filter((item) => ((item.service_transit_type
				? `${item.service_type}_${item.service_transit_type}` : item.service_type) === service.value)) || [];

			return {
				service : service.value,
				data    : filteredData.sort((a, b) => a.slab_lower_limit - b.slab_lower_limit),
			};
		});

		serviceWiseData.forEach((item) => {
			const serviceValue = item.service;

			item.data.forEach((subItem, index) => {
				setValue(`${serviceValue}${index}`, subItem.shipment_capacity);
			});
		});
	}, [data, setValue]);

	return (
		<div key={loading} className={styles.container}>

			<h4>
				Set Active Shipment Capacity per Agent
				{' '}
				<span>(all inputs need to be filled before proceeding)</span>
			</h4>

			<div className={styles.header_card}>
				<div className={styles.label}>Service</div>

				<div className={styles.exp_container}>
					<div className={styles.title}>Active Shipment Capacity per Agent/Month</div>

					<div className={styles.slab_details}>
						{agentExperienceSlabs.map((item) => {
							const { slab_unit, slab_lower_limit, slab_upper_limit } = item;

							return (
								<div key={item.id} className={styles.item}>
									{slab_lower_limit}
									{(slab_upper_limit && slab_upper_limit != 99999) ? `-${slab_upper_limit} ` : ''}
									{' '}
									{slab_unit}
									s Exp.
								</div>
							);
						})}
					</div>
				</div>

				<div className={styles.trigger}>Release Trigger</div>

			</div>

			{services.map((service) => (
				<div className={styles.service_item} key={service.value}>

					<div className={styles.label}>{service.label}</div>

					<div className={styles.capacity_container}>

						{[...Array(agentExperienceSlabs.length).keys()].map((key) => (

							<div
								key={`${service.value}${key}`}
								className={styles.capacity_input}
							>
								<InputController
									name={`${service.value}${key}`}
									control={control}
									rules={{
										required: 'Required',
									}}
								/>

								{errors?.[`${service.value}${key}`]?.message
							&& (
								<p className={styles.err_msg}>
									{errors?.[`${service.value}${key}`]?.message}
								</p>
							)}

							</div>

						))}

					</div>

					<div className={styles.trigger}>
						<Select
							name={`${service.value}trigger`}
						/>
					</div>

				</div>
			))}

			<div className={styles.btn_container}>
				<Button
					size="md"
					themeType="secondary"
					className={styles.reset_btn}
					loading={loading}
					onClick={() => reset()}
				>
					Reset
				</Button>

				<Button
					size="md"
					themeType="primary"
					loading={loading}
					onClick={handleSubmit((values) => createShipmentCapacities({
						values,
						agentExperienceSlabs,
						configId,
					}))}
				>
					Save And Proceed
				</Button>
			</div>

		</div>
	);
}

export default ShipmentCapacities;
