/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

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

const agentOtherChargesCode = [{ code: 'AWB', price: '150' }, { code: 'PCA', price: '250' }];
const carrierOtherChargesCode = [{ code: 'AMS', price: '' }, { code: 'AWC', price: '' },
	{ code: 'XRAY', price: '' }, { code: 'CGC', price: '' }];
const unsavedFields = ['consigneeAddress',
	'shipperName',
	'shipperAddress',
	'consigneeName',
	'chargeableWeight'];

interface NestedObj {
	[key: string]: NestedObj | React.FC ;
}

interface Props {
	viewDoc?: boolean;
	setViewDoc?: Function;
	item?: NestedObj;
	edit?: boolean;
	setEdit?: Function;
	setGenerate?:Function;
}

function GenerateMAWB({
	viewDoc = false,
	setViewDoc = () => {},
	item = {},
	edit,
	setEdit = () => {},
	setGenerate = () => {},
}:Props) {
	const [back, setBack] = useState(false);
	const { control, watch, setValue, handleSubmit, formState: { errors } } = useForm();

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

	const fields = mawbControls(disableClass);

	const { packingData, packingList } = usePackingList();

	const formValues = watch();

	const formData = {
		agent_name: null,
		...formValues,
	};

	const { hawbData, getHawb, hawbSuccess, setHawbSuccess, loading } = useGetHawb();

	const [taskItem, setTaskItem] = useState({
		...item,
		...item.documentData,
	});

	const category = item.blCategory;
	const mawbId = item.documentId;
	const pendingTaskId = item.id;

	const [activeCategory, setActiveCategory] = useState(edit ? 'mawb' : taskItem.blCategory);

	const finalFields = [
		...fields.basic,
		...fields.package,
		...fields.handling,
	];

	const [chargeableWeight, setChargeableWeight] = useState(Number((Math.max(
		+formValues.weight,
		(+taskItem.volume * 166.67),
	) || 0.0).toFixed(2)));

	const { data:hawbDataList = {}, loading:hawbListLoading, getHawbList } = useGetHawbList(item.shipmentId);

	useEffect(() => {
		if (edit && activeCategory === 'hawb') {
			getHawbList();
		}
	}, [activeCategory]);

	useEffect(() => {
		if (edit && activeCategory === 'hawb') {
			const dataList = [];
			(hawbDataList?.data?.shipmentPendingTasks || []).forEach((hawbItem) => {
				const pushData = {
					id         : hawbItem?.documentId,
					documentNo : hawbItem?.documentData?.document_number,
					isNew      : false,
				};
				dataList.push(pushData);
			});
			setHawbDetails(dataList);
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
		if (category === 'mawb') {
			return;
		}
		if (hawbSuccess) {
			setTaskItem({
				...hawbData.data,
				...hawbData.data?.data,
				originAirportId   : item.originAirportId,
				serviceProviderId : item.serviceProviderId,
			});
			setHawbSuccess(false);
		}
		finalFields.forEach((c) => {
			if (activeCategory === 'hawb' && activeHawb.isNew && unsavedFields.includes(c.name)) {
				setValue(c.name, '');
			} else if (activeCategory === 'mawb' && unsavedFields.includes(c.name) && !edit) {
				setValue(c.name, '');
			} else {
				setValue(c.name, taskItem[c.name] || '');
			}
		});
		setValue('executedDate', taskItem.executedDate ? new Date(taskItem.executedDate) : new Date());
		setValue('iataCode', iataCodeMapping[taskItem?.originAirportId] || '');
		setValue('city', 'NEW DELHI');
		setValue('place', 'NEW DELHI');
		setValue('class', 'q');
		setValue('currency', 'INR');
		setValue('commodity', taskItem.commodity
			|| `${'SAID TO CONTAIN\n'}${taskItem.commodity || ''}`);
		setValue('agentOtherCharges', taskItem.agentOtherCharges || agentOtherChargesCode);
		setValue('carrierOtherCharges', activeCategory === 'hawb' && activeHawb.isNew
			? carrierOtherChargesCode
			: taskItem.carrierOtherCharges || carrierOtherChargesCode);
		setValue('agentName', 'COGOPORT FREIGHT FORCE PVT LTD');
		setValue('shipperSignature', taskItem.customer_name || taskItem.shipperSignature);
		setValue('amountOfInsurance', 'NIL');
		setValue('accountingInformation', 'FREIGHT PREPAID');
	}, [hawbSuccess, activeHawb, category, activeCategory]);

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
		if (operatorList.length > 0) {
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
		if (organizationList.length > 0) {
			setTaskItem((prev) => ({
				...prev,
				customer_name: organizationList[0]?.business_name,
			}));
			setValue('customer_name', organizationList[0]?.business_name);
			setValue('shipperSignature', organizationList[0]?.business_name);
		}
	}, [organizationList]);

	useEffect(() => {
		if (airportList.length > 0) {
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
			setValue('city', 'NEW DELHI');
			setValue('place', 'NEW DELHI');
			setValue('class', 'q');
			setValue('currency', 'INR');
			setValue('commodity', edit ? `${taskItem.commodity || ''}`
				: `${'SAID TO CONTAIN\n'}${taskItem.commodity || ''}`);
			setValue('agentOtherCharges', edit ? taskItem.agentOtherCharges
				: agentOtherChargesCode);
			setValue('carrierOtherCharges', edit ? taskItem.carrierOtherCharges
				: carrierOtherChargesCode);
			setValue('agentName', 'COGOPORT FREIGHT FORCE PVT LTD');
			setValue('shipperSignature', taskItem.customer_name);
			setValue('amountOfInsurance', 'NIL');
			setValue('accountingInformation', 'FREIGHT PREPAID');
		}
	}, []);

	useEffect(() => {
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

	return (
		<div className={styles.container}>
			{loading && <Loader themeType="primary" className={styles.loader} />}
			{!viewDoc && (
				<>
					<GenerateHeader
						setGenerate={setGenerate}
						setEdit={setEdit}
						category={category}
						activeCategory={activeCategory}
						setActiveCategory={setActiveCategory}
						awbNumber={item.awbNumber}
						serialId={item.serialId}
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
						item={item}
						setGenerate={setGenerate}
						handleSubmit={handleSubmit}
						activeCategory={activeCategory}
						hawbDetails={hawbDetails}
						setHawbDetails={setHawbDetails}
						activeHawb={activeHawb}
						setActiveHawb={setActiveHawb}
						activeKey={activeKey}
						setActiveKey={setActiveKey}
						taskItem={taskItem}
					/>
				</>
			)}

			<div className={styles.file_container}>
				{(back || viewDoc) && (
					<Modal
						show={back || viewDoc}
						onClose={() => { setBack(false); setViewDoc(false); }}
						size="lg"
						className={styles.modal_container}
						style={{ width: '900px', height: '92vh' }}
					>
						<Modal.Body style={{ minHeight: '90vh' }}>
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
							/>
						</Modal.Body>
					</Modal>
				)}
			</div>
		</div>
	);
}

export default GenerateMAWB;
