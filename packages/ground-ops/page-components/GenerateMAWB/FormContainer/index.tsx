/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Stepper, RadioGroup, Toast, Toggle, Badge } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import Layout from '../../Air/commons/Layout';
import useGetAirFreightSurcharges from '../../Air/hooks/useGetAirFreightSurcharges';
import useCreateShipmentDocument from '../GenerateMawbDoc/useCreateShipmentDocument';
import UploadMAWB from '../UploadMAWB';

import ConfirmModal from './ConfirmModal';
import styles from './styles.module.css';

const items = [
	{ title: 'Basic Details', key: 'basic' },
	{ title: 'Package & Charges Detail', key: 'package' },
	{ title: 'Handling Details', key: 'handling' },
];

const options = [
	{ name: 'Add Manually', value: 'manual', label: 'Add Manually' },
	{ name: 'Upload Document', value: 'upload', label: 'Upload Document' },
];

const DECIMAL_PLACE = 2;
interface NestedObj {
	[key: string]: string | number ;
}

interface FieldType {
	basic?: Array<object>;
	handling?: Array<object>;
	hawb_controls?: Array<object>;
	package?: Array<object>;
}

interface Props {
	back: boolean;
	setBack?:Function;
	setEdit?:Function;
	edit?: boolean | string;
	activeCategory?: string;
	hawbDetails?: Array<NestedObj>;
	setHawbDetails?: Function;
	setActiveHawb?: Function;
	setActiveKey?: (key: string) => void;
	activeHawb?: { [key: string]: boolean | string };
	packingData?:{ [key: string]: Array<string> | Array<URL> };
	fields?:FieldType;
	control?:object;
	errors?:object;
	setValue?:Function;
	item?: NestedObj;
	setGenerate?:Function;
	handleSubmit?: Function;
	category?: string;
	activeKey?: string;
	taskItem?: NestedObj;
	formValues?: { [key: string]: Array<NestedObj> };
	setCustomHawbNumber?: Function;
	cogoSeriesNumber?: Array<number>
}

