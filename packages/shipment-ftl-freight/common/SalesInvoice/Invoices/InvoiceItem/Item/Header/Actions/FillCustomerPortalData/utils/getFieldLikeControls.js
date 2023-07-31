import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { companyOptions } from '../../commons/utils/companyOptions';

const SINGLE_VALUE = 1;

function getFieldLikeControls({
	controls = [],
	shipmentData = {},
	setCustomerObj = () => {},
	customerObj = {},
	setValue = () => {},
	entityList = [],
	watch = () => {},
	isFortigoCustomer = true,
	isFortigoInvoicingParty = true,
}) {
	const supportedEntities = Object.values(GLOBAL_CONSTANTS.cogoport_entities).filter(
		(item) => item.feature_supported.includes('ftl_customer_invoice'),
	);

	const updatedControls = controls.map((controlObj) => {
		if (controlObj.name === 'customer_organization') {
			return {
				...controlObj,
				params: {
					filters: {
						organization_id  : shipmentData?.importer_exporter_id,
						trade_party_type : ['self', 'paying_party', 'shipper'],
					},
					other_addresses_data_required           : true,
					billing_addresses_data_required         : true,
					organization_payment_mode_data_required : true,
					organization_data_required              : true,
				},
				onChange: (_, obj) => {
					setValue('customer_pan', obj?.registration_number || undefined);
					setValue('customer_gstin', undefined);
					if (obj?.billing_addresses?.length === SINGLE_VALUE) {
						const {
							tax_number = '',
							address = '',
						} = obj?.billing_addresses?.[GLOBAL_CONSTANTS.zeroth_index] || {};
						setValue('customer_gstin', tax_number);
						setValue('customer_address', address);
					}
					setCustomerObj(obj);
				},
			};
		}
		if (controlObj.name === 'customer_gstin') {
			const { billing_addresses = [] } = customerObj;
			const gstOptions = billing_addresses.map((item) => ({
				label : `${item?.tax_number}/ ${item?.address}`,
				value : item?.tax_number,
				...item,
			}));

			return {
				...controlObj,
				options  : gstOptions,
				onChange : (_, obj) => {
					const item_customer_name = companyOptions.find((item) => item?.value
						?.toLowerCase()
						?.includes(obj?.business_name?.split(' ')
							?.[GLOBAL_CONSTANTS.zeroth_index]?.toLowerCase()))?.value || '';

					setValue('customer_name', item_customer_name);
					setValue('customer_address', obj?.address);
				},
			};
		}
		if (controlObj.name === 'cogo_entity_id') {
			const entityOptions = entityList.map((item) => ({
				label : `${item?.entity_code}, ${item?.business_name}`,
				value : item?.id,
				...item,
			}));

			return {
				...controlObj,
				options: entityOptions,
			};
		}

		if (controlObj.name === 'cogo_entity_address_id') {
			const entityAddressOptions = entityList.reduce((acc, entity) => {
				if (entity?.id === watch('cogo_entity_id')) {
					entity?.addresses?.forEach((item) => {
						acc.push({
							label : `${item?.address}, ${item?.pin_code}, ${item?.gst_number}`,
							value : item?.id,
						});
					});
				}
				return acc;
			}, []);

			return {
				...controlObj,
				options: entityAddressOptions,
			};
		}

		if (controlObj.name === 'business_mode') {
			if (supportedEntities?.length > SINGLE_VALUE) {
				return controlObj;
			}

			if (!isFortigoCustomer || !isFortigoInvoicingParty) {
				return {
					...controlObj,
					onChange: (_, obj) => {
						const entityId = supportedEntities[GLOBAL_CONSTANTS.zeroth_index]?.id;
						const entityObj = entityList.find((item) => item?.id === entityId) || {};
						let reqAddress = {};
						if (obj?.value === 'fcm') {
							reqAddress = entityObj?.addresses?.find(
								(item) => item?.gst_number === GLOBAL_CONSTANTS.others.cogo_mumbai_gst,
							) || {};
						} else {
							reqAddress = entityObj?.addresses?.find(
								(item) => item?.gst_number !== GLOBAL_CONSTANTS.others.cogo_mumbai_gst,
							) || {};
						}
						setValue('cogo_entity_id', entityId);
						setValue('cogo_entity_address_id', reqAddress?.id);
					},
				};
			}
		}

		return controlObj;
	});

	return updatedControls;
}

export default getFieldLikeControls;
