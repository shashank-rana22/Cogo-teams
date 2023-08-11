import { Checkbox, cl, Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import useCreateOrganizationAddress from '../../../../../../../hooks/useCreateOrganizationAddress';
import useCreateOrganizationBillingAddress from '../../../../../../../hooks/useCreateOrganizationBillingAddress';

import FormElement from './FormElement';
import { getModifiedControls } from './getAddAddressControls';
import styles from './styles.module.css';

export const OPTIONS = [
	{ label: 'Factory', value: 'factory' },
	{ label: 'Office', value: 'office' },
	{ label: 'Ware House', value: 'warehouse' },
];

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
	const [countryId, setCountryId] = useState('');
	const {
		handleSubmit,
		formState: { errors },
		control,
		setValue,
		watch,
	} = useForm();

	const countryID = watch('country');

	const addAddressControls = getModifiedControls({ checked, countryID, setValue, setCountryId, countryId });

	const handleCloseModal = () => {
		setAddAddressModal(false);
	};

	const refetchAfterApiCall = () => {
		handleCloseModal();
	};

	const {
		createSellerAddres, createAddressLoading,
		data: billingAddressData,
	} =	useCreateOrganizationBillingAddress({
		refetch: refetchAfterApiCall,
	});

	const {
		apiTrigger: createOrganizationAddress,
		loading,
	} =	useCreateOrganizationAddress({
		refetch: refetchAfterApiCall,
	});

	const onSubmit = async (data) => {
		const updatedData = {
			...data,
			address_type    : checked ? '' : addressType,
			country_id      : countryId,
			organization_id : shipmentData?.importer_exporter?.id,
		};
		if (checked) {
			await createSellerAddres(updatedData, handleCloseModal);
		} else {
			await createOrganizationAddress(updatedData);
		}
		if (billingAddressData?.data?.id) {
			organisationAddress();
			addressApi();
		}
	};

	return (
		<Modal
			show={addAddressModal}
			onClose={handleCloseModal}
			size="md"
		>
			<form>
				<div className={styles.container}>
					<Modal.Header title={(
						<div className={styles.header}>
							<div className={styles.icon_container}>
								<img
									src={GLOBAL_CONSTANTS.image_url.seller_address_svg}
									width="24px"
									height="24px"
									alt="seller_address_logo"
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
						<div className={styles.check_box_wrapper}>
							<Checkbox
								checked={checked}
								onChange={() => {
									setChecked((prevChecked) => {
										const newChecked = !prevChecked;
										if (newChecked) {
											setShowPoc(true);
										}
										return newChecked;
									});
								}}
							/>
							<div className={styles.gst}>Include Tax Number</div>
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

						{(addAddressControls || [])
							.filter((items) => items.name === 'tax_number' && checked)
							.map((item) => (
								<div key={item?.name}>
									<FormElement control={control} errors={errors} {...item} key={item?.name} />
									{!showPoc && (
										<Button
											onClick={() => setShowPoc(!showPoc)}
											type="button"
											size="md"
											themeType="accent"
											className={styles.btn_div}
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
												type="button"

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
						onClick={handleCloseModal}
						disabled={createAddressLoading || loading}
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="button"
						onClick={handleSubmit(onSubmit)}
						disabled={createAddressLoading || loading}
						className={styles.btn_div}
					>
						{createAddressLoading || loading ? (
							<img
								src={GLOBAL_CONSTANTS.image_url.saas_subscription_loading}
								width="40px"
								height="15px"
								alt="loader"
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