function FormContainer({
	back = false,
	setBack = () => {},
	edit = false,
	setEdit = () => {},
	packingData = {},
	fields = {},
	control = {},
	errors = {},
	setValue = () => {},
	item = {},
	setGenerate = () => {},
	handleSubmit = () => {},
	category = '',
	activeCategory = '',
	hawbDetails = [],
	setHawbDetails = () => {},
	activeHawb = {},
	setActiveHawb = () => {},
	activeKey = '',
	setActiveKey = () => {},
	taskItem = {},
	formValues = {},
	setCustomHawbNumber = () => {},
	cogoSeriesNumber = [],
}:Props) {
	const [value, onChange] = useState('manual');
	const [confirmDelete, setConfirmDelete] = useState(false);

	const handleDocumentList = (type) => {
		(packingData?.list || []).forEach((itm) => {
			if (itm.documentType === type) {
				window.open(itm.documentUrl, '_blank');
			}
		});
	};

	const { data, getAirFreightSurcharges } = useGetAirFreightSurcharges(taskItem);

	const { upload, loading } = useCreateShipmentDocument({
		edit,
		setGenerate,
		setEdit,
		activeCategory,
		hawbDetails,
		setHawbDetails,
		setActiveHawb,
		setActiveKey,
		activeHawb,
	});

	const onSubmit = () => {
		setBack(true);
	};

	const deleteHAWB = () => {
		const payload = {
			state               : 'document_rejected',
			id                  : taskItem?.id,
			performed_by_org_id : taskItem?.serviceProviderId,
			shipment_id         : taskItem?.shipmentId,
			service_id          : taskItem?.serviceId,
			document_type       : 'draft_house_airway_bill',
		};
		if (edit) {
			if (activeHawb.isNew === false) {
				upload({ payload });
			}
			setHawbDetails((prev) => prev.filter((itm) => itm.id !== activeHawb.id));
			setActiveHawb(hawbDetails.find((ele) => ele.id !== activeHawb.id));
		} else {
			Toast.error('Cannot be deleted in create mode');
		}
		setConfirmDelete(false);
	};

	function RemoveHawb() {
		return (
			<Button
				onClick={() => { setConfirmDelete(true); }}
				themeType="secondary"
				style={{ border: '1px solid #333', marginLeft: '8%' }}
				disabled={hawbDetails.length === 1}
			>
				REMOVE
			</Button>
		);
	}

	const calculateCharges = () => {
		const updatedCharges = (formValues.carrierOtherCharges || []).map((charge) => {
			let price:number = 0;
			price = Number(
				(Number(charge.chargeUnit) * Number(charge.quantity))
					.toFixed(DECIMAL_PLACE),
			);
			return { ...charge, price };
		});
		setValue('carrierOtherCharges', updatedCharges);
	};

	useEffect(() => {
		if (taskItem?.status === 'uploaded') {
			onChange('upload');
		} else {
			onChange('manual');
		}
	}, [taskItem?.status]);

	useEffect(() => {
		if (!isEmpty(taskItem)) {
			getAirFreightSurcharges();
		}
	}, []);

	useEffect(() => {
		const { line_items: lineItems } = data?.surcharge || {};
		if (lineItems && !edit) {
			const carrierChargesData = (lineItems || []).map((lineItem) => (
				{
					code       : lineItem?.code,
					unit       : lineItem?.unit,
					chargeUnit : lineItem?.price,
				}
			));

			setValue('carrierOtherCharges', carrierChargesData);
		}
	}, [data?.surcharge]);

	return (
		<div className={styles.form_container}>
			<div className={styles.header_flex}>
				{activeCategory === 'hawb' && (
					<div className={styles.buttonwrap}>
						{(hawbDetails || []).map((hawbItem) => (
							<div
								key={hawbItem.id}
								onClick={() => {
									setActiveHawb(hawbItem);
								}}
								role="presentation"
							>
								{' '}
								<div
									className={hawbItem.id
                                === activeHawb.id ? styles.hawb_container_click : styles.hawb_container}
								>
									{!hawbItem?.documentNo
									&& `HAWB - ${hawbItem.id}`}
									{' '}
									{hawbItem?.documentNo}
									{' '}
									{hawbItem.isNew && <Badge color="#ee3425" size="md" text="NOT SAVED" />}
								</div>
							</div>
						))}

						<Button
							onClick={() => {
								setHawbDetails((prev) => ([...prev, {
									id: uuid(),
									documentNo:
									!isEmpty(cogoSeriesNumber)
										? `COGO-${cogoSeriesNumber[cogoSeriesNumber.length - 1] + 1}`
										: `COGO-${taskItem.serialId}${
											(hawbDetails.length + 1).toString().padStart(2, '0')}`,
									isNew: true,
								}]));
							}}
							themeType="secondary"
						>
							<IcMPlus />
						</Button>

					</div>
				)}
				{value === 'manual' && activeCategory === 'mawb' && (
					<Stepper
						active={activeKey}
						setActive={setActiveKey}
						items={items}
					/>
				)}
				{!edit && (
					<RadioGroup
						options={options}
						onChange={onChange}
						value={value}
						style={{ marginLeft: 'auto', height: '4%' }}
					/>
				)}
				{edit && item?.remarks && (
					<p className={styles.remark}>
						<span>Remark for Amendment:</span>
						{item?.remarks?.toString()}
					</p>
				)}
			</div>
			{value === 'manual' && activeCategory === 'hawb' && (
				<Stepper
					active={activeKey}
					setActive={setActiveKey}
					items={items}
				/>
			)}
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
			{value === 'upload' ? (
				<UploadMAWB
					item={item}
					edit={edit}
					taskItem={taskItem}
					setEdit={setEdit}
					setGenerate={setGenerate}
					activeCategory={activeCategory}
					activeHawb={activeHawb}
					hawbDetails={hawbDetails}
					setHawbDetails={setHawbDetails}
					setActiveHawb={setActiveHawb}
					category={category}
				/>
			) : (
				<>
					{activeKey === 'basic' && (
						<>
							{activeCategory === 'hawb' && (
								<>
									<Toggle
										name="document_number"
										size="sm"
										disabled={!activeHawb.isNew}
										onLabel="Custom Series"
										offLabel="COGO Series"
										onChange={() => setCustomHawbNumber((prev) => !prev)}
									/>
									<Layout
										fields={fields?.hawb_controls}
										errors={errors}
										control={control}
									/>
								</>
							)}
							<Layout fields={fields?.basic} control={control} errors={errors} />
							<div className={styles.button_container}>
								{activeCategory === 'hawb' && (
									<RemoveHawb />
								)}
								{!back ? (
									<div className={styles.button_div}>
										<Button
											onClick={() => {
												setGenerate(false);
												setEdit(false);
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
					{activeKey === 'package' && (
						<>
							<Layout fields={fields?.package} control={control} errors={errors} />
							<div className={styles.calcuate_button}>
								<Button
									size="sm"
									themeType="accent"
									onClick={() => {
										calculateCharges();
									}}
								>
									Calculate

								</Button>
							</div>
							<div className={styles.button_container}>
								{activeCategory === 'hawb' && (
									<RemoveHawb />
								)}
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

					{activeKey === 'handling' && (
						<>
							<Layout fields={fields?.handling} control={control} errors={errors} />
							<div className={styles.button_container}>
								{activeCategory === 'hawb' && (
									<RemoveHawb />
								)}
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
											Generate
											{' '}
											{taskItem?.documentType === 'draft_house_airway_bill'
												? 'House' : 'Master'}
											{' '}
											Airway Bill
										</Button>
									</div>
								) : null}
							</div>
						</>
					)}
				</>
			)}
			{confirmDelete && (
				<ConfirmModal
					confirmDelete={confirmDelete}
					setConfirmDelete={setConfirmDelete}
					activeHawb={activeHawb}
					loading={loading}
					deleteHAWB={deleteHAWB}
				/>
			)}
		</div>
	);
}

export default FormContainer;
