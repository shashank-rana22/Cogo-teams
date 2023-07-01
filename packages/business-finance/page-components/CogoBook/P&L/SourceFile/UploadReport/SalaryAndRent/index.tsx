import { Toast, Button } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import {
	getAgentsData,
	getAllShipment, getColumnSalary,
	getProjectData,
} from '../contant';
import EditIcon from '../RevenueBifurcation/EditIcon';

import styles from './styles.module.css';

interface SalaryInterface {
	refetchSalary?: () => Promise<void>
	globalStepper?: string
	setGlobalStepper?: React.Dispatch<React.SetStateAction<string>>
	setSalaryVolume?: React.Dispatch<React.SetStateAction<{}>>
	salaryVolume?: {}
	oceanSalaryData?: {
		name: string;
		value: string;
	}[]
	airSalaryData?: {
		name: string;
		value: string;
	}[]
	salaryVolumeAir?: {}
	setSalaryVolumeAir?: React.Dispatch<React.SetStateAction<{}>>
	surfaceSalaryData?: {
		name: string;
		value: string;
	}[]
	setSalaryVolumeSurface?: React.Dispatch<React.SetStateAction<{}>>
	salaryVolumeSurface?: {}
	railSalaryData?: {
		name: string;
		value: string;
	}[]
	salaryVolumeRail?: {}
	setSalaryVolumeRail?: React.Dispatch<React.SetStateAction<{}>>
	oceanSalaryDataValue?: {
		name: string;
		value: string;
	}[]
	salaryValue?: {}
	setSalaryValue?: React.Dispatch<React.SetStateAction<{}>>
	airSalaryDataValue?: {
		name: string;
		value: string;
	}[]
	salaryValueAir?: {}
	setSalaryValueAir?: React.Dispatch<React.SetStateAction<{}>>
	surfaceSalaryDataValue?: {
		name: string;
		value: string;
	}[]
	salaryValueSurface?: {}
	setSalaryValueSurface?: React.Dispatch<React.SetStateAction<{}>>
	railSalaryDataValue?: {
		name: string;
		value: string;
	}[]
	salaryValueRail: {}
	setSalaryValueRail?: React.Dispatch<React.SetStateAction<{}>>
	OceanSum?:boolean
	AirSum?:boolean
	SurfaceSum?:boolean,
	RailSum?:boolean,
	OceanSumValue?:boolean,
	SurfaceSumValue?:boolean,
	RailSumValue?:boolean,
	AirSumValue?:boolean,
}
function SalaryAndRent({
	globalStepper,
	OceanSum,
	AirSum,
	SurfaceSum,
	OceanSumValue,
	SurfaceSumValue,
	RailSumValue,
	AirSumValue,
	RailSum,
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
}:SalaryInterface) {
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
	const getStatus = (key) => {
		if (!OceanSum || !AirSum || !SurfaceSum || !RailSum ||	!OceanSumValue
			|| !SurfaceSumValue
			|| !RailSumValue
			|| !AirSumValue) {
			return Toast.error('All Values Are Equal To Total ');
		}
		return setEdit((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
	};
	const handleTickEdit = (key = '') => {
		getStatus(key);
	};

	return (
		<div>
			{ getColumnSalary.map((item) => {
				const { label = '', id = '', iconInfo, iconArrowUp, iconArrowDown } = item || {};
				return (
					<div className={styles.card} key={id}>
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
										<div className={styles.shipment_container} key={idData}>
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
																	onClick={() => { handleTickEdit(idData); }}
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

															<div key={valOcean?.name}>
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

															<div key={val?.name}>
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

															<div key={val?.name}>
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

															<div key={val?.name}>
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

															<div key={valOcean?.name}>
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

															<div key={valOcean?.name}>
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

															<div key={val?.name}>
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

															<div key={val?.name}>
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

															<div key={val?.name}>
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

															<div key={val?.name}>
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

															<div key={valOcean?.name}>
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

															<div key={valOcean?.name}>
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
