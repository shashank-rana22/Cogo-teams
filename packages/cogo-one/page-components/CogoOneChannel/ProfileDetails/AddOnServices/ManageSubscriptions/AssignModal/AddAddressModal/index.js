import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import useGetControls from '../../../../../../../configurations/billing-controls';
import useCreateBillingAddres from '../../../../../../../hooks/useCreateBillingAddres';

import Form from './Form';
import styles from './styles.module.css';

function AddAddressModal({
	addAddressModal = false, setAddAddressModal = () => {}, setSelectedAddress = () => {},
	getOrganizationAddresses = () => {}, orgId = '',
}) {
	const [cityState, setCityState] = useState({});

	const { city = '', state = '' } = cityState || {};

	const addAddressControls = useGetControls({
		setCityState,
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		reset,
	} = useForm();

	const isIncludeTaxNumber = watch('include_tax_number');

	const { createBillingAddress = () => {}, loading = false } = useCreateBillingAddres({
		isIncludeTaxNumber,
		getOrganizationAddresses,
		orgId,
		setAddAddressModal,
		reset,
		setSelectedAddress,
	});

	const onSubmit = (data) => {
		createBillingAddress({ data });
	};

	useEffect(() => {
		setValue('city', city);
		setValue('state', state);
	}, [city, setValue, state]);

	return (
		<Modal
			show={addAddressModal}
			placement="top"
			size="md"
			closeOnOuterClick={false}
			onClose={() => setAddAddressModal(false)}
		>
			<Modal.Header title={(
				<div className={styles.icon_container}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.seller_address_svg}
						width={30}
						height={30}
						alt="location"
					/>
					<div className={styles.modal_heading}>Add Address</div>
				</div>
			)}
			/>
			<Modal.Body className={styles.modal_body_resolution}>
				<Form
					addAddressControls={addAddressControls}
					isIncludeTaxNumber={isIncludeTaxNumber}
					control={control}
					errors={errors}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="tertiary"
					disabled={loading}
					onClick={() => setAddAddressModal(false)}
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit(onSubmit)}
					loading={loading}
					className={styles.add_new_address_button}
				>
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddAddressModal;
