/* eslint-disable max-len */
import { Button } from '@cogoport/components';
import { IcCTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import useListFclLocals from '../../../../hooks/useListFclFreightLocals';

import ChargeModal from './ChargeModal';
import Controls from './ChargeModal/Controls';
import styles from './styles.module.css';

const IMPORT_DATA = 'import';
const EXPORT_DATA = 'export';

const NO_ORIGIN_DATA = 'You must add origin local charges for port in order for your rates to be visible for the following incoterms: ABC, DEF, GHI';

const NO_DESTINATION_DATA = 'You must add destination local charges for port in order for your rates to be visible for the following incoterms: ABC, DEF, GHI';

function SelectLocalCharges({
	data: cardData = {}, values = {}, portValue = {}, setPortValue = () => {}, storeLocalImportData = {}, setStoreLocalImportData = () => {}, setStoreLocalExportData = () => {}, storeLocalExportData = {},
}) {
	const ORIGIN_PORT_ID = cardData?.origin_port_id;
	const DESTINATION_PORT_ID = cardData?.destination_port_id;

	const [openCharge, setOpenCharge] = useState(false);
	const [openRateForm, setOpenRateForm] = useState(false);
	const [rateValue, setRateValue] = useState({});
	const [isChecked, setIsChecked] = useState({});

	const { data: exportData, getData: getExportData } = useListFclLocals({ cardData });
	const { data: importData, getData: getImportData } = useListFclLocals({ cardData });

	const exportRatesData = exportData?.list || [];
	const importRatesData = importData?.list || [];

	const OriginTitle = `You have [${exportRatesData?.length}] origin local charges available for this combination`;

	const destinationTitle = `You have [${importRatesData?.length}]
	 destination local charges available for this combination`;

	const PortName = portValue ? 'Origin' : 'Destination';
	const portNameValue = portValue ? cardData?.origin_port?.name : cardData?.destination_port?.name;

	useEffect(() => {
		getExportData(EXPORT_DATA, ORIGIN_PORT_ID);
		getImportData(IMPORT_DATA, DESTINATION_PORT_ID);
	}, [DESTINATION_PORT_ID, ORIGIN_PORT_ID, getExportData, getImportData]);

	const handelLocal = (isOrigin) => {
		setOpenRateForm(!openRateForm);
		setPortValue(isOrigin);
	};

	const handelSelectLocal = (isOrigin) => {
		setOpenCharge(!openCharge);
		setPortValue(isOrigin);
	};

	function RenderButtons({ data = [], isExport = false }) {
		return (
			<>
				{!isEmpty(data) && (
					<Button
						size="sm"
						themeType="secondary"
						onClick={() => handelSelectLocal(isExport)}
					>
						SELECT LOCAL CHARGES
					</Button>
				)}

				{isEmpty(data) && (
					<div>
						<Button
							size="sm"
							themeType="accent"
							onClick={() => handelLocal(isExport)}
						>
							ADD LOCAL CHARGES
						</Button>
					</div>
				)}
			</>
		);
	}

	return (
		<div className={styles.container}>

			{!isEmpty(exportRatesData) ? OriginTitle : NO_ORIGIN_DATA}
			<div className={styles.button}>
				{isEmpty(storeLocalExportData) ? <RenderButtons data={exportRatesData} isExport /> : (
					<div>
						<IcCTick />
						You have selected the local charges
					</div>
				)}
			</div>

			{!isEmpty(importRatesData) ? destinationTitle : NO_DESTINATION_DATA}
			<div className={styles.button}>
				{isEmpty(storeLocalImportData) ? <RenderButtons data={importRatesData} /> : (
					<div>
						<IcCTick />
						You have selected the local charges
					</div>
				)}

			</div>

			{!openRateForm && openCharge && (
				<ChargeModal
					openCharge={openCharge}
					setOpenCharge={setOpenCharge}
					openRateForm={openRateForm}
					setOpenRateForm={setOpenRateForm}
					importRatesData={importRatesData}
					exportRatesData={exportRatesData}
					cardData={cardData}
					portValue={portValue}
					PortName={PortName}
					portNameValue={portNameValue}
					setRateValue={setRateValue}
					selectRequired
					isChecked={isChecked}
					setIsChecked={setIsChecked}
				/>
			)}
			{openRateForm && (
				<Controls
					openRateForm={openRateForm}
					setOpenRateForm={setOpenRateForm}
					setRateValue={setRateValue}
					rateValue={rateValue}
					cardData={cardData}
					PortName={PortName}
					portNameValue={portNameValue}
					backRequired
					getExportData={getExportData}
					getImportData={getImportData}
					IMPORT_DATA={IMPORT_DATA}
					EXPORT_DATA={EXPORT_DATA}
					values={values}
					setStoreLocalImportData={setStoreLocalImportData}
					setStoreLocalExportData={setStoreLocalExportData}
					isChecked={isChecked}
				/>
			)}
		</div>
	);
}

export default SelectLocalCharges;
