import { Checkbox, cl, Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import useCreateOrganizationBillingAddress from '../../../../../../../hooks/useCreateOrganizationBillingAddress';

import { useGetControls } from './addAddressControls';
import FormElement from './FormElement';
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
	const {
		handleSubmit,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm();

	const countryId = getValues('country_id');

	const addAddressControls = useGetControls({ checked, countryId, setValue });

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
			size="md"
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
