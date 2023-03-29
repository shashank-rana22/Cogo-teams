import { Button } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { useState } from 'react';

import {
	getAgentsData,
	getAirData, getAirDataValue, getAllShipment, getColumn, getOceanData,
	getOceanDataValue,
	getProjectData, getRailData, getRailDataValue, getSurfaceData, getSurfaceDataValue,
} from '../contant';
import EditIcon from '../RevenueBifurcation/EditIcon';

import styles from './styles.module.css';

function Review({ setGlobalStepper, sourceFileData }) {
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
	const [volume, setVolume] = useState({});
	const [volumeAir, setVolumeAir] = useState({});
	const [volumeSurface, setVolumeSurface] = useState({});
	const [volumeRail, setVolumeRail] = useState({});

	const [value, setValue] = useState({});
	const [valueAir, setValueAir] = useState({});
	const [valueSurface, setValueSurface] = useState({});
	const [valueRail, setValueRail] = useState({});

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
								{getAllShipment.map((itemShipment) => {
									const { label:labelData = '', id:idData, icon } = itemShipment || {};

									return (
										<div className={styles.shipment_container}>
											<div className={styles.header}>
												<div>{labelData}</div>
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
														{edit[idData] && <IcMTick height="20px" width="20px" />}
													</div>

												</div>
											</div>

											<div className={styles.shipment_data}>
												{labelData === 'Ocean' && (
													<div className={styles.ocean}>
														{getOceanData(
															sourceFileData,
															volume,
															volumeAir,
															volumeSurface,
															volumeRail,
														).map((valOcean, index) => (

															<div>
																<div className={styles.name}>
																	{valOcean?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setVolume}
																				valueData={valOcean?.value}
																				value={volume}
																			/>

																		) : valOcean?.value}
																</div>
															</div>

														))}
													</div>

												)}

												{labelData === 'Air' && 	(
													<div className={styles.ocean}>
														{getAirData(
															sourceFileData,
															volume,
															volumeAir,
															volumeSurface,
															volumeRail,
														).map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setVolumeAir}
																				valueData={val?.value}
																				value={volumeAir}
																			/>
																		) : val?.value}

																</div>
															</div>

														))}
													</div>
												)}

												{labelData === 'Surface' && 	(
													<div className={styles.ocean}>
														{getSurfaceData(
															sourceFileData,
															volume,
															volumeAir,
															volumeSurface,
															volumeRail,
														).map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setVolumeSurface}
																				valueData={val?.value}
																				value={volumeSurface}
																			/>
																		) : val?.value}
																</div>
															</div>

														))}
													</div>
												)}

												{labelData === 'Rail' && 	(
													<div className={styles.ocean}>
														{getRailData(
															sourceFileData,
															volume,
															volumeAir,
															volumeSurface,
															volumeRail,
														).map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setVolumeRail}
																				valueData={val?.value}
																				value={volumeRail}
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
														{edit[idData] && <IcMTick height="20px" width="20px" />}
													</div>

												</div>
											</div>

											<div className={styles.shipment_data}>
												{labelValue === 'Ocean' && (
													<div className={styles.ocean}>
														{getOceanDataValue(
															sourceFileData,
															value,
															valueAir,
															valueSurface,
															valueRail,
														).map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setValue}
																				valueData={val?.value}
																				value={value}
																			/>

																		) : val?.value}
																</div>
															</div>

														))}
													</div>

												)}

												{labelValue === 'Air' && 	(
													<div className={styles.ocean}>
														{getAirDataValue(
															sourceFileData,
															value,
															valueAir,
															valueSurface,
															valueRail,
														).map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setValueAir}
																				valueData={val?.value}
																				value={valueAir}
																			/>

																		) : val?.value}
																</div>
															</div>

														))}
													</div>
												)}

												{labelValue === 'Surface' && 	(
													<div className={styles.ocean}>
														{getSurfaceDataValue(
															sourceFileData,
															value,
															valueAir,
															valueSurface,
															valueRail,
														).map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setValueSurface}
																				valueData={val?.value}
																				value={valueSurface}
																			/>

																		) : val?.value}
																</div>
															</div>

														))}
													</div>
												)}

												{labelValue === 'Rail' && 	(
													<div className={styles.ocean}>
														{getRailDataValue(
															sourceFileData,
															value,
															valueAir,
															valueSurface,
															valueRail,
														).map((val, index) => (

															<div>
																<div className={styles.name}>
																	{val?.name}
																</div>
																<div className={styles.value}>
																	{edit[idData]
																		? (
																			<EditIcon
																				index={index}
																				setValue={setValueRail}
																				valueData={val?.value}
																				value={valueRail}
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
			<div className={styles.flex_button} onClick={() => { setGlobalStepper('salaries'); }} role="presentation">
				<Button>Save & Next </Button>

			</div>
		</div>
	);
}
export default Review;
