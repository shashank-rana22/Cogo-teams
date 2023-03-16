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

interface NestedObj {
	[key: string]: NestedObj;
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

	let chargeableWeight:number = Number((Math.max(
		+formValues.weight * +taskItem.totalPackagesCount,
		(+taskItem.volume * 166.67),
	) || 0.0).toFixed(2));

	useEffect(() => {
		chargeableWeight = Number((Math.max(
			+formValues.weight * +formValues.totalPackagesCount,
			+formValues.volumetricWeight,
		) || 0.0).toFixed(2));
		setValue('chargeableWeight', (+chargeableWeight || 0.0).toFixed(2));
	}, [formValues.volumetricWeight, formValues.weight, formValues.totalPackagesCount]);

	useEffect(() => {
		setValue('amount', ((chargeableWeight * formValues.ratePerKg) || 0.0).toFixed(2));
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
		setValue('iataCode', '14-3-4525/0005');
		setValue('declaredValueForCarriage', 'NVD');
		setValue('city', 'NEW DELHI');
		setValue('place', 'NEW DELHI');
		setValue('class', 'q');
		setValue('commodity', edit ? `${taskItem.commodity || ''}`
			: `${'SAID TO CONTAIN\n'}${taskItem.commodity || ''}`);
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
		setValue('volumetricWeight', Number(((+totalVolume * 166.67) || 0.0) / 1000000).toFixed(2));
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
								onClick={() => setGenerate(false)}
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
														onClick={() => setGenerate(false)}
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
										<Button
											size="md"
											themeType="primary"
											onClick={() => window.open(packingData?.list[0]?.documentUrl, '_blank')}
											className={styles.packing_button}
										>
											Refer Packing List
										</Button>
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
						style={{ width: '900px' }}
					>
						<Modal.Body style={{ minHeight: '720px' }}>
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
