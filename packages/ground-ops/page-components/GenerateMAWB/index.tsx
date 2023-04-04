/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Stepper, Breadcrumb, RadioGroup } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState, useEffect } from 'react';

import Layout from '../Air/commons/Layout';

import GenerateMawbDoc from './GenerateMawbDoc';
import usePackingList from './Helpers/hooks/usePackingList';
import mawbControls from './mawbControls';
import styles from './styles.module.css';
import UploadMAWB from './UploadMAWB';

const items = [
	{ title: 'Basic Details', key: 'basic' },
	{ title: 'Package & Charges Detail', key: 'package' },
	{ title: 'Handling Details', key: 'handling' },
];

const options = [
	{ name: 'Add Manually', value: 'manual', label: 'Add Manually' },
	{ name: 'Upload Document', value: 'upload', label: 'Upload Document' },
];

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

	const [activeKey, setActiveKey] = useState('basic');

	const [value, onChange] = useState('manual');

	const [disableClass, setDisableClass] = useState(false);

	const fields = mawbControls(disableClass);

	const { packingData, packingList } = usePackingList();

	const onSubmit = () => {
		setBack(true);
	};

	const formValues = watch();

	const formData = {
		agent_name: null,
		...formValues,
	};

	const taskItem = { ...item, ...item.documentData };

	const finalFields = [
		...fields.basic,
		...fields.package,
		...fields.handling,
	];

	const [chargeableWeight, setChargeableWeight] = useState(Number((Math.max(
		+formValues.weight,
		(+taskItem.volume * 166.67),
	) || 0.0).toFixed(2)));

	const handleDocumentList = (type) => {
		(packingData?.list || []).forEach((itm) => {
			if (itm.documentType === type) {
				window.open(itm.documentUrl, '_blank');
			}
		});
	};

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
		finalFields.forEach((c:any) => {
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
			{!viewDoc
			&& (
				<>
					<div className={styles.heading}>Add Export Details</div>
					<Breadcrumb>
						<Breadcrumb.Item label={(
							<div
								onClick={() => { setGenerate(false); if (edit) { setEdit(false); } }}
								role="link"
								tabIndex={0}
							>
								SO2 - Docs Dashboard
							</div>
						)}
						/>
						<Breadcrumb.Item label="Add Export Details" />
					</Breadcrumb>
				</>
			)}
			{!viewDoc
			&& (
				<div className={styles.form_container}>
					<div className={styles.header_flex}>
						{value === 'manual' && (
							<Stepper
								active={activeKey}
								setActive={setActiveKey}
								items={items}
							/>
						)}

						{!edit
						&& (
							<RadioGroup
								options={options}
								onChange={onChange}
								value={value}
								style={{ marginLeft: 'auto' }}
							/>
						)}
					</div>
					<div className={styles.flex}>
						<Button
							size="md"
							themeType="primary"
							onClick={() => handleDocumentList('packing_list')}
							className={styles.packing_button}
						>
							Refer Packing List
						</Button>

						<Button
							size="md"
							themeType="primary"
							onClick={() => handleDocumentList('shipping_instruction')}
							className={styles.packing_button}
						>
							Refer Shipping Instruction
						</Button>
					</div>
					{value === 'upload' ? <UploadMAWB item={item} setGenerate={setGenerate} />
						: (
							<>
								{activeKey === 'basic'
								&& (
									<>
										<Layout fields={fields?.basic} control={control} errors={errors} />
										<div className={styles.button_container}>

											{!back ? (
												<div className={styles.button_div}>
													<Button
														onClick={() => {
															setGenerate(false);
															if (edit) { setEdit(false); }
														}}
														themeType="secondary"
														style={{ border: '1px solid #333' }}
													>
														CANCEL
													</Button>
													<Button
														onClick={handleSubmit(() => setActiveKey('package'))}
														themeType="accent"
													>
														NEXT
													</Button>
												</div>
											) : null}
										</div>
									</>
								)}

								{activeKey === 'package'
								&& (
									<>
										<Layout fields={fields?.package} control={control} errors={errors} />
										<div className={styles.button_container}>
											{!back ? (
												<div className={styles.button_div}>
													<Button
														onClick={() => setActiveKey('basic')}
														themeType="secondary"
														style={{ border: '1px solid #333' }}
													>
														BACK
													</Button>
													<Button
														onClick={handleSubmit(() => setActiveKey('handling'))}
														themeType="accent"
													>
														Next
													</Button>
												</div>
											) : null}
										</div>
									</>
								)}

								{activeKey === 'handling'
								&& (
									<>
										<Layout fields={fields?.handling} control={control} errors={errors} />
										<div className={styles.button_container}>
											{!back ? (
												<div className={styles.button_div}>
													<Button
														onClick={() => setActiveKey('package')}
														themeType="secondary"
														style={{ border: '1px solid #333' }}
													>
														BACK
													</Button>
													<Button
														onClick={handleSubmit(onSubmit)}
														themeType="accent"
													>
														Generate Master Airway Bill
													</Button>
												</div>
											) : null}
										</div>
									</>
								)}
							</>
						)}
				</div>
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
							/>
						</Modal.Body>

					</Modal>
				)}
			</div>
		</div>
	);
}

export default GenerateMAWB;
