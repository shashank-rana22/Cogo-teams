import { Flex, Text } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { forwardRef, useImperativeHandle, useEffect } from 'react';

// import ControlledTextArea from '../../commons/ControlledTextArea';

import { ExtraHardCodeData } from './ExtraHardCodeData';
import { formmatedValues } from './formmatedValues';
import { HeaderPart } from './HeaderPart';
import { leftDataControls } from './leftDataControl';
import styles from './styles.module.css';
import { tableDetailControls } from './TableDetailControls';

function Frontside({ noFormat, initialValues, mode }, ref) {
	const formatValues = formmatedValues(initialValues);

	const service_type = formatValues?.service_type;

	const { control, handleSubmit, setValue } = useForm({ formatValues });
	const isReadonly = mode === 'read';

	useEffect(() => {
		Object.keys(formatValues || {}).forEach((key) => {
			setValue(key, formatValues[key]);
		});
	}, []);

	useImperativeHandle(ref, () => ({
		handleSubmit,
	}));

	const leftSideFields = [];

	for (let i = 0; i < leftDataControls[service_type].length;) {
		const obj = leftDataControls[service_type][i];
		if (obj.fullWidth) {
			leftSideFields.push(
				<div className={styles.block}>
					<Text
						className="hidden-no-format"
						size={14}
						style={{ width: '150px' }}
					>
						{obj.label}
					</Text>
					<div style={{ width: '100%', height: 'fit-content' }}>
						{/* <ControlledTextArea
							control={control}
							name={`${obj.name}`}
							setValue={setValue}
							rows={3}
							isReadonly={isReadonly}
							id={`${obj.name}_cargo_arrival`}
						/> */}
					</div>
				</div>,
			);
			i += 1;
		} else if (i + 1 < leftDataControls[service_type].length) {
			leftSideFields.push(
				<div style={{ display: 'flex' }}>
					<div className={styles.block} style={{ width: '50%' }}>
						<Text
							className="hidden-no-format"
							size={14}
							style={{ width: '150px' }}
						>
							{obj.label}
						</Text>
						<div style={{ height: 'fit-content' }}>
							{/* <ControlledTextArea
								control={control}
								name={`${obj.name}`}
								setValue={setValue}
								rows={3}
								isReadonly={isReadonly}
								id={`${obj.name}_cargo_arrival`}
							/> */}
						</div>
					</div>
					<div className={styles.block} className="borderless-no-format" style={{ width: '50%' }}>
						<Text
							className="hidden-no-format"
							size={14}
							style={{ width: '150px' }}
						>
							{leftDataControls[service_type][i + 1].label}
						</Text>
						<div style={{ height: 'fit-content' }}>
							{/* <ControlledTextArea
								control={control}
								name={`${leftDataControls[service_type][i + 1].name}`}
								setValue={setValue}
								rows={3}
								isReadonly={isReadonly}
								id={`${leftDataControls[service_type][i + 1]}_cargo_arrival`}
							/> */}
						</div>
					</div>
				</div>,
			);
			i += 2;
		} else {
			leftSideFields.push(
				<div className={styles.block}>
					<Text
						className="hidden-no-format"
						size={14}
						style={{ width: '150px' }}
					>
						{obj.label}
					</Text>
					<div style={{ width: '100%', height: 'fit-content' }}>
						{/* <ControlledTextArea
							control={control}
							name={`${obj.name}`}
							setValue={setValue}
							rows={3}
							isReadonly={isReadonly}
							id={`${obj.name}_cargo_arrival`}
						/> */}
					</div>
				</div>,
			);
			i += 1;
		}
	}

	const tableDetails = [];

	for (let i = 0; i < tableDetailControls[service_type].length; i += 1) {
		tableDetails.push(
			<div className={styles.block} direction="column">
				<Text className="hidden-no-format" size={10}>
					{tableDetailControls[service_type][i].label}
				</Text>
				<div style={{ height: 'fit-content' }}>
					{/* <ControlledTextArea
						control={control}
						name={`${tableDetailControls[service_type][i].name}`}
						setValue={setValue}
						rows={3}
						isReadonly={isReadonly}
						id={`${tableDetailControls[service_type][i].name}_cargo_arrival`}
					/> */}
				</div>
			</div>,
		);
	}

	return (
		<div className={styles.page}>
			<div className={`trade-doc-inner-page ${noFormat ? 'no-format' : ''}`}>
				<HeaderPart />
				<Flex>
					<div style={{ width: '35%' }}>
						<div className={styles.block}>
							<Text
								className="hidden-no-format"
								size={14}
								style={{ width: '150px' }}
							>
								Notify Party (Broker):
							</Text>
							<div style={{ width: '100%', height: 'fit-content' }}>
								{/* <ControlledTextArea
									control={control}
									name="notify_party"
									setValue={setValue}
									rows={5}
									isReadonly={isReadonly}
									id="notify_party_cargo_arrival"
								/> */}
							</div>
						</div>
						<div className={styles.block}>
							<Text
								className="hidden-no-format"
								size={14}
								style={{ width: '150px' }}
							>
								Consignee :
							</Text>
							<div style={{ width: '100%', height: 'fit-content' }}>
								{/* <ControlledTextArea
									control={control}
									name="consignee"
									setValue={setValue}
									rows={5}
									isReadonly={isReadonly}
									id="consignee_cargo_arrival"
								/> */}
							</div>
						</div>
						<div className={styles.block}>
							<Text
								className="hidden-no-format"
								size={14}
								style={{ width: '150px' }}
							>
								Shipper:
							</Text>
							<div style={{ width: '100%', height: 'fit-content' }}>
								{/* <ControlledTextArea
									control={control}
									name="shipper"
									setValue={setValue}
									rows={4}
									isReadonly={isReadonly}
									id="shipper_cargo_arrival"
								/> */}
							</div>
						</div>
					</div>
					<div style={{ width: '65%' }}>
						<div className={styles.block}>
							<Text
								className="hidden-no-format"
								size={14}
								style={{ width: '150px' }}
							>
								Job Reference number:
							</Text>
							<div style={{ width: '100%', height: 'fit-content' }}>
								{/* <ControlledTextArea
									control={control}
									name="job_ref_no"
									setValue={setValue}
									rows={3}
									isReadonly={isReadonly}
									id="job_ref_no_cargo_arrival"
								/> */}
							</div>
						</div>
						<div className={styles.block}>
							<Text
								className="hidden-no-format"
								size={14}
								style={{ width: '150px' }}
							>
								Invoice reference number :
							</Text>
							<div style={{ width: '100%', height: 'fit-content' }}>
								{/* <ControlledTextArea
									control={control}
									name="inv_ref_no"
									setValue={setValue}
									rows={3}
									isReadonly={isReadonly}
									id="inv_ref_no_cargo_arrival"
								/> */}
							</div>
						</div>
						<div className={styles.block}>
							<Text
								className="hidden-no-format"
								size={14}
								style={{ width: '150px' }}
							>
								IGM dt :
							</Text>
							<div style={{ width: '100%', height: 'fit-content' }}>
								{/* <ControlledTextArea
									control={control}
									name="igm_dt"
									setValue={setValue}
									rows={3}
									isReadonly={isReadonly}
									id="igm_dt_cargo_arrival"
								/> */}
							</div>
						</div>
						<div className={styles.block}>
							<Text
								className="hidden-no-format"
								size={14}
								style={{ width: '150px' }}
							>
								From :
							</Text>
							<div style={{ width: '100%', height: 'fit-content' }}>
								{/* <ControlledTextArea
									control={control}
									name="port_of_loading"
									setValue={setValue}
									rows={3}
									isReadonly={isReadonly}
									id="port_of_loading_cargo_arrival"
								/> */}
							</div>
						</div>
					</div>
				</Flex>
				<Flex>
					<Flex direction="column" height={50}>
						<Text
							size={16}
							style={{
								width      : '150px',
								marginTop  : '10px',
								marginLeft : '10px',
							}}
						>
							Shipment details :
						</Text>
					</Flex>
				</Flex>
				<div style={{ width: '100%' }}>
					{leftSideFields.map((element) => element)}
				</div>

				<Flex height={100}>
					{tableDetails.map((obj) => obj)}
				</Flex>
			</div>
			<div style={{ width: '40%', display: 'flex', marginTop: '10px' }}>
				<div className={styles.block}>
					<Text size={14} style={{ width: '150px' }}>
						Tan No :
					</Text>
					<div style={{ width: '100%', height: 'fit-content' }}>
						{/* <ControlledTextArea
							control={control}
							name="tan"
							setValue={setValue}
							rows={1}
							isReadonly={isReadonly}
							id="tan_cargo_arrival"
						/> */}
					</div>
				</div>
				<div className={styles.block}>
					<Text size={14} style={{ width: '150px' }}>
						Pan No :
					</Text>
					<div style={{ width: '100%', height: 'fit-content' }}>
						{/* <ControlledTextArea
							control={control}
							name="pan"
							setValue={setValue}
							rows={1}
							isReadonly={isReadonly}
							id="pan_cargo_arrival"
						/> */}
					</div>
				</div>
			</div>
			<ExtraHardCodeData />
		</div>
	);
}

export default forwardRef(Frontside);
