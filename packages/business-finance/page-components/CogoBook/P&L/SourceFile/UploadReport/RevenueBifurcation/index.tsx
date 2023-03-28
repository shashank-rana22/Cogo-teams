import { Input, Button } from '@cogoport/components';
import { useState } from 'react';

import {
	getAgentsData,
	getAirData, getAllShipment, getColumn, getOceanData,
	getProjectData, getRailData, getSurfaceData,
} from '../contant';

import styles from './styles.module.css';

function RevenueBifurcation({ setGlobalStepper }) {
	const [dropDownData, setDropDownData] = useState({});
	const [edit, setEdit] = useState({});
	const handleDropdown = (key = '') => {
		setDropDownData((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
	};

	const handleEdit = (key = '') => {
		setEdit((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
	};

	return (
		<div>
			{ getColumn.map((item) => {
				const { label = '', id = '', iconInfo, iconArrowUp, iconArrowDown } = item || {};
				return (
					<div className={styles.card}>
						<div
							className={dropDownData[id] ? styles.card_data_enter : styles.card_data}
							onClick={() => { handleDropdown(id); }}
							role="presentation"
						>
							<div className={styles.flex_header}>
								<div>{label}</div>

								<div className={styles.icon_info}>{iconInfo}</div>

							</div>

							<div className={styles.icon}>{dropDownData[id] ? iconArrowUp : iconArrowDown}</div>

						</div>
						{dropDownData[id] && id === '1' && (
							<div className={styles.data_value}>
								{getAllShipment.map((itemShipment) => (
									<div className={styles.shipment_container}>
										<div className={styles.header}>
											<div>{itemShipment?.label}</div>
											<div
												className={styles.icon_edit}
												onClick={() => { handleEdit(itemShipment?.id); }}
												role="presentation"
											>
												{itemShipment?.icon}

											</div>
										</div>

										<div className={styles.shipment_data}>
											{itemShipment?.label === 'Ocean' && (
												<div className={styles.ocean}>
													{getOceanData.map((valOcean) => (

														<div>
															<div className={styles.name}>
																{valOcean?.name}
															</div>
															<div className={styles.value}>
																{edit[itemShipment?.id]
																	? (
																		<Input
																			value={valOcean?.value}
																			placeholder="Type"
																		/>
																	) : valOcean?.value}
															</div>
														</div>

													))}
												</div>

											)}

											{itemShipment?.label === 'Air' && 	(
												<div className={styles.ocean}>
													{getAirData.map((valOcean) => (

														<div>
															<div className={styles.name}>
																{valOcean?.name}
															</div>
															<div className={styles.value}>
																{edit[itemShipment?.id]
																	? (
																		<Input
																			value={valOcean?.value}
																			placeholder="Type"
																		/>
																	) : valOcean?.value}

															</div>
														</div>

													))}
												</div>
											)}

											{itemShipment?.label === 'Surface' && 	(
												<div className={styles.ocean}>
													{getSurfaceData.map((valOcean) => (

														<div>
															<div className={styles.name}>
																{valOcean?.name}
															</div>
															<div className={styles.value}>
																{edit[itemShipment?.id]
																	? (
																		<Input
																			value={valOcean?.value}
																			placeholder="Type"
																		/>
																	) : valOcean?.value}
															</div>
														</div>

													))}
												</div>
											)}

											{itemShipment?.label === 'Rail' && 	(
												<div className={styles.ocean}>
													{getRailData.map((valOcean) => (

														<div>
															<div className={styles.name}>
																{valOcean?.name}
															</div>
															<div className={styles.value}>
																{edit[itemShipment?.id]
																	? (
																		<Input
																			value={valOcean?.value}
																			placeholder="Type"
																		/>
																	) : valOcean?.value}
															</div>
														</div>

													))}
												</div>
											)}

											{itemShipment?.label === 'Projects' && (
												<div className={styles.ocean}>
													{getProjectData.map((valOcean) => (

														<div>
															<div className={styles.name}>
																{valOcean?.name}
															</div>
															<div className={styles.value}>
																{edit[itemShipment?.id]
																	? (
																		<Input
																			value={valOcean?.value}
																			placeholder="Type"
																		/>
																	) : valOcean?.value}
															</div>
														</div>

													))}
												</div>
											)}

											{itemShipment?.label === 'Agents' && 	(
												<div className={styles.ocean}>
													{getAgentsData.map((valOcean) => (

														<div>
															<div className={styles.name}>
																{valOcean?.name}
															</div>
															<div className={styles.value}>
																{edit[itemShipment?.id]
																	? (
																		<Input
																			value={valOcean?.value}
																			placeholder="Type"
																		/>
																	) : valOcean?.value}
															</div>
														</div>

													))}
												</div>
											)}

										</div>
									</div>
								))}
							</div>
						)}

						{dropDownData[id] && id === '2' && (
							<div className={styles.data_value}>
								{getAllShipment.map((itemShipment) => (
									<div className={styles.shipment_container}>
										<div className={styles.header}>
											<div>{itemShipment?.label}</div>
											<div className={styles.icon_edit}>{itemShipment?.icon}</div>
										</div>

										<div className={styles.shipment_data}>
											{itemShipment?.label === 'Ocean' && (
												<div className={styles.ocean}>
													{getOceanData.map((valOcean) => (

														<div>
															<div className={styles.name}>
																{valOcean?.name}
															</div>
															<div className={styles.value}>
																{valOcean?.value}
															</div>
														</div>

													))}
												</div>

											)}

											{itemShipment?.label === 'Air' && 	(
												<div className={styles.ocean}>
													{getAirData.map((valOcean) => (

														<div>
															<div className={styles.name}>
																{valOcean?.name}
															</div>
															<div className={styles.value}>
																{valOcean?.value}
															</div>
														</div>

													))}
												</div>
											)}

											{itemShipment?.label === 'Surface' && 	(
												<div className={styles.ocean}>
													{getSurfaceData.map((valOcean) => (

														<div>
															<div className={styles.name}>
																{valOcean?.name}
															</div>
															<div className={styles.value}>
																{valOcean?.value}
															</div>
														</div>

													))}
												</div>
											)}

											{itemShipment?.label === 'Rail' && 	(
												<div className={styles.ocean}>
													{getRailData.map((valOcean) => (

														<div>
															<div className={styles.name}>
																{valOcean?.name}
															</div>
															<div className={styles.value}>
																{valOcean?.value}
															</div>
														</div>

													))}
												</div>
											)}

											{itemShipment?.label === 'Projects' && (
												<div className={styles.ocean}>
													{getProjectData.map((valOcean) => (

														<div>
															<div className={styles.name}>
																{valOcean?.name}
															</div>
															<div className={styles.value}>
																{valOcean?.value}
															</div>
														</div>

													))}
												</div>
											)}

											{itemShipment?.label === 'Agents' && 	(
												<div className={styles.ocean}>
													{getAgentsData.map((valOcean) => (

														<div>
															<div className={styles.name}>
																{valOcean?.name}
															</div>
															<div className={styles.value}>
																{valOcean?.value}
															</div>
														</div>

													))}
												</div>
											)}

										</div>
									</div>
								))}
							</div>
						)}

					</div>
				);
			})}
			<div className={styles.flex_button} onClick={() => { setGlobalStepper('salaries'); }} role="presentation">
				<Button>Save & Next </Button>

			</div>
		</div>
	);
}
export default RevenueBifurcation;
