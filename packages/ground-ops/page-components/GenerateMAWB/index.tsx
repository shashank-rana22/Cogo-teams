/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState, useEffect } from 'react';

import useGetHawbList from '../Air/hooks/useGetHawbList';

import FormContainer from './FormContainer';
import GenerateHeader from './GenerateHeader';
import GenerateMawbDoc from './GenerateMawbDoc';
import useGetHawb from './Helpers/hooks/useGetHawb';
import usePackingList from './Helpers/hooks/usePackingList';
import mawbControls from './mawbControls';
import styles from './styles.module.css';

const iataCodeMapping = {
	'7391cac2-e8db-467f-a59b-574d01dd7e7c' : '14-3-4526/0020',
	'aa0e7e59-cbb9-43b2-98ce-1f992ae7ab19' : '14-3-4526/0005',
	'bdef6da0-8353-4b9a-b422-550ebe9c2474' : '14-3-4526/0042',
	'2f6f6dbc-c10b-4d1d-b9fd-e89298fb487c' : '14-3-4526/0053',
};

const agentOtherChargesCode = [{ code: 'AWB', price: '150' }, { code: 'PCA', price: '250' }];
const carrierOtherChargesCode = [{ code: 'AMS', price: '' }, { code: 'AWC', price: '' },
	{ code: 'XRAY', price: '' }, { code: 'CGC', price: '' }];

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

	const [disableClass, setDisableClass] = useState(false);
	const [hawbDetails, setHawbDetails] = useState([
		{ id: new Date().getTime(), documentNo: null, isNew: true },
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

	const [taskItem, setTaskItem] = useState({ ...item, ...item.documentData });

	const category = taskItem.blCategory;

	const [activeCategory, setActiveCategory] = useState(taskItem.blCategory);

	const finalFields = [
		...fields.basic,
		...fields.package,
		...fields.handling,
	];

	const [chargeableWeight, setChargeableWeight] = useState(Number((Math.max(
		+formValues.weight,
		(+taskItem.volume * 166.67),
	) || 0.0).toFixed(2)));

	const { data:hawbDataList = {}, loading:hawbListLoading, getHawbList } = useGetHawbList(taskItem.shipmentId);

	useEffect(() => {
		if (edit && activeCategory === 'hawb') {
			getHawbList();
		}
	}, []);

	useEffect(() => {
		if (edit && activeCategory === 'hawb') {
			const dataList = [];
			(hawbDataList?.data?.shipmentPendingTasks || []).forEach((hawbItem) => {
				const pushData = { id: hawbItem.id, documentNo: hawbItem?.documentData?.document_number, isNew: false };
				dataList.push(pushData);
			});
			setHawbDetails(dataList);
			if (hawbDetails.length > 0) {
				setActiveHawb(hawbDetails[0]?.id);
			}
		}
	}, [activeCategory, hawbListLoading]);

	useEffect(() => {
		if (!activeHawb.isNew) {
			getHawb(activeHawb.id);
		}
	}, [activeHawb]);

	useEffect(() => {
		if (hawbSuccess) {
			setTaskItem({ ...item, ...hawbData.data.data });
			setHawbSuccess(false);
		} else {
			setTaskItem({ ...item, ...item.documentData });
		}
		finalFields.forEach((c) => {
			if (taskItem[c.name]) {
				setValue(c.name, taskItem[c.name]);
			} else {
				setValue(c.name, '');
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
		setValue('carrierOtherCharges', taskItem.carrierOtherCharges || carrierOtherChargesCode);
		setValue('agentName', 'COGOPORT FREIGHT FORCE PVT LTD');
		setValue('shipperSignature', taskItem.customer_name);
		setValue('amountOfInsurance', 'NIL');
		setValue('accountingInformation', 'FREIGHT PREPAID');
	}, [hawbSuccess, activeHawb]);

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
		packingList({ item });
		finalFields.forEach((c) => {
			setValue(c.name, taskItem[c.name]);
		});
		if (!viewDoc) {
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
			} else if (dimensionObj.unit === 'cm') {
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
				<GenerateHeader
					setGenerate={setGenerate}
					edit={edit}
					setEdit={setEdit}
					category={category}
					activeCategory={activeCategory}
					setActiveCategory={setActiveCategory}
				/>
			)}

			{!viewDoc && (
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
				/>
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
							/>
						</Modal.Body>

					</Modal>
				)}
			</div>
		</div>
	);
}

export default GenerateMAWB;
