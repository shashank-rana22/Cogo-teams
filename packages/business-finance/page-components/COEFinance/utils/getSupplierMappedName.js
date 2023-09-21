import { ENTITY_NAME_LIST } from '../constants/ENTITY_NAME_LIST';

const getSupplierMappedName = ({ orgName = '' }) => {
	let supplierMappedName = 'default';
	const formattedOrgName = orgName?.replaceAll(' ', '_')?.toLowerCase();
	ENTITY_NAME_LIST.forEach((singleName) => {
		if (formattedOrgName?.includes(singleName)) {
			supplierMappedName = singleName;
		}
	});
	return supplierMappedName;
};

export default getSupplierMappedName;
