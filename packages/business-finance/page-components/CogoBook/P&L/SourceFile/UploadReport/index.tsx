import { Breadcrumb, Tooltip, Stepper } from '@cogoport/components';
import { IcMInfo, IcMArrowBack } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useEffect, useMemo, useState } from 'react';

import useReportFile from '../../../hooks/useReportFile';
import useSalary from '../../../hooks/useSalary';
import { monthNames } from '../utils';

import {
	getAirData, getAirDataValue, getOceanData,
	getOceanDataValue,
	getRailData,
	getRailDataValue,
	getRailSalaryData,
	getSalaryAirData,
	getSalaryAirDataValue,
	getSalaryOceanData,
	getSalaryOceanDataValue,
	getSalarySurfaceData,
	getSalarySurfaceDataValue,
	getSurfaceData,
	getSurfaceDataValue,
	stepperItems,
} from './contant';
import RevenueBifurcation from './RevenueBifurcation';
import Review from './Review';
import SalaryAndRent from './SalaryAndRent';
import styles from './styles.module.css';

function UploadReport() {
	const [globalStepper, setGlobalStepper] = useState('revenue');
	const { query, push } = useRouter();
	const { refetch, sourceFileData } = useReportFile({ query });
	const [volume, setVolume] = useState({});
	const [volumeAir, setVolumeAir] = useState({});
	const [volumeSurface, setVolumeSurface] = useState({});
	const [volumeRail, setVolumeRail] = useState({});

	const [value, setValue] = useState({});
	const [valueAir, setValueAir] = useState({});
	const [valueSurface, setValueSurface] = useState({});
	const [valueRail, setValueRail] = useState({});

	const [salaryVolume, setSalaryVolume] = useState({});
	const [salaryVolumeAir, setSalaryVolumeAir] = useState({});
	const [salaryVolumeSurface, setSalaryVolumeSurface] = useState({});
	const [salaryVolumeRail, setSalaryVolumeRail] = useState({});

	const [salaryValue, setSalaryValue] = useState({});
	const [salaryValueAir, setSalaryValueAir] = useState({});
	const [salaryValueSurface, setSalaryValueSurface] = useState({});
	const [salaryValueRail, setSalaryValueRail] = useState({});

	const { refetch:refetchSalary, salaryData } = useSalary();

	const { month, entity } = query || {};

	const date = new Date(month);

	const year = date.getFullYear();
	const monthVal = monthNames[date.getMonth()];

	useEffect(() => { refetch(); }, [refetch]);

	const { ocean, air, surface, rail } = sourceFileData?.data || {};

	const {
		fclImportVolume, fclExportVolume,
		lclImportVolume, lclExportVolume,
		oceanCustomVolume, totalVolume,
		fclImportValue, fclExportValue,
		lclImportValue, lclExportValue,
		oceanCustomValue, totalValue,
	} = ocean || {};

	const {
		totalAirVolume,
		airExportVolume, airImportVolume,
		airCustomVolume,
		totalAirValue,
		airExportValue, airImportValue,
		airCustomValue,
	} = air || {};

	const {
		ltlVolume, ftlVolume,
		totalSurfaceVolume,
		totalSurfaceValue,
		ltlValue, ftlValue,
	} = surface || {};

	const { railDomesticVolume, railDomesticValue } = rail || {};

	const OceanSum = Number(volume[0] || salaryVolume[0] || totalVolume)
	===	(Number(volume[1] || salaryVolume[1] || fclExportVolume)
	+ Number(volume[2] || salaryVolume[2] || fclImportVolume)
	+ Number(volume[3] || salaryVolume[3] || lclExportVolume)
	+ Number(volume[4] || salaryVolume[4] || lclImportVolume)
	+ Number(volume[5] || salaryVolume[5] || oceanCustomVolume));

	const AirSum = Number(volumeAir[0] || salaryVolumeAir[0] || totalAirVolume)
	===	(Number(volumeAir[1] || salaryVolumeAir[1] || airExportVolume)
	+ Number(volumeAir[2] || salaryVolumeAir[2] || airImportVolume)
	+ Number(volumeAir[3] || salaryVolumeAir[3] || airCustomVolume));

	const SurfaceSum = Number(volumeSurface[0] || salaryVolumeSurface[0] || totalSurfaceVolume)
	=== (Number(volumeSurface[1] || salaryVolumeSurface[1] || ftlVolume)
	+ Number(volumeSurface[2] || salaryVolumeSurface[2] || ltlVolume));

	const RailSum = Number(volumeRail[1] || salaryVolumeRail[1] || railDomesticVolume)
	=== (volumeRail[0] || salaryVolumeRail[0] || railDomesticVolume);

	// This is for shipment volume

	const Total = (volume[0] || salaryVolume[0] || totalVolume) + (volumeAir[0] || salaryVolumeAir[0] || totalAirVolume)
	+ (volumeSurface[0] || salaryVolumeSurface[0] || totalSurfaceVolume) + (volumeRail[0]
		|| salaryVolumeRail[0] || railDomesticVolume);

	const totalVolumePer = Total === 0 ? 0 : ((volume[0] || salaryVolume[0] || totalVolume) / Total) * 100;
	const fclExportVolumePer = totalVolume === 0 ? 0 : ((volume[1] || salaryVolume[1] || fclExportVolume) / (volume[0]
		|| salaryVolume[0] || totalVolume)) * 100;

	const fclImportVolumePer = totalVolume === 0 ? 0 : ((volume[2] || salaryVolume[2] || fclImportVolume) / (volume[0]
		|| salaryVolume[0] || totalVolume)) * 100;

	const lclExportVolumePer = totalVolume === 0 ? 0 : ((volume[3] || salaryVolume[3] || lclExportVolume) / (volume[0]
		|| salaryVolume[0] || totalVolume)) * 100;

	const lclImportVolumePer = totalVolume === 0 ? 0 : ((volume[4] || salaryVolume[4] || lclImportVolume) / (volume[0]
		|| salaryVolume[0] || totalVolume)) * 100;

	const oceanCustomVolumePer = totalVolume === 0 ? 0 : ((volume[5] || salaryVolume[5]
		|| oceanCustomVolume) / (volume[0] || salaryVolume[0] || totalVolume)) * 100;

	const totalPer = Total === 0 ? 0 : ((volumeAir[0] || salaryVolumeAir[0] || totalAirVolume) / Total) * 100;

	const airExportVolumePer = totalAirVolume === 0 ? 0 : ((volumeAir[1] || salaryVolumeAir[1] || airExportVolume)
	/ (volumeAir[0] || salaryVolumeAir[0] || totalAirVolume)) * 100;

	const airImportVolumePer = totalAirVolume === 0 ? 0 : ((volumeAir[2] || salaryVolumeAir[2] || airImportVolume)
	/ (volumeAir[0] || salaryVolumeAir[0] || totalAirVolume)) * 100;

	const airCustomVolumePer = totalAirVolume === 0 ? 0 : ((volumeAir[3] || salaryVolumeAir[3] || airCustomVolume)
	/ (volumeAir[0] || salaryVolumeAir[0] || totalAirVolume)) * 100;

	const totalPerSurface = Total === 0 ? 0
		: ((volume[0] || salaryVolumeSurface[0] || totalSurfaceVolume) / Total) * 100;

	const FTLVolumePer = totalSurfaceVolume === 0 ? 0 : ((volumeSurface[1] || salaryVolumeSurface[1] || ftlVolume)
	/ (volumeSurface[0] || salaryVolumeSurface[0] || totalSurfaceVolume)) * 100;

	const LTLVolumePer = totalSurfaceVolume === 0 ? 0 : ((volumeSurface[2] || salaryVolumeSurface[2] || ltlVolume)
	/ (volumeSurface[0] || salaryVolumeSurface[0] || totalSurfaceVolume)) * 100;

	const totalPerRail = Total === 0 ? 0 : ((volumeRail[0] || salaryVolumeRail[0] || railDomesticVolume) / Total) * 100;

	const railVolumePer = railDomesticVolume === 0 ? 0 : ((volumeRail[0] || salaryVolumeRail[0] || railDomesticVolume)
	/ (volumeRail[1] || salaryVolumeRail[1] || railDomesticVolume)) * 100;

	// This is for shipment value

	const OceanSumValue = Number(value[0] || salaryValue[0] || totalValue)
	===	(Number(value[1] || salaryValue[1] || fclExportValue)
	+ Number(value[2] || salaryValue[2] || fclImportValue)
	+ Number(value[3] || salaryValue[3] || lclExportValue)
	+ Number(value[4] || salaryValue[4] || lclImportValue)
	+ Number(value[0] || salaryValue[0] || totalValue));

	const AirSumValue = Number(valueAir[0] || salaryValueAir[0] || totalAirValue)
	===	(Number(valueAir[1] || salaryValueAir[1] || airExportValue)
	+ Number(valueAir[2] || salaryValueAir[2] || airImportValue)
	+ Number(valueAir[3] || salaryValueAir[3] || airCustomValue));

	const SurfaceSumValue = Number(valueSurface[0] || salaryValueSurface[0] || totalSurfaceValue)
	=== (Number(valueSurface[1] || salaryValueSurface[1] || ftlValue)
	+ Number(valueSurface[2] || salaryValueSurface[2] || ltlValue));

	const RailSumValue = Number(valueRail[0] || salaryValueRail[0] || railDomesticValue)
	=== (valueRail[0] || salaryValueRail[0] || railDomesticValue);

	const TotalValue = (value[0] || salaryValue[0] || totalValue) + (valueAir[0] || salaryValueAir[0] || totalAirValue)
	+ (valueSurface[0] || salaryValueSurface[0] || totalSurfaceValue) + (valueRail[0]
		|| salaryValueRail[0] || railDomesticValue);

	const totalPerOcean = TotalValue === 0 ? 0 : ((value[0] || salaryValue[0] || totalValue) / TotalValue) * 100;

	const fclExportValuePer = totalValue === 0 ? 0 : ((value[1] || salaryValue[1] || fclExportValue)
	/ (value[0] || salaryValue[0] || totalValue)) * 100;

	const fclImportValuePer = totalValue === 0 ? 0 : ((value[2] || salaryValue[2] || fclImportValue)
	/ (value[0] || salaryValue[0] || totalValue)) * 100;

	const lclExportValuePer = totalValue === 0 ? 0 : ((value[3] || salaryValue[3] || lclExportValue)
	/ (value[0] || salaryValue[0] || totalValue)) * 100;

	const lclImportValuePer = totalValue === 0 ? 0 : ((value[4] || salaryValue[4] || lclImportValue)
	/ (value[0] || salaryValue[0] || totalValue)) * 100;

	const oceanCustomValuePer = totalValue === 0 ? 0 : ((value[5] || salaryValue[5] || oceanCustomValue)
	/ (value[0] || salaryValue[0] || totalValue)) * 100;

	const totalPerAir = TotalValue === 0 ? 0 : ((valueAir[0] || salaryValueAir[0] || totalAirValue) / TotalValue) * 100;

	const airExportValuePer = totalAirValue === 0 ? 0 : ((valueAir[1] || salaryValueAir[1] || airExportValue)
	/ (valueAir[0] || salaryValueAir[0] || totalAirValue)) * 100;

	const airImportValuePer = totalAirValue === 0 ? 0 : ((valueAir[2] || salaryValueAir[2] || airImportValue)
	/ (valueAir[0] || salaryValueAir[0] || totalAirValue)) * 100;

	const airCustomValuePer = totalAirValue === 0 ? 0 : ((valueAir[3] || salaryValueAir[3] || airCustomValue)
	/ (valueAir[0] || salaryValueAir[0] || totalAirValue)) * 100;

	const totalPerValueSurface = TotalValue === 0 ? 0
		: ((valueSurface[0] || salaryValueSurface[0] || totalSurfaceValue) / TotalValue) * 100;

	const FTLValuePer = totalSurfaceValue === 0 ? 0
		: ((valueSurface[1] || salaryValueSurface[1] || ftlValue)
	/ (valueSurface[0] || salaryValueSurface[0] || totalSurfaceValue)) * 100;

	const LTLValuePer = totalSurfaceValue === 0 ? 0 : ((valueSurface[2] || salaryValueSurface[2] || ltlValue)
	/ (valueSurface[0] || salaryValueSurface[0] || totalSurfaceValue)) * 100;

	const totalPerRailValue = TotalValue === 0 ? 0
		: ((valueRail[0] || salaryValueRail[0] || railDomesticValue) / TotalValue) * 100;

	const railValuePer = railDomesticValue === 0 ? 0 : ((valueRail[0] || salaryValueRail[0] || railDomesticValue)
	/ (valueRail[1] || salaryValueRail[1] || railDomesticValue)) * 100;

	// These functions Are for Shipment Volume

	const oceanData = useMemo(() => getOceanData(
		totalVolumePer,
		fclExportVolumePer,
		fclImportVolumePer,
		lclExportVolumePer,
		lclImportVolumePer,
		oceanCustomVolumePer,
		totalVolume,
		fclExportVolume,
		fclImportVolume,
		lclExportVolume,
		lclImportVolume,
		oceanCustomVolume,
		volume,
	), [fclExportVolume, fclExportVolumePer, fclImportVolume,
		fclImportVolumePer, lclExportVolume,
		lclExportVolumePer, lclImportVolume, lclImportVolumePer,
		oceanCustomVolume, oceanCustomVolumePer, totalVolume, totalVolumePer, volume]);

	const airData = useMemo(() => getAirData(
		totalAirVolume,
		airExportVolume,
		volumeAir,
		airImportVolume,
		airCustomVolume,
		totalPer,
		airExportVolumePer,
		airImportVolumePer,
		airCustomVolumePer,
	), [airCustomVolume, airCustomVolumePer,
		airExportVolume, airExportVolumePer, airImportVolume, airImportVolumePer, totalAirVolume, totalPer, volumeAir]);

	const surfaceData = useMemo(() => getSurfaceData(
		totalSurfaceVolume,
		ftlVolume,
		ltlVolume,
		volumeSurface,
		totalPerSurface,
		FTLVolumePer,
		LTLVolumePer,
	), [FTLVolumePer, LTLVolumePer, ftlVolume, ltlVolume, totalPerSurface, totalSurfaceVolume, volumeSurface]);

	const railData = useMemo(() => getRailData(
		railDomesticVolume,
		totalPerRail,
		railVolumePer,
		volumeRail,
	), [railDomesticVolume, railVolumePer, totalPerRail, volumeRail]);

	// This functions Are for Shipment Value

	const oceanValueData = useMemo(() => getOceanDataValue(
		totalPerOcean,
		value,
		totalValue,
		fclExportValue,
		fclImportValue,
		lclExportValue,
		lclImportValue,
		oceanCustomValue,
		fclExportValuePer,
		fclImportValuePer,
		lclExportValuePer,
		oceanCustomValuePer,
		lclImportValuePer,
	), [fclExportValue, fclExportValuePer,
		fclImportValue, fclImportValuePer, lclExportValue,
		lclExportValuePer, lclImportValue, lclImportValuePer, oceanCustomValue,
		oceanCustomValuePer, totalPerOcean, totalValue, value]);

	const airValueData = useMemo(() => getAirDataValue(
		totalPerAir,
		totalAirValue,
		valueAir,
		airExportValue,
		airExportValuePer,
		airImportValue,
		airImportValuePer,
		airCustomValue,
		airCustomValuePer,
	), [airCustomValue, airCustomValuePer, airExportValue,
		airExportValuePer, airImportValue, airImportValuePer, totalAirValue, totalPerAir, valueAir]);

	const surfaceValueData = useMemo(() => getSurfaceDataValue(
		totalSurfaceValue,
		totalPerValueSurface,
		FTLValuePer,
		ftlValue,
		valueSurface,
		ltlValue,
		LTLValuePer,
	), [FTLValuePer, LTLValuePer, ftlValue, ltlValue, totalPerValueSurface, totalSurfaceValue, valueSurface]);

	const railValueData = useMemo(() => getRailDataValue(
		totalPerRailValue,
		railDomesticValue,
		railValuePer,
		valueRail,
	), [railDomesticValue, railValuePer, totalPerRailValue, valueRail]);

	// This functions Are for Salary Volume/Value

	const totalSalaryOcean = totalVolumePer * salaryData;
	const fclExportSalaryVolume = totalSalaryOcean * fclExportVolumePer;
	const fclImportSalaryVolume = totalSalaryOcean * fclImportVolumePer;
	const lclExportSalaryVolume = totalSalaryOcean * lclExportVolumePer;
	const oceanCustomSalaryVolume = totalSalaryOcean * oceanCustomVolumePer;
	const lclImportSalaryVolume = totalSalaryOcean * lclImportVolumePer;

	const oceanSalaryData = useMemo(() => getSalaryOceanData(
		totalSalaryOcean,
		totalVolumePer,
		fclExportVolumePer,
		fclImportVolumePer,
		lclExportVolumePer,
		lclImportVolumePer,
		oceanCustomVolumePer,
		fclExportSalaryVolume,
		fclImportSalaryVolume,
		lclExportSalaryVolume,
		oceanCustomSalaryVolume,
		lclImportSalaryVolume,
		salaryVolume,
	), [fclExportSalaryVolume, fclExportVolumePer,
		fclImportSalaryVolume, fclImportVolumePer, lclExportSalaryVolume,
		lclExportVolumePer, lclImportSalaryVolume, lclImportVolumePer,
		oceanCustomSalaryVolume, oceanCustomVolumePer, totalSalaryOcean, totalVolumePer, salaryVolume]);

	// Salary Value Ocean

	const totalSalaryOceanValue = totalPerOcean * salaryData;
	const fclExportSalaryValue = totalSalaryOceanValue * fclExportValuePer;
	const fclImportSalaryValue = totalSalaryOceanValue * fclImportValuePer;
	const lclExportSalaryValue = totalSalaryOceanValue * lclExportValuePer;
	const oceanCustomSalaryValue = totalSalaryOceanValue * oceanCustomValuePer;
	const lclImportSalaryValue = totalSalaryOceanValue * lclImportValuePer;

	const oceanSalaryDataValue = useMemo(() => getSalaryOceanDataValue(
		totalSalaryOceanValue,
		totalPerOcean,
		fclExportValuePer,
		fclImportValuePer,
		lclExportValuePer,
		lclImportValuePer,
		oceanCustomVolumePer,
		fclExportSalaryValue,
		fclImportSalaryValue,
		lclExportSalaryValue,
		oceanCustomSalaryValue,
		lclImportSalaryValue,
		salaryValue,
	), [totalSalaryOceanValue, totalPerOcean, fclExportValuePer, fclImportValuePer,
		lclExportValuePer, lclImportValuePer, oceanCustomVolumePer, fclExportSalaryValue,
		fclImportSalaryValue, lclExportSalaryValue, oceanCustomSalaryValue, lclImportSalaryValue, salaryValue]);

	// Salary Volume Air

	const totalSalaryAirVolume = totalPer * salaryData;
	const airSalaryExportVolume = airExportVolumePer * totalSalaryAirVolume;
	const airSalaryImportVolume = airImportVolumePer * totalSalaryAirVolume;
	const airCustomImportVolume = airCustomVolumePer * totalSalaryAirVolume;

	const airSalaryData = useMemo(() => getSalaryAirData(
		totalSalaryAirVolume,
		airSalaryExportVolume,
		salaryVolumeAir,
		airSalaryImportVolume,
		airCustomImportVolume,
		totalPer,
		airExportVolumePer,
		airImportVolumePer,
		airCustomVolumePer,
	), [totalSalaryAirVolume, airSalaryExportVolume,
		salaryVolumeAir, airSalaryImportVolume, airCustomImportVolume, totalPer,
		airExportVolumePer, airImportVolumePer, airCustomVolumePer]);

	// Salary Value Air

	const totalSalaryAirValue = totalPerAir * salaryData;
	const airSalaryExportValue = airExportValuePer * totalSalaryAirValue;
	const airSalaryImportValue = airImportValuePer * totalSalaryAirValue;
	const airCustomImportValue = airCustomValuePer * totalSalaryAirValue;

	const airSalaryDataValue = useMemo(() => getSalaryAirDataValue(
		totalSalaryAirValue,
		airSalaryExportValue,
		salaryValueAir,
		airSalaryImportValue,
		airCustomImportValue,
		totalPerAir,
		airExportValuePer,
		airImportValuePer,
		airCustomValuePer,
	), [totalSalaryAirValue, airSalaryExportValue, salaryValueAir,
		airSalaryImportValue, airCustomImportValue, totalPerAir,
		airExportValuePer, airImportValuePer, airCustomValuePer]);

	// Salary Volume Surface

	const totalSalarySurfaceVolume = totalPerSurface * salaryData;
	const ftlSalaryVolume = FTLVolumePer * totalSalarySurfaceVolume;
	const ltlSalaryVolume = LTLVolumePer * totalSalarySurfaceVolume;

	const surfaceSalaryData = useMemo(() => getSalarySurfaceData(
		totalSalarySurfaceVolume,
		ftlSalaryVolume,
		ltlSalaryVolume,
		salaryVolumeSurface,
		totalPerSurface,
		FTLVolumePer,
		LTLVolumePer,
	), [FTLVolumePer, LTLVolumePer, ftlSalaryVolume,
		ltlSalaryVolume, totalPerSurface, totalSalarySurfaceVolume, salaryVolumeSurface]);

	// Salary Value Surface

	const totalSalarySurfaceValue = totalPerValueSurface * salaryData;
	const ftlSalaryValue = FTLValuePer * totalSalarySurfaceValue;
	const ltlSalaryValue = LTLValuePer * totalSalarySurfaceValue;

	const surfaceSalaryDataValue = useMemo(() => getSalarySurfaceDataValue(
		totalSalarySurfaceValue,
		totalPerValueSurface,
		FTLValuePer,
		ftlSalaryValue,
		valueSurface,
		ltlSalaryValue,
		LTLValuePer,
	), [totalSalarySurfaceValue, totalPerValueSurface, FTLValuePer,
		ftlSalaryValue, valueSurface, ltlSalaryValue, LTLValuePer]);

	// Salary Volume Rail

	const totalSalaryPerRail = totalPerRail * salaryData;
	const railSalaryDomesticVolume = railVolumePer * totalSalaryPerRail;

	const railSalaryData = useMemo(() => getRailSalaryData(
		railSalaryDomesticVolume,
		totalPerRail,
		railVolumePer,
		salaryVolumeRail,
	), [railSalaryDomesticVolume, railVolumePer, salaryVolumeRail, totalPerRail]);

	// Salary Value Rail

	const totalSalaryPerRailValue = totalPerRailValue * salaryData;
	const railSalaryDomesticValue = railValuePer * totalSalaryPerRailValue;

	const railSalaryDataValue = useMemo(() => getRailSalaryData(
		totalPerRailValue,
		railSalaryDomesticValue,
		railValuePer,
		valueRail,
	), [railSalaryDomesticValue, railValuePer, totalPerRailValue, valueRail]);

	const handlePush = () => {
		push(
			'/business-finance/cogo-book/pl_statement',
			'/business-finance/cogo-book/pl_statement',
		);
	};

	return (
		<div>
			<div>
				<Breadcrumb>
					<Breadcrumb.Item
						label={(
							<Link
								href="/business-finance/cogo-book/pl_statement"
							>
								<div className={styles.title_item}>P&L Statement</div>
							</Link>
						)}
					/>
					<Breadcrumb.Item label="Upload & Generate Report" />
				</Breadcrumb>
			</div>

			<div className={styles.main_icon} onClick={() => { handlePush(); }} role="presentation">
				<div className={styles.back_icon}>
					<IcMArrowBack height="15px" width="15px" />
				</div>

				<div className={styles.title}>P&L Statement</div>
			</div>

			<div className={styles.stepper}>
				<Stepper
					active={globalStepper}
					setActive={(val:string) => { setGlobalStepper(val); }}
					items={stepperItems}
					arrowed
				/>
			</div>

			<div className={styles.card}>
				<div className={styles.flex_card_header}>
					<div>
						<div className={styles.flex_card}>
							{globalStepper === 'revenue' && <div>Basis For Shipment Bifurcation</div>}
							{globalStepper === 'salaries' && <div>Salaries & Rent Bifurcation</div>}
							{globalStepper === 'review_details' && <div>Review Details</div>}
							<Tooltip>
								<div className={styles.icon}>
									<IcMInfo />
								</div>

							</Tooltip>
						</div>
						<div className={styles.hr} />
						<div className={styles.flex_card}>
							<div className={styles.month}>
								Month -
								{' '}
								{monthVal}
								{' '}
								{year}
							</div>
							<div className={styles.month}>
								Entity -
								{' '}
								{startCase(entity)}
							</div>
						</div>

						{globalStepper === 'salaries' && (
							<div className={styles.total_data_view}>
								<div>
									<div className={styles.text_data}>
										Total Unallocable Amount
									</div>
									<div className={styles.amount}>
										INR
										{' '}
										{salaryData || '----------'}
									</div>
								</div>

								<div className={styles.text_data}>
									Total Allocable Amount
									<div>--------</div>

								</div>
							</div>
						)}
					</div>

				</div>
			</div>

			{globalStepper === 'revenue' && (
				<RevenueBifurcation
					setGlobalStepper={setGlobalStepper}
					OceanSum={OceanSum}
					SurfaceSum={SurfaceSum}
					RailSum={RailSum}
					AirSum={AirSum}
					OceanSumValue={OceanSumValue}
					SurfaceSumValue={SurfaceSumValue}
					RailSumValue={RailSumValue}
					AirSumValue={AirSumValue}
					globalStepper={globalStepper}
					volume={volume}
					setVolume={setVolume}
					volumeAir={volumeAir}
					volumeSurface={volumeSurface}
					volumeRail={volumeRail}
					value={value}
					valueAir={valueAir}
					valueSurface={valueSurface}
					valueRail={valueRail}
					setVolumeAir={setVolumeAir}
					setVolumeSurface={setVolumeSurface}
					setVolumeRail={setVolumeRail}
					setValue={setValue}
					setValueAir={setValueAir}
					setValueSurface={setValueSurface}
					setValueRail={setValueRail}
					oceanData={oceanData}
					airData={airData}
					surfaceData={surfaceData}
					railData={railData}
					oceanValueData={oceanValueData}
					airValueData={airValueData}
					surfaceValueData={surfaceValueData}
					railValueData={railValueData}
				/>
			)}
			{globalStepper === 'salaries' && (
				<SalaryAndRent
					refetchSalary={refetchSalary}
					OceanSum={OceanSum}
					SurfaceSum={SurfaceSum}
					RailSum={RailSum}
					AirSum={AirSum}
					OceanSumValue={OceanSumValue}
					SurfaceSumValue={SurfaceSumValue}
					RailSumValue={RailSumValue}
					AirSumValue={AirSumValue}
					globalStepper={globalStepper}
					setGlobalStepper={setGlobalStepper}
					setSalaryVolume={setSalaryVolume}
					salaryVolume={salaryVolume}
					oceanSalaryData={oceanSalaryData}
					airSalaryData={airSalaryData}
					salaryVolumeAir={salaryVolumeAir}
					setSalaryVolumeAir={setSalaryVolumeAir}
					surfaceSalaryData={surfaceSalaryData}
					setSalaryVolumeSurface={setSalaryVolumeSurface}
					salaryVolumeSurface={salaryVolumeSurface}
					railSalaryData={railSalaryData}
					salaryVolumeRail={salaryVolumeRail}
					setSalaryVolumeRail={setSalaryVolumeRail}
					oceanSalaryDataValue={oceanSalaryDataValue}
					salaryValue={salaryValue}
					setSalaryValue={setSalaryValue}
					airSalaryDataValue={airSalaryDataValue}
					salaryValueAir={salaryValueAir}
					setSalaryValueAir={setSalaryValueAir}
					surfaceSalaryDataValue={surfaceSalaryDataValue}
					salaryValueSurface={salaryValueSurface}
					setSalaryValueSurface={setSalaryValueSurface}
					railSalaryDataValue={railSalaryDataValue}
					salaryValueRail={salaryValueRail}
					setSalaryValueRail={setSalaryValueRail}
				/>
			)}
			{globalStepper === 'review_details' && (
				<div>
					<RevenueBifurcation
						setGlobalStepper={setGlobalStepper}
						globalStepper={globalStepper}
						volume={volume}
						setVolume={setVolume}
						volumeAir={volumeAir}
						volumeSurface={volumeSurface}
						volumeRail={volumeRail}
						value={value}
						valueAir={valueAir}
						valueSurface={valueSurface}
						valueRail={valueRail}
						setVolumeAir={setVolumeAir}
						setVolumeSurface={setVolumeSurface}
						setVolumeRail={setVolumeRail}
						setValue={setValue}
						setValueAir={setValueAir}
						setValueSurface={setValueSurface}
						setValueRail={setValueRail}
						oceanData={oceanData}
						airData={airData}
						surfaceData={surfaceData}
						railData={railData}
						oceanValueData={oceanValueData}
						airValueData={airValueData}
						surfaceValueData={surfaceValueData}
						railValueData={railValueData}
					/>
					<SalaryAndRent
						refetchSalary={refetchSalary}
						globalStepper={globalStepper}
						setGlobalStepper={setGlobalStepper}
						setSalaryVolume={setSalaryVolume}
						salaryVolume={salaryVolume}
						oceanSalaryData={oceanSalaryData}
						airSalaryData={airSalaryData}
						salaryVolumeAir={salaryVolumeAir}
						setSalaryVolumeAir={setSalaryVolumeAir}
						surfaceSalaryData={surfaceSalaryData}
						setSalaryVolumeSurface={setSalaryVolumeSurface}
						salaryVolumeSurface={salaryVolumeSurface}
						railSalaryData={railSalaryData}
						salaryVolumeRail={salaryVolumeRail}
						setSalaryVolumeRail={setSalaryVolumeRail}
						oceanSalaryDataValue={oceanSalaryDataValue}
						salaryValue={salaryValue}
						setSalaryValue={setSalaryValue}
						airSalaryDataValue={airSalaryDataValue}
						salaryValueAir={salaryValueAir}
						setSalaryValueAir={setSalaryValueAir}
						surfaceSalaryDataValue={surfaceSalaryDataValue}
						salaryValueSurface={salaryValueSurface}
						setSalaryValueSurface={setSalaryValueSurface}
						railSalaryDataValue={railSalaryDataValue}
						salaryValueRail={salaryValueRail}
						setSalaryValueRail={setSalaryValueRail}
					/>
					<Review
						fclExportVolumePer={fclExportVolumePer}
						fclImportVolumePer={fclImportVolumePer}
						lclExportVolumePer={lclExportVolumePer}
						lclImportVolumePer={lclImportVolumePer}
						oceanCustomVolumePer={oceanCustomVolumePer}
						airExportVolumePer={airExportVolumePer}
						airImportVolumePer={airImportVolumePer}
						airCustomVolumePer={airCustomVolumePer}
						FTLVolumePer={FTLVolumePer}
						LTLVolumePer={LTLVolumePer}
						railVolumePer={railVolumePer}
						fclExportValuePer={fclExportValuePer}
						fclImportValuePer={fclImportValuePer}
						lclExportValuePer={lclExportValuePer}
						lclImportValuePer={lclImportValuePer}
						oceanCustomValuePer={oceanCustomValuePer}
						airExportValuePer={airExportValuePer}
						airImportValuePer={airImportValuePer}
						airCustomValuePer={airCustomValuePer}
						FTLValuePer={FTLValuePer}
						LTLValuePer={LTLValuePer}
						railValuePer={railValuePer}
						totalVolumePer={totalVolumePer}
						totalPer={totalPer}
						totalPerSurface={totalPerSurface}
						totalPerRail={totalPerRail}
						totalPerOcean={totalPerOcean}
						totalPerAir={totalPerAir}
						totalPerValueSurface={totalPerValueSurface}
						totalPerRailValue={totalPerRailValue}
					/>
				</div>

			)}
		</div>
	);
}
export default UploadReport;
