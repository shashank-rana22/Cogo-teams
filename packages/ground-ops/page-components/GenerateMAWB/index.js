/* eslint-disable react-hooks/exhaustive-deps */
import { Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import Modal from '../Air/commons/Modal';
import useGetHawbList from '../Air/hooks/useGetHawbList';

import FormContainer from './FormContainer';
import GenerateHeader from './GenerateHeader';
import GenerateMawbDoc from './GenerateMawbDoc';
import { iataCodeMapping } from './Helpers/configurations/iataCodeMapping';
import mawbControls from './Helpers/configurations/mawbControls';
import GetLocation from './Helpers/hooks/GetLocation';
import GetOperator from './Helpers/hooks/GetOperator';
import GetOrganization from './Helpers/hooks/GetOrganization';
import useGetHawb from './Helpers/hooks/useGetHawb';
import usePackingList from './Helpers/hooks/usePackingList';
import styles from './styles.module.css';

const AGENT_OTHER_CHARGES_CODE = [{ code: 'AWB', price: '150' }, { code: 'PCA', price: '250' }];

const CARRIER_OTHER_CHARGES_CODE = [
	{ code: 'FSC', chargeType: 'chargeable_wt', price: '' },
	{ code: 'SSC', chargeType: 'chargeable_wt', price: '' },
	{ code: 'XRAY', chargeType: 'chargeable_wt', price: '' },
	{ code: 'AWC', chargeType: 'chargeable_wt', price: '' },
	{ code: 'AMS', chargeType: 'chargeable_wt', price: '' },
];

const UNSAVED_FIELDS = [
	'document_number',
	'consigneeAddress',
	'shipperName',
	'shipperAddress',
	'consigneeName',
	'chargeableWeight',
	'remark',
	'totalPackagesCount',
];

const NULL_VALUE = 0;
const DECIMAL_NULL_VALUE = 0.0;
const TO_FIXED_DECIMAL_PLACES = 2;
const INCH_CM_FACTOR = 2.54;
const VOLUME_FACTOR = 166.67;
const PRECISION_VALUE = 1000000;
const LENGTH_INDEX = 1;

function GenerateMAWB({
	viewDoc = false,
	setViewDoc = () => {},
	item = {},
	edit = false,
	setEdit = () => {},
	setItem = () => {},
	setGenerate = () => {},
}) {
	const [back, setBack] = useState(false);
	const [editCopies, setEditCopies] = useState(null);

	const [disableClass, setDisableClass] = useState(false);
	const [hawbDetails, setHawbDetails] = useState([
		{ id: uuid(), documentNo: null, isNew: true },
	]);

	const [activeHawb, setActiveHawb] = useState(hawbDetails[GLOBAL_CONSTANTS.zeroth_index]);
	const [activeKey, setActiveKey] = useState('basic');

	const [customHawbNumber, setCustomHawbNumber] = useState(false);

	const [taskItem, setTaskItem] = useState({
		...item,
		...item?.documentData,
	});

	const [activeCategory, setActiveCategory] = useState('mawb');

	const { control, watch, setValue, handleSubmit, formState: { errors } } = useForm();
	const formValues = watch();

	const [unitDefaultValue, setUnitDefaultValue] = useState(
		formValues?.dimension?.[GLOBAL_CONSTANTS.zeroth_index]?.unit,
	);

	const [chargeableWeight, setChargeableWeight] = useState(Number((Math.max(
		+formValues.weight,
		(+taskItem.volume * VOLUME_FACTOR),
	) || DECIMAL_NULL_VALUE).toFixed(TO_FIXED_DECIMAL_PLACES)));

	const {
		data: airportData = {},
		listAirport,
	} = GetLocation({ airportIds: [item.originAirportId, item.destinationAirportId] });
	const { list: airportList = [] } = airportData;

	const { data: operatorData = {}, listOperator } = GetOperator({ airlineIds: item.airlineId });
	const { list: operatorList = [] } = operatorData;

	const {
		data: organizationData = {},
		listOrganization,
	} = GetOrganization({ importerExporterIds: item.importerExporterId });
	const { list: organizationList = [] } = organizationData;
	const category = item?.blCategory;
	const mawbId = item?.documentId;
	const pendingTaskId = item?.id || item?.taskId;

	const packageDisableCheck = category === 'hawb' && activeCategory === 'mawb';
	const fields = mawbControls({
		disableClass,
		editHawbNumberCondition: !customHawbNumber,
		unitDefaultValue,
		packageDisableCheck,
	});

	const { packingData, packingList } = usePackingList();

	const formData = {
		agent_name: null,
		...formValues,
	};

	const { hawbData, getHawb, hawbSuccess, setHawbSuccess, loading } = useGetHawb();

	const finalFields = [
		...fields.hawb_controls,
		...fields.basic,
		...fields.package,
		...fields.handling,
	];

	const { data:hawbDataList = {}, loading:hawbListLoading, getHawbList } = useGetHawbList(item.shipmentId);

	let cogoSeriesNumber = [];

	hawbDetails?.forEach((itm) => {
		if (String(itm?.documentNo)?.includes('COGO')) {
			cogoSeriesNumber.push(Number((itm?.documentNo || '').slice(5)));
		}
	});

	cogoSeriesNumber = cogoSeriesNumber.sort((a, b) => a - b);

	useEffect(() => {
		if (activeCategory === 'hawb') {
			getHawbList();
		}
	}, [activeCategory]);

	useEffect(() => {
		if (activeCategory === 'hawb') {
			const DATA_LIST = [];
			(hawbDataList?.data?.shipmentPendingTasks || []).forEach((hawbItem) => {
				const pushData = {
					id         : hawbItem?.documentId,
					documentNo : hawbItem?.documentData?.document_number,
					isNew      : false,
				};
				DATA_LIST.push(pushData);
			});
			setHawbDetails(DATA_LIST);
		}
	}, [activeCategory, hawbListLoading]);

	useEffect(() => {
		setActiveKey('basic');
		if (activeHawb && !activeHawb.isNew && activeCategory === 'hawb') {
			getHawb(activeHawb.id);
		}
		if (activeCategory === 'mawb' && edit) {
			getHawb(mawbId);
		}
	}, [activeHawb, activeCategory]);

	useEffect(() => {
		if (category === 'mawb' || category === undefined) {
			return;
		}

		if (hawbSuccess) {
			const newDimensions = (hawbData?.data?.hawbDetails || []).reduce((prev, hawbItem) => {
				const dimension = hawbItem?.documentData?.dimension || [];
				return [...prev, ...dimension];
			}, []);

			setTaskItem({
				...taskItem,
				...hawbData.data,
				...hawbData.data?.data,
				originAirportId   : item.originAirportId,
				serviceProviderId : item.serviceProviderId,
				dimension         : !isEmpty(newDimensions) ? newDimensions : hawbData?.data?.data?.dimension,
			});
			setHawbSuccess(false);
		}

		finalFields.forEach((c) => {
			if (activeCategory === 'hawb' && activeHawb.isNew && UNSAVED_FIELDS.includes(c.name)) {
				setValue(c.name, '');
			} else if (activeCategory === 'mawb' && UNSAVED_FIELDS.includes(c.name) && !edit) {
				setValue(c.name, '');
			} else {
				setValue(c.name, taskItem[c.name] || '');
			}
		});
		setValue('executedDate', taskItem.executedDate ? new Date(taskItem.executedDate) : new Date());
		setValue('iataCode', iataCodeMapping[taskItem?.originAirportId] || '');
		setValue('city', taskItem?.city || 'NEW DELHI');
		setValue('place', taskItem?.place || 'NEW DELHI');
		setValue('class', taskItem?.class || (taskItem?.isMinimumPriceShipment ? 'm' : 'q'));
		setValue('currency', 'INR');
		setValue('ratePerKg', edit ? taskItem.ratePerKg : taskItem?.tariffRate);
		setValue('commodity', taskItem.commodity
			|| `${'SAID TO CONTAIN\n'}${taskItem.commodity || ''}`);
		setValue('agentOtherCharges', taskItem.agentOtherCharges || AGENT_OTHER_CHARGES_CODE);
		setValue('carrierOtherCharges', activeCategory === 'hawb' && activeHawb.isNew
			? CARRIER_OTHER_CHARGES_CODE
			: taskItem.carrierOtherCharges || CARRIER_OTHER_CHARGES_CODE);
		setValue('agentName', 'COGOPORT FREIGHT FORCE PVT LTD');
		setValue('shipperSignature', taskItem?.shipperSignature || taskItem.customer_name);
		setValue('amountOfInsurance', 'NIL');
		setValue('accountingInformation', taskItem?.accountingInformation || 'FREIGHT PREPAID');
	}, [hawbSuccess, activeHawb, category, activeCategory]);

	useEffect(() => {
		if (!customHawbNumber && activeHawb.isNew) {
			setValue('document_number', activeHawb.documentNo);
			setHawbDetails((prev) => (
				prev.map((hawbItem) => (hawbItem.id === activeHawb.id
					? {
						...hawbItem,
						documentNo: activeHawb.documentNo ? activeHawb.documentNo
							: `COGO-${cogoSeriesNumber[cogoSeriesNumber.length - LENGTH_INDEX] + LENGTH_INDEX}`,
					}
					: hawbItem))
			));
		} else if (customHawbNumber && activeHawb.isNew) {
			setValue('document_number', '');
			setHawbDetails((prev) => (
				prev.map((hawbItem) => (hawbItem.id === activeHawb.id
					? { ...hawbItem, documentNo: null }
					: hawbItem))
			));
		}
	}, [activeHawb, customHawbNumber]);

	useEffect(() => {
		setChargeableWeight(formValues.chargeableWeight);
	}, [formValues.chargeableWeight]);

	useEffect(() => {
		if (!viewDoc && formValues.class !== 'm') {
			setValue(
				'amount',
				((formValues.chargeableWeight * formValues.ratePerKg)
				|| DECIMAL_NULL_VALUE).toFixed(TO_FIXED_DECIMAL_PLACES),
			);
		}

		if (formValues.class === 'a') {
			setDisableClass(true);
		} else {
			setDisableClass(false);
		}
	}, [formValues.chargeableWeight, formValues.ratePerKg, formValues.class]);

	useEffect(() => {
		if (!isEmpty(operatorList) && !edit) {
			setTaskItem((prev) => ({
				...prev,
				airline         : operatorList[GLOBAL_CONSTANTS.zeroth_index]?.business_name,
				airlineIataCode : operatorList[GLOBAL_CONSTANTS.zeroth_index]?.iata_code,
			}));
			setValue('airline', operatorList[GLOBAL_CONSTANTS.zeroth_index]?.business_name);
			setValue('airlineIataCode', operatorList[GLOBAL_CONSTANTS.zeroth_index]?.iata_code);
		}
	}, [operatorList]);

	useEffect(() => {
		if (!isEmpty(organizationList) && !edit) {
			setTaskItem((prev) => ({
				...prev,
				customer_name: organizationList[GLOBAL_CONSTANTS.zeroth_index]?.business_name,
			}));
			setValue('customer_name', organizationList[GLOBAL_CONSTANTS.zeroth_index]?.business_name);
			setValue('shipperSignature', organizationList[GLOBAL_CONSTANTS.zeroth_index]?.business_name);
		}
	}, [organizationList]);

	useEffect(() => {
		if (!isEmpty(airportList) && !edit) {
			(airportList || []).forEach((airItem) => {
				if (airItem.id === item.originAirportId) {
					setTaskItem((prev) => ({
						...prev,
						origin         : airItem.name,
						originPortCode : airItem.port_code,
					}));
					setValue('origin', airItem.name);
					setValue('originPortCode', airItem.port_code);
				} else if (airItem.id === item.destinationAirportId) {
					setTaskItem((prev) => ({
						...prev,
						destination         : airItem.name,
						destinationPortCode : airItem.port_code,
					}));
					setValue('destination', airItem.name);
					setValue('destinationPortCode', airItem.port_code);
				}
			});
		}
	}, [airportList]);

	useEffect(() => {
		if (!viewDoc && !edit) {
			setValue(
				'accountingInformation',
				formValues.paymentTerm === 'prepaid' ? 'FREIGHT PREPAID' : 'FREIGHT COLLECT',
			);
		}
	}, [formValues.paymentTerm]);

	useEffect(() => {
		finalFields.forEach((c) => {
			setValue(c.name, taskItem[c.name]);
		});

		if (!viewDoc) {
			listAirport();
			listOperator();
			listOrganization();
			packingList({ item });
			setValue('executedDate', edit && taskItem.executedDate ? new Date(taskItem.executedDate) : new Date());
			setValue('iataCode', edit ? taskItem.iataCode : iataCodeMapping[taskItem?.originAirportId] || '');
			setValue('city', taskItem?.city || 'NEW DELHI');
			setValue('place', taskItem?.place || 'NEW DELHI');
			setValue('class', taskItem?.class || (taskItem?.isMinimumPriceShipment ? 'm' : 'q'));
			setValue('currency', 'INR');
			setValue('ratePerKg', edit ? taskItem.ratePerKg : taskItem?.tariffRate);
			setValue('commodity', edit ? `${taskItem.commodity || ''}`
				: `${'SAID TO CONTAIN\n'}${taskItem.commodity || ''}`);
			setValue('agentOtherCharges', edit ? taskItem.agentOtherCharges
				: AGENT_OTHER_CHARGES_CODE);
			setValue('carrierOtherCharges', edit ? taskItem.carrierOtherCharges
				: CARRIER_OTHER_CHARGES_CODE);
			setValue('agentName', 'COGOPORT FREIGHT FORCE PVT LTD');
			setValue('shipperSignature', taskItem?.shipperSignature || taskItem.customer_name);
			setValue('amountOfInsurance', 'NIL');
			setValue('accountingInformation', taskItem?.accountingInformation || 'FREIGHT PREPAID');
		}
	}, []);

	useEffect(() => {
		if (!viewDoc && editCopies) {
			setTaskItem({
				...item,
				...item?.documentData,
			});
			finalFields.forEach((c) => {
				setValue(c.name, item?.documentData?.[c.name]);
			});
			setValue('executedDate', edit && item?.documentData?.executedDate
				? new Date(item?.documentData?.executedDate) : new Date());
		}
	}, [edit, editCopies]);

	useEffect(() => {
		if (edit && activeCategory === 'hawb') {
			return;
		}

		let totalVolume = NULL_VALUE;
		let totalPackage = NULL_VALUE;
		(formValues.dimension || []).forEach((dimensionObj) => {
			if (dimensionObj?.unit === 'inch') {
				totalVolume
				+= (Number(dimensionObj?.length) * INCH_CM_FACTOR
				* Number(dimensionObj?.width) * INCH_CM_FACTOR
				* Number(dimensionObj?.height) * INCH_CM_FACTOR
				* Number(dimensionObj?.packages_count)) || NULL_VALUE;
			} else if (dimensionObj?.unit === 'cms') {
				totalVolume
				+= (Number(dimensionObj?.length)
				* Number(dimensionObj?.width)
				* Number(dimensionObj?.height)
				* Number(dimensionObj?.packages_count)) || NULL_VALUE;
			}
			totalPackage += Number(dimensionObj?.packages_count) || NULL_VALUE;
		});
		setValue('volumetricWeight', viewDoc ? taskItem.volumetricWeight
			: Number(((+totalVolume * VOLUME_FACTOR)
			|| DECIMAL_NULL_VALUE) / PRECISION_VALUE).toFixed(TO_FIXED_DECIMAL_PLACES));
		setValue('totalPackagesCount', totalPackage || taskItem.totalPackagesCount);
	}, [JSON.stringify(formValues.dimension), formValues.weight]);

	useEffect(() => {
		setUnitDefaultValue(formValues?.dimension?.[GLOBAL_CONSTANTS.zeroth_index]?.unit);
	}, [JSON.stringify(formValues?.dimension)]);

	return (
		<div className={styles.container}>
			{(loading || hawbListLoading) && <Loader themeType="primary" className={styles.loader} />}
			{!viewDoc && (
				<>
					<GenerateHeader
						setGenerate={setGenerate}
						setEdit={setEdit}
						category={category}
						activeCategory={activeCategory}
						setActiveCategory={setActiveCategory}
						awbNumber={item.awbNumber || item.document_number}
						serialId={item.serialId}
						editCopies={editCopies}
					/>

					<FormContainer
						back={back}
						setBack={setBack}
						edit={edit}
						setEdit={setEdit}
						packingData={packingData}
						fields={fields}
						control={control}
						errors={errors}
						setValue={setValue}
						item={item}
						setGenerate={setGenerate}
						handleSubmit={handleSubmit}
						category={category}
						activeCategory={activeCategory}
						hawbDetails={hawbDetails}
						setHawbDetails={setHawbDetails}
						activeHawb={activeHawb}
						setActiveHawb={setActiveHawb}
						activeKey={activeKey}
						setActiveKey={setActiveKey}
						taskItem={taskItem}
						formValues={formValues}
						setCustomHawbNumber={setCustomHawbNumber}
						cogoSeriesNumber={cogoSeriesNumber}
					/>
				</>
			)}

			<div className={styles.file_container}>
				{(back || viewDoc) && (
					<Modal
						onClose={() => { setBack(false); setViewDoc(false); }}
						style={{ width: '900px', height: '92vh' }}
					>
						<GenerateMawbDoc
							taskItem={taskItem}
							formData={formData}
							setBack={setBack}
							back={back}
							edit={edit}
							setEdit={setEdit}
							viewDoc={viewDoc}
							chargeableWeight={chargeableWeight}
							setGenerate={setGenerate}
							activeCategory={activeCategory}
							hawbDetails={hawbDetails}
							setHawbDetails={setHawbDetails}
							setActiveHawb={setActiveHawb}
							setActiveKey={setActiveKey}
							activeHawb={activeHawb}
							pendingTaskId={pendingTaskId}
							category={category}
							setViewDoc={setViewDoc}
							setItem={setItem}
							editCopies={editCopies}
							setEditCopies={setEditCopies}
						/>
					</Modal>
				)}
			</div>
		</div>
	);
}

export default GenerateMAWB;
