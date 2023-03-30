import { Button } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import {
	getAgentsData,
	getAllShipment, getColumnSalary,
	getProjectData,
} from '../contant';
import EditIcon from '../RevenueBifurcation/EditIcon';

import styles from './styles.module.css';

function SalaryAndRent({
	globalStepper,
	setGlobalStepper,
	oceanSalaryData, salaryVolume,
	setSalaryVolume, refetchSalary,
	airSalaryData,
	salaryVolumeAir,
	setSalaryVolumeAir,
	surfaceSalaryData,
	setSalaryVolumeSurface,
	salaryVolumeSurface,
	railSalaryData,
	salaryVolumeRail,
	setSalaryVolumeRail,
	oceanSalaryDataValue,
	setSalaryValue,
	salaryValue,
	airSalaryDataValue,
	salaryValueAir,
	setSalaryValueAir,
	surfaceSalaryDataValue,
	salaryValueSurface,
	setSalaryValueSurface,
	railSalaryDataValue,
	salaryValueRail,
	setSalaryValueRail,
}) {
	const [dropDownData, setDropDownData] = useState({});

	useEffect(() => { refetchSalary(); }, [refetchSalary]);

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
			{ getColumnSalary.map((item) => {
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
								{getAllShipment.map((itemShipment) => {
									const { label:labelData = '', id:idData, icon } = itemShipment || {};

									return (
										<div className={styles.shipment_container}>
											<div className={styles.header}>
												<div>{labelData}</div>
												{globalStepper === 'salaries'
														&&	(
															<div className={styles.icon_row}>
																<div
																	className={styles.icon_edit}
																	onClick={() => { handleEdit(idData); }}
																	role="presentation"
																>
																	{icon}

																</div>

																<div
																	onClick={() => { handleEdit(idData); }}
																	role="presentation"
																>
																	{edit[idData]
																	&& <IcMTick height="20px" width="20px" />}
																</div>

															</div>
														)}
											</div>

											<div className={styles.shipment_data}>
												{labelData === 'Ocean' && (
													<div className={styles.ocean}>
														{oceanSalaryData.map((valOcean, index) => (

															<div>
																<div className={styles.name}>
																	{valOcean?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setSalaryVolume}
																				valueData={valOcean?.value}
																				value={salaryVolume}
																			/>

																		) : valOcean?.value}
																</div>
															</div>

														))}
													</div>

												)}

												{labelData === 'Air' && 	(
													<div className={styles.ocean}>
														{airSalaryData.map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setSalaryVolumeAir}
																				valueData={val?.value}
																				value={salaryVolumeAir}
																			/>
																		) : val?.value}

																</div>
															</div>

														))}
													</div>
												)}

												{labelData === 'Surface' && 	(
													<div className={styles.ocean}>
														{surfaceSalaryData.map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setSalaryVolumeSurface}
																				valueData={val?.value}
																				value={salaryVolumeSurface}
																			/>
																		) : val?.value}
																</div>
															</div>

														))}
													</div>
												)}

												{labelData === 'Rail' && 	(
													<div className={styles.ocean}>
														{railSalaryData.map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setSalaryVolumeRail}
																				valueData={val?.value}
																				value={salaryVolumeRail}
																			/>
																		) : val?.value}
																</div>
															</div>

														))}
													</div>
												)}

												{labelData === 'Projects' && (
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

												{labelData === 'Agents' && 	(
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
									);
								})}
							</div>
						)}

						{dropDownData[id] && id === '2' && (
							<div className={styles.data_value}>
								{getAllShipment.map((itemShipment) => {
									const { label:labelValue = '', icon, id:idData } = itemShipment;

									return (
										<div className={styles.shipment_container}>
											<div className={styles.header}>
												<div>{labelValue}</div>
												{globalStepper === 'salaries'
														&&	(
															<div className={styles.icon_row}>
																<div
																	className={styles.icon_edit}
																	onClick={() => { handleEdit(idData); }}
																	role="presentation"
																>
																	{icon}

																</div>

																<div
																	onClick={() => { handleEdit(idData); }}
																	role="presentation"
																>
																	{edit[idData]
																	&& <IcMTick height="20px" width="20px" />}
																</div>

															</div>
														)}
											</div>

											<div className={styles.shipment_data}>
												{labelValue === 'Ocean' && (
													<div className={styles.ocean}>
														{oceanSalaryDataValue.map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setSalaryValue}
																				valueData={val?.value}
																				value={salaryValue}
																			/>

																		) : val?.value}
																</div>
															</div>

														))}
													</div>

												)}

												{labelValue === 'Air' && 	(
													<div className={styles.ocean}>
														{airSalaryDataValue.map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setSalaryValueAir}
																				valueData={val?.value}
																				value={salaryValueAir}
																			/>

																		) : val?.value}
																</div>
															</div>

														))}
													</div>
												)}

												{labelValue === 'Surface' && 	(
													<div className={styles.ocean}>
														{surfaceSalaryDataValue.map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setSalaryValueSurface}
																				valueData={val?.value}
																				value={salaryValueSurface}
																			/>

																		) : val?.value}
																</div>
															</div>

														))}
													</div>
												)}

												{labelValue === 'Rail' && 	(
													<div className={styles.ocean}>
														{railSalaryDataValue.map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setSalaryValueRail}
																				valueData={val?.value}
																				value={salaryValueRail}
																			/>

																		) : val?.value}
																</div>
															</div>

														))}
													</div>
												)}

												{labelValue === 'Projects' && (
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

												{labelValue === 'Agents' && 	(
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
									);
								})}
							</div>
						)}

					</div>
				);
			})}
			{globalStepper === 'salaries' &&		(
				<div
					className={styles.flex_button}
					onClick={() => {
						setGlobalStepper('review_details');
					}}
					role="presentation"
				>
					<Button>Save & Next </Button>

				</div>
			)}
		</div>
	);
}
export default SalaryAndRent;
