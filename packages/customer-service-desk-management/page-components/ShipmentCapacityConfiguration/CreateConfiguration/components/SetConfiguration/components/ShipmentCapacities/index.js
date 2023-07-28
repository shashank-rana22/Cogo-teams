import { Button, Select } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import services from '../../../../../../../configurations/service-options';
import useShipmentCapacities from '../../../../../../../hooks/useShipmentCapacities';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

const SLAB_UPPER_LIMIT_MAX = 99999;

function ShipmentCapacities(props) {
	const {
		agentExperienceSlabs = [], configId = '',
		setActiveItem = () => {}, data = {},
		routeLoading = false, source = '', loading = false, defaultSlabUnit = 'month',
	} = props;

	const router = useRouter();

	const {
		control = {},
		errors = {},
		handleSubmit = () => {},
		handleReset = () => {},
		createShipmentLoading = false,
		createShipmentCapacities = () => {},
	} = useShipmentCapacities({ data, setActiveItem });

	return (
		<div className={styles.container} id="shipment-capacities">

			{loading ? <LoadingState /> : (
				<>
					{source ? (
						<div className={styles.header}>
							<IcMArrowBack
								className={styles.back_icon}
								width={20}
								height={20}
								onClick={() => router.push('/customer-service-desk-management')}
							/>

							<div role="presentation" className={styles.header_title}>Back</div>
						</div>
					) : null}

					<h4>
						Set Active Shipment Capacity per Agent
						{' '}
						<span>(all inputs need to be filled before proceeding)</span>
					</h4>

					<div className={styles.header_card}>
						<div className={styles.label}>Service</div>

						<div className={styles.exp_container}>
							<div className={styles.title}>
								Active Shipment Capacity per Agent/
								{startCase(defaultSlabUnit)}
							</div>

							<div className={styles.slab_details}>
								{agentExperienceSlabs.map((item) => {
									const { slab_unit, slab_lower_limit, slab_upper_limit } = item;

									return (
										<div key={item.id} className={styles.item}>
											{slab_lower_limit}
											{(slab_upper_limit
												&& slab_upper_limit
												!== SLAB_UPPER_LIMIT_MAX) ? `-${slab_upper_limit} ` : ''}
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

							<div className={styles.capacity_container} key={agentExperienceSlabs}>

								{[...Array(agentExperienceSlabs.length).keys()].map((key) => (

									<div
										key={`${service.value}${key}`}
										className={styles.capacity_input}
									>
										<InputController
											name={`${key}-${service.value}`}
											control={control}
											rules={{
												required: 'Required',
											}}
										/>

										{errors?.[`${key}-${service.value}`]?.message
							&& (
								<p className={styles.err_msg}>
									{errors?.[`${key}-${service.value}`]?.message}
								</p>
							)}

									</div>

								))}

							</div>

							<div className={styles.trigger}>
								<Select
									name={`${service.value}trigger`}
									options={[
										{
											label : 'Mark shipment as complete',
											value : 'trigger',
										},
									]}
									value="trigger"
									disabled
								/>
							</div>

						</div>
					))}

					<div className={styles.btn_container}>
						<Button
							size="md"
							themeType="secondary"
							className={styles.reset_btn}
							loading={createShipmentLoading || routeLoading}
							onClick={handleReset}
						>
							Reset
						</Button>

						<Button
							size="md"
							themeType="primary"
							loading={createShipmentLoading || routeLoading}
							onClick={handleSubmit((values) => createShipmentCapacities({
								values,
								agentExperienceSlabs,
								configId,
							}))}
						>
							{source ? 'Save' : 'Save And Proceed'}
						</Button>
					</div>
				</>
			)}

		</div>
	);
}

export default ShipmentCapacities;
