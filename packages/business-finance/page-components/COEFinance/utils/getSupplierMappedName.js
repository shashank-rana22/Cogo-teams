import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getSupplierMappedName = ({ orgName = '' }) => {
	const entityNameList = GLOBAL_CONSTANTS.supplier_entity_mapping;
	let supplierMappedName = 'default';
	const formattedOrgName = orgName?.replaceAll(' ', '_')?.toLowerCase();
	entityNameList.forEach((singleName) => {
		if (formattedOrgName?.includes(singleName)) {
			supplierMappedName = singleName;
		}
	});
	return supplierMappedName;
};

export default getSupplierMappedName;
