import { Button } from '@cogoport/components';
import { InputController, MultiselectController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React, { forwardRef } from 'react';

import services from '../../../../../../../configurations/service-options';
import useShipmentCapacities from '../../../../../../../hooks/useShipmentCapacities';

import DEFAULT_RELEASE_TRIGGER_OPTION from './constants/default-trigger-option';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import getReleaseTriggerOptions from './utils/get-release-trigger-options';

const SLAB_UPPER_LIMIT_MAX = 99999;

const getUpperLimit = (slab_upper_limit, source) => {
	let result = '';

	if (slab_upper_limit && slab_upper_limit !== SLAB_UPPER_LIMIT_MAX) {
		result = `-${slab_upper_limit} `;
	} else if (source) result = '+';

	return result;
};

function ShipmentCapacities(props, ref) {
	const {
		agentExperienceSlabs = [],
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
	} = useShipmentCapacities({ data, setActiveItem, source });

	const handleClick = () => router.push('/centralised-customer-service?activeTab=shipment_capacity_config');

	return (
		<div className={styles.container} ref={ref}>

			{loading ? <LoadingState /> : (
				<>
					{source ? (
						<div className={styles.header}>
							<IcMArrowBack
								className={styles.back_icon}
								width={20}
								height={20}
								onClick={handleClick}
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
										<div key={item.slab_lower_limit} className={styles.item}>
											{slab_lower_limit}
											{getUpperLimit(slab_upper_limit, source)}
											{' '}
											{slab_unit}
											s Exp.
										</div>
									);
								})}
							</div>
						</div>

						<div className={styles.trigger}>Release Triggers</div>

					</div>

					{services.map((service) => {
						const releaseTriggerOptions = [...getReleaseTriggerOptions({ service }),
							DEFAULT_RELEASE_TRIGGER_OPTION];

						return (
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
												type="number"
												rules={{
													required: 'Required',
												}}
											/>

											{errors?.[`${key}-${service.value}`]?.message
												? (
													<p className={styles.err_msg}>
														{errors?.[`${key}-${service.value}`]?.message}
													</p>
												) : null}

										</div>

									))}

								</div>

								<div className={styles.trigger}>
									<MultiselectController
										name={`${service.value}-release_triggers`}
										control={control}
										options={releaseTriggerOptions}
										rules={{
											required: 'Required',
										}}
									/>

									{errors?.[`${service.value}-release_triggers`]?.message
										? (
											<p className={styles.err_msg}>
												{errors?.[`${service.value}-release_triggers`]?.message}
											</p>
										) : null}

								</div>

							</div>
						);
					})}

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

export default forwardRef(ShipmentCapacities);
