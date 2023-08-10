/* eslint-disable react-hooks/exhaustive-deps */
import { Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
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
const CARRIER_OTHER_CHARGES_CODE = [{ code: 'FSC', chargeType: 'chargeable_wt', price: '' },
	{ code: 'SSC', chargeType: 'chargeable_wt', price: '' }, { code: 'XRAY', chargeType: 'chargeable_wt', price: '' },
	{ code: 'AWC', chargeType: 'chargeable_wt', price: '' }, { code: 'AMS', chargeType: 'chargeable_wt', price: '' }];
const UNSAVED_FIELDS = ['document_number',
	'consigneeAddress',
	'shipperName',
	'shipperAddress',
	'consigneeName',
	'chargeableWeight',
	'remark',
	'totalPackagesCount',
];

interface NestedObj {
	[key: string]: NestedObj | React.FC ;
}

interface Props {
	viewDoc?: boolean;
	setViewDoc?: Function;
	item?: NestedObj;
	edit?: boolean;
	setEdit?: Function;
	setItem?: Function;
	setGenerate?:Function;
}

function GenerateMAWB({
	viewDoc = false,
	setViewDoc = () => {},
	item = {},
	edit,
	setEdit = () => {},
	setItem = () => {},
	setGenerate = () => {},
}:Props) {
	const [back, setBack] = useState(false);
	const [editCopies, setEditCopies] = useState(null);
	const { control, watch, setValue, handleSubmit, formState: { errors } } = useForm();

	const formValues = watch();
	const [unitDefaultValue, setUnitDefaultValue] = useState(formValues?.dimension?.[0]?.unit);
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
	} = 	GetOrganization({ importerExporterIds: item.importerExporterId });
	const { list: organizationList = [] } = organizationData;

	const [disableClass, setDisableClass] = useState(false);
	const [hawbDetails, setHawbDetails] = useState([
		{ id: uuid(), documentNo: null, isNew: true },
	]);

	const [activeHawb, setActiveHawb] = useState(hawbDetails[0]);
	const [activeKey, setActiveKey] = useState('basic');

	const [customHawbNumber, setCustomHawbNumber] = useState(false);

	const fields = mawbControls(disableClass, !customHawbNumber, unitDefaultValue);

	const { packingData, packingList } = usePackingList();

	const formData = {
		agent_name: null,
		...formValues,
	};

	const { hawbData, getHawb, hawbSuccess, setHawbSuccess, loading } = useGetHawb();

	const [taskItem, setTaskItem] = useState({
		...item,
		...item?.documentData,
	});

	const category = item.blCategory;
	const mawbId = item.documentId;
	const pendingTaskId = item?.id || item?.taskId || undefined;

	const [activeCategory, setActiveCategory] = useState('mawb');

	const finalFields = [
		...fields.hawb_controls,
		...fields.basic,
		...fields.package,
		...fields.handling,
	];

	const [chargeableWeight, setChargeableWeight] = useState(Number((Math.max(
		+formValues.weight,
		(+taskItem.volume * 166.67),
	) || 0.0).toFixed(2)));

	const { data:hawbDataList = {}, loading:hawbListLoading, getHawbList } = useGetHawbList(item.shipmentId);

	let cogoSeriesNumber:Array<number> = [];

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
			setTaskItem({
				...taskItem,
				...hawbData.data,
				...hawbData.data?.data,
				originAirportId   : item.originAirportId,
				serviceProviderId : item.serviceProviderId,
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
							: `COGO-${cogoSeriesNumber[cogoSeriesNumber.length - 1] + 1}`,
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
		if (!viewDoc) {
			setValue('amount', ((formValues.chargeableWeight * formValues.ratePerKg) || 0.0).toFixed(2));
		}

		if (formValues.class === 'a') {
			setDisableClass(true);
		} else {
			setDisableClass(false);
		}
	}, [formValues.chargeableWeight, formValues.ratePerKg, formValues.class]);

	useEffect(() => {
		if (operatorList.length > 0 && !edit) {
			setTaskItem((prev) => ({
				...prev,
				airline         : operatorList[0]?.business_name,
				airlineIataCode : operatorList[0]?.iata_code,
			}));
			setValue('airline', operatorList[0]?.business_name);
			setValue('airlineIataCode', operatorList[0]?.iata_code);
		}
	}, [operatorList]);

	useEffect(() => {
		if (organizationList.length > 0 && !edit) {
			setTaskItem((prev) => ({
				...prev,
				customer_name: organizationList[0]?.business_name,
			}));
			setValue('customer_name', organizationList[0]?.business_name);
			setValue('shipperSignature', organizationList[0]?.business_name);
		}
	}, [organizationList]);

	useEffect(() => {
		if (airportList.length > 0 && !edit) {
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
		let totalVolume:number = 0;
		let totalPackage:number = 0;
		(formValues.dimension || []).forEach((dimensionObj) => {
			if (dimensionObj.unit === 'inch') {
				totalVolume
				+= Number(dimensionObj.length) * 2.54
				* Number(dimensionObj.width) * 2.54
				* Number(dimensionObj.height) * 2.54
				* Number(dimensionObj.packages_count);
			} else if (dimensionObj.unit === 'cms') {
				totalVolume
				+= Number(dimensionObj.length)
				* Number(dimensionObj.width)
				* Number(dimensionObj.height)
				* Number(dimensionObj.packages_count);
			}
			totalPackage += Number(dimensionObj.packages_count);
		});
		setValue('volumetricWeight', viewDoc ? taskItem.volumetricWeight
			: Number(((+totalVolume * 166.67) || 0.0) / 1000000).toFixed(2));
		setValue('totalPackagesCount', totalPackage || taskItem.totalPackagesCount);
	}, [JSON.stringify(formValues.dimension), formValues.weight]);

	useEffect(() => {
		setUnitDefaultValue(formValues?.dimension?.[0]?.unit);
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
