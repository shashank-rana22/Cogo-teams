import { Toast, Checkbox, cl, Modal, Button } from '@cogoport/components';
import {
	InputController, MobileNumberController,
	SelectController, TextAreaController, UploadController, useForm,
	AsyncSelectController,
} from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useMemo } from 'react';

import useCreateOrganizationBillingAddress from '../../../../../../../hooks/useCreateOrganizationBillingAddress';
import useGetStateFromPincode from '../../../../../../../hooks/useGetStateFromPincode';

import { useGetControls } from './addAddressControls';
import styles from './styles.module.css';

export const OPTIONS = [
	{ label: 'Factory', value: 'factory' },
	{ label: 'Office', value: 'office' },
	{ label: 'Ware House', value: 'warehouse' },
];

const CONTROL_TYPE_MAPPING = {
	file         : UploadController,
	text         : InputController,
	number       : InputController,
	textarea     : TextAreaController,
	select       : SelectController,
	mobileSelect : MobileNumberController,
	async_select : AsyncSelectController,
};

const VALIDATION_ERROR = ['required', 'pattern', 'maxLength', 'length'];
const INDEX_LIMIT_FOR_ADDRESS_CONTROLS = 6;

function AddModal({
	addAddressModal = false,
	setAddAddressModal = () => {},
	addressApi = () => {},
	organisationAddress = () => {},
	shipmentData = {},
}) {
	const [checked, setChecked] = useState(false);
	const [showPoc, setShowPoc] = useState(false);
	const [addressType, setAddressType] = useState('office');
	const addAddressControls = useGetControls({ checked });
	const {
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		control,
	} = useForm();

	const handleCloseModal = () => {
		setAddAddressModal(false);
	};

	const refetchAfterApiCall = () => {
		handleCloseModal();
	};

	const { createSellerAddres, createAddressLoading, response } =	useCreateOrganizationBillingAddress({
		checked,
		addressType,
		organization_id : shipmentData?.importer_exporter?.id,
		refetch         : refetchAfterApiCall,
	});

	const pincode = watch('pincode');

	const { cityState } = useGetStateFromPincode({ pincode, policyForSelf: false });
	const { list } = cityState || {};
	const { region, city } = list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	useMemo(() => {
		if (isEmpty(list)) {
			Toast.error('Invalid Pincode');
		}
		if (city || region?.name) {
			setValue('city', city?.name);
			setValue('state', region?.name);
		}
	}, [list, city, region?.name, setValue]);

	function FormElement({ name, label, errorss, type, span, ...rest }) {
		const Element = CONTROL_TYPE_MAPPING[type];
		return Element ? (
			<div>
				<div className={styles.label}>{label}</div>
				<Element
					name={name}
					type={type}
					{...rest}
					className={`${
						name === 'tax_number' ? styles.taxNumber : ''
					} element input`}
				/>
				{errorss?.[name] ? <div>{errorss?.[name]?.message}</div> : null}
				{VALIDATION_ERROR.includes(errors[name]?.type) ? (
					<div className={styles.text} size={10} color="#CB6464">
						{errors[name]?.message}
					</div>
				) : null}
			</div>
		) : null;
	}

	const onSubmit = async (data) => {
		await createSellerAddres(data, handleCloseModal);
		if (response?.data?.id) {
			organisationAddress();
			addressApi();
		}
	};

	return (
		<Modal
			show={addAddressModal}
			onClose={handleCloseModal}
			width="600"
		>
			<form>
				<div className={styles.container}>
					<Modal.Header title={(
						<div className={styles.header}>
							<div className={styles.icon_container}>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/sellerAddress.svg"
									width="24px"
									height="24px"
									alt=""
								/>
							</div>
							<div className={styles.title}>Add New Address</div>
						</div>
					)}
					/>

					<div className={styles.section}>
						<div className={styles.section_title}>
							<div className="title">Billing Details</div>
						</div>

						<div className={styles.row}>
							{(addAddressControls || [])
								.filter((items, index) => index < INDEX_LIMIT_FOR_ADDRESS_CONTROLS)
								.map((item) => (
									<FormElement
										control={control}
										errors={errors}
										{...item}
										key={item?.name}
									/>
								))}
						</div>

						<div className={styles.check_box_wrapper}>
							<Checkbox
								checked={checked}
								onChange={() => {
									setChecked(!checked);
									if (!checked) {
										setShowPoc(false);
									}
								}}
							/>
							<div className={styles.gst}>Include Tax Number</div>
						</div>

						{(addAddressControls || [])
							.filter((items) => items.name === 'tax_number' && checked)
							.map((item) => (
								<div key={item?.name}>
									<FormElement control={control} errors={errors} {...item} key={item?.name} />
									{!showPoc && (
										<Button
											onClick={() => setShowPoc(!showPoc)}
											size="md"
											themeType="accent"
											style={{ marginTop: '16px' }}
										>
											<IcMPlus />
											{' '}
											Add POC
										</Button>
									)}
								</div>
							))}

						<div className={styles.row}>
							{(addAddressControls || [])
								.filter((items, index) => index > INDEX_LIMIT_FOR_ADDRESS_CONTROLS
								&& showPoc && checked)
								.map((item) => (
									<FormElement
										control={control}
										errors={errors}
										{...item}
										key={item?.name}
									/>
								))}
						</div>

						{!checked && (
							<div className={styles.addressType}>
								<div className={styles.addressSave}>Save address as</div>
								<div className={styles.addresses}>
									{OPTIONS.map((item) => (
										<div
											key={item.label}
											className={cl`${item.value === addressType
												? styles.active : styles.inactive} ${styles.filter_by_buttons}`}
										>
											<Button
												onClick={() => setAddressType(item.value)}
												size="xs"
											>
												{item.label}
											</Button>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				<Modal.Footer>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => handleCloseModal()}
						disabled={createAddressLoading}
						style={{ padding: '10px' }}
					>
						Cancel
					</Button>

					<Button
						size="md"
						themeType="primary"
						onClick={handleSubmit(onSubmit)}
						disabled={createAddressLoading}
						style={{ marginLeft: '16px', padding: '10px' }}
					>
						{createAddressLoading ? (
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
								width="40px"
								height="15px"
								alt=""
							/>
						) : (
							'Add'
						)}
					</Button>

				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default AddModal;
