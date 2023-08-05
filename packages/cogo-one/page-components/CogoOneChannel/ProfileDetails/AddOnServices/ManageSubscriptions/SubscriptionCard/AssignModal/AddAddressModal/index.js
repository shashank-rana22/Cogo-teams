import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React, { useState, useMemo } from 'react';

import { useGetControls } from '../../../../../../../../configurations/billing-controls';
import useCreateBillingAddres from '../../../../../../../../hooks/useCreateBillingAddres';
import { getFieldController } from '../../../../../../../../utils/getFieldController';

import Form from './Form';
import styles from './styles.module.css';

function AddAddressModal({
	addAddressModal = false, setAddAddressModal = () => {},
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

	const { createBillingAddress = () => {}, loading } = useCreateBillingAddres({
		isIncludeTaxNumber,
		getOrganizationAddresses,
		orgId,
		setAddAddressModal,
		reset,
	});

	const returnFieldFunction = ({ item = {} }) => {
		const { label = '', name = '', type = '' } = item || {};
		const Element = getFieldController(type);

		if (!Element) {
			return null;
		}

		return (
			<div className={styles.element_column} key={label}>
				<div className={styles.form_item_styled}>
					{type !== 'checkbox' && <div>{label}</div>}
					<Element
						{...item}
						control={control}
						error={errors?.[item.name]}
					/>
				</div>
				<div className={styles.error_text}>
					{(errors?.[name] && (errors[name]?.message || 'required'))}
				</div>
			</div>
		);
	};

	const onSubmit = (data) => {
		createBillingAddress({ data });
	};

	useMemo(() => {
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
					returnFieldFunction={returnFieldFunction}
					isIncludeTaxNumber={isIncludeTaxNumber}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="tertiary"
					onClick={() => setAddAddressModal(false)}
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit(onSubmit)}
					disabled={loading}
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
