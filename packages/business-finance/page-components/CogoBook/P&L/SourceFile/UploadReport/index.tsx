import { Breadcrumb, Tooltip, Stepper } from '@cogoport/components';
import { IcMInfo, IcMArrowBack } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useEffect, useMemo, useState } from 'react';

import useReportFile from '../../../hooks/useReportFile';
import useSalary from '../../../hooks/useSalary';

import {
	getAirData, getAirDataValue, getOceanData,
	getOceanDataValue,
	getRailData,
	getRailDataValue,
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
	const { query } = useRouter();
	const { refetch, sourceFileData } = useReportFile({ query });
	const [volume, setVolume] = useState({});
	const [volumeAir, setVolumeAir] = useState({});
	const [volumeSurface, setVolumeSurface] = useState({});
	const [volumeRail, setVolumeRail] = useState({});

	const [value, setValue] = useState({});
	const [valueAir, setValueAir] = useState({});
	const [valueSurface, setValueSurface] = useState({});
	const [valueRail, setValueRail] = useState({});

	const { refetch:refetchSalary, salaryData = '1000' } = useSalary();

	const { month, entity } = query || {};

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

	const Total = (volume[0] || totalVolume) + (volumeAir[0] || totalAirVolume)
	+ (volumeSurface[0] || totalSurfaceVolume) + (volumeRail[0] || railDomesticVolume);

	const totalVolumePer = ((volume[0] || totalVolume) / Total) * 100;
	const fclExportVolumePer = ((volume[1] || fclExportVolume) / (volume[0] || totalVolume)) * 100;
	const fclImportVolumePer = ((volume[2] || fclImportVolume) / (volume[0] || totalVolume)) * 100;
	const lclExportVolumePer = ((volume[3] || lclExportVolume) / (volume[0] || totalVolume)) * 100;
	const lclImportVolumePer = ((volume[4] || lclImportVolume) / (volume[0] || totalVolume)) * 100;
	const oceanCustomVolumePer = ((volume[5] || oceanCustomVolume) / (volume[0] || totalVolume)) * 100;

	const totalPer = ((volumeAir[0] || totalAirVolume) / Total) * 100;
	const airExportVolumePer = ((volumeAir[1] || airExportVolume) / (volumeAir[0] || totalAirVolume)) * 100;
	const airImportVolumePer = ((volumeAir[2] || airImportVolume) / (volumeAir[0] || totalAirVolume)) * 100;
	const airCustomVolumePer = ((volumeAir[3] || airCustomVolume) / (volumeAir[0] || totalAirVolume)) * 100;

	const totalPerSurface = ((volume[0] || totalSurfaceVolume) / Total) * 100;
	const FTLVolumePer = ((volumeSurface[1] || ftlVolume) / (volumeSurface[0] || totalSurfaceVolume)) * 100;
	const LTLVolumePer = ((volumeSurface[2] || ltlVolume) / (volumeSurface[0] || totalSurfaceVolume)) * 100;

	const totalPerRail = ((volumeRail[0] || railDomesticVolume) / Total) * 100;
	const railVolumePer = ((volumeRail[1] || railDomesticVolume) / (volumeRail[0] || railDomesticVolume)) * 100;

	// This is for shipment value

	const TotalValue = (value[0] || totalValue) + (valueAir[0] || totalAirValue)
	+ (valueSurface[0] || totalSurfaceValue) + (valueRail[0] || railDomesticValue);

	const totalPerOcean = ((value[0] || totalValue) / TotalValue) * 100;
	const fclExportValuePer = ((value[1] || fclExportValue) / (value[0] || totalValue)) * 100;
	const fclImportValuePer = ((value[2] || fclImportValue) / (value[0] || totalValue)) * 100;
	const lclExportValuePer = ((value[3] || lclExportValue) / (value[0] || totalValue)) * 100;
	const lclImportValuePer = ((value[4] || lclImportValue) / (value[0] || totalValue)) * 100;
	const oceanCustomValuePer = ((value[5] || oceanCustomValue) / (value[0] || totalValue)) * 100;

	const totalPerAir = ((valueAir[0] || totalAirValue) / TotalValue) * 100;
	const airExportValuePer = ((valueAir[1] || airExportValue) / (valueAir[0] || totalAirValue)) * 100;
	const airImportValuePer = ((valueAir[2] || airImportValue) / (valueAir[0] || totalAirValue)) * 100;
	const airCustomValuePer = ((valueAir[3] || airCustomValue) / (valueAir[0] || totalAirValue)) * 100;

	const totalPerValueSurface = ((valueSurface[0] || totalSurfaceValue) / TotalValue) * 100;
	const FTLValuePer = ((valueSurface[1] || ftlValue) / (valueSurface[0] || totalSurfaceValue)) * 100;
	const LTLValuePer = ((valueSurface[2] || ltlValue) / (valueSurface[0] || totalSurfaceValue)) * 100;

	const totalPerRailValue = ((valueRail[0] || railDomesticValue) / TotalValue) * 100;
	const railValuePer = ((valueRail[1] || railDomesticValue) / (valueRail[0] || railDomesticValue)) * 100;

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

			<div className={styles.main_icon}>
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
								{month}
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
					sourceFileData={sourceFileData}
					refetchSalary={refetchSalary}
					setGlobalStepper={setGlobalStepper}
				/>
			)}
			{globalStepper === 'review_details' && (
				<Review
					sourceFileData={sourceFileData}
					setGlobalStepper={setGlobalStepper}
				/>
			)}
		</div>
	);
}
export default UploadReport;
