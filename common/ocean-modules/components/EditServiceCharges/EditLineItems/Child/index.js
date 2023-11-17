import { cl } from '@cogoport/components';
import { ENTITY_IDS_MAPPING } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { getByKey, isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import Item from '../../../Layout/Item';

import styles from './styles.module.css';

const INDEX_UPTO_REMOVE_ITEM = 1;
const FIELDS_CAN_BE_CHANGED = ['alias', 'price_discounted'];
// const UNEDITABLE_FOR_COUNTRY_CODE = ['CN', 'ID'];
const AUTHORISED_USER_IDS = [GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id, GLOBAL_CONSTANTS.uuid.linh_nguyen_duy_user_id,
	GLOBAL_CONSTANTS.uuid.santram_gurjar_user_id];

const priceDisabled = (
	controlItem,
	code,
	field,
	shipment_type,
	path,
	disable_edit_invoice = true,
	isAuthorised = false,
	unEditable = false,
	service_name = '',
) => {
	if (
		(shipment_type === 'fcl_freight'
		&& service_name !== 'fcl_freight_local_service'
		&& !isEmpty(field?.code)
		&& (!FIELDS_CAN_BE_CHANGED.includes(controlItem?.name) || unEditable)
		&& path === 'sales_invoice'
		&& disable_edit_invoice
		&& !isAuthorised)
		|| (field?.code === 'BookingCONV' && (!FIELDS_CAN_BE_CHANGED.includes(controlItem?.name) || unEditable))
	) {
		return true;
	}

	return controlItem?.disabled;
};

function Child({
	control = {},
	controls = [],
	index = 0,
	name = '',
	field = {},
	remove = () => {},
	customValues = {},
	showDeleteButton = true,
	error = {},
	disableServiceEdit = false,
	formValues = {},
	shipment_type = '',
	path = '',
	service_name = '',
	entity_id = '',
}) {
	const profileData = useSelector(({ profile }) => profile);

	const disable_edit_invoice = getByKey(
		ENTITY_IDS_MAPPING[entity_id] || {},
		'others.navigations.bookings.invoicing.disable_edit_invoice',
	);

	const isAuthorised = AUTHORISED_USER_IDS.includes(profileData?.user?.id);
	const unEditable = GLOBAL_CONSTANTS.service_charge_uneditable_country_code
		.includes(profileData?.partner?.country?.country_code);

	// can delete  only new added line items for FCL
	const isLineItemRemovable = (shipment_type === 'fcl_freight' && service_name !== 'fcl_freight_local_service'
		&& !isEmpty(field?.code) && path === 'sales_invoice' && disable_edit_invoice && !isAuthorised)
		|| (field?.code === 'BookingCONV')
		? false
		: showDeleteButton;

	const keys = useMemo(
		() => Array(controls.length).fill(null).map(() => Math.random()),
		[controls.length],
	);

	return (
		<div className={styles.container}>
			<div className={styles.item_container}>
				{controls?.map((controlItem, i) => {
					const { render, flex = '16.6%' } = controlItem || {};

					if (controlItem?.type === 'static') {
						return (
							<div style={{ width: flex }} className={styles.static_container} key={keys[i]}>
								{render ? render(customValues) : customValues?.[controlItem?.name]}
							</div>
						);
					}

					return (
						<Item
							{...controlItem}
							key={`${name}.${index}.${controlItem?.name}`}
							name={`${name}.${index}.${controlItem?.name}`}
							value={field?.[controlItem?.name]}
							control={control}
							source="edit_line_items"
							disabled={priceDisabled(
								controlItem,
								formValues?.code,
								field,
								shipment_type,
								path,
								disable_edit_invoice,
								isAuthorised,
								unEditable,
								service_name,
							)}
							label={controlItem?.label}
							error={error?.[controlItem.name]}
						/>
					);
				})}

				{showDeleteButton && isLineItemRemovable
					? (
						<IcMDelete
							width={20}
							height={20}
							onClick={!disableServiceEdit ? () => remove(index, INDEX_UPTO_REMOVE_ITEM) : null}
							className={
						cl`${disableServiceEdit ? styles.disableServiceEdit : styles.delete_button_container}`
}
						/>
					) : null}
			</div>
		</div>
	);
}
export default Child;
