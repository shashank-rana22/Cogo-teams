import { startCase } from '@cogoport/utils';

import { MONTH_OPTIONS } from '../constants/MONTH_OPTIONS';
import { officeLocations } from '../utils/officeLocations';

interface FormDataInterface {
	registrationNumber?: string,
	entityObject?:{ id?:string },
	periodOfTransaction?:string,
	vendorName?:string,
	expenseCategory?:string,
}

interface EntityInt {
	id?:string | number,
	entity_code?:string,
	business_name?:string
}

interface Props {
	formData: FormDataInterface,
	setFormData: (obj:any)=>void,
	categoryOptions: object[],
	subCategoryOptions:object[],
	setCategoryOptions: (obj:any)=>void,
	setSubCategoryOptions:(obj:any)=>void,
	branchOptions: object,
	setBranchOptions: (obj:any)=>void,
	entityList: EntityInt[],
	entityOptions: object[],
	setEntityOptions: (obj:any)=>void,
}

interface ObjInt {
	category?:string,
	sub_category?:string,
	cogoport_office_id?:string | number,
	cogo_entity_id?:string,
}

interface VendorObject {
	services?: ObjInt[],
	business_name?:string,
	registration_number?:string | number,
	id?:string | number,
	serial_id?: number | string,
}

export const nonRecurringExpenseDetails = ({
	formData,
	setFormData,
	categoryOptions,
	setCategoryOptions,
	subCategoryOptions,
	setSubCategoryOptions,
	branchOptions,
	setBranchOptions,
	entityList,
	entityOptions,
	setEntityOptions,
}:Props) => {
	const handleVendorChange = (obj:VendorObject) => {
		setCategoryOptions(obj?.services?.map((service) => (
			{
				label : startCase(service?.category)?.replaceAll('_', ' '),
				value : service?.category,
			}
		)));
		setSubCategoryOptions(obj?.services?.map((service) => ({
			label : startCase(service?.sub_category)?.replaceAll('_', ' '),
			value : service?.sub_category,
		})));

		const branchIds = obj?.services?.map((service) => service?.cogoport_office_id);

		if (branchIds?.length > 0) {
			const branches = [];

			branchIds.forEach((id) => {
				(officeLocations || []).forEach((location) => {
					if (id === JSON.parse(location?.value)?.branchId) {
						branches.push(location);
					}
				});
			});
			setBranchOptions([...branches]);
		}

		const fetchedEntities = obj?.services?.map((service) => service?.cogo_entity_id);

		if (entityList?.length > 0) {
			const entities = [];
			(fetchedEntities || []).forEach((singleEntity) => {
				(entityList || []).forEach((entity) => {
					const { id, entity_code:entityCode, business_name:name } = entity || {};
					if (singleEntity === id) {
						entities.push({
							label : `${entityCode}-${name}`,
							value : id,
						});
					}
				});
			});
			setEntityOptions([...entities]);
		}

		setFormData({
			...formData,
			vendorName         : obj?.business_name,
			registrationNumber : obj?.registration_number,
			vendorID           : obj?.id,
			vendorSerialId     : obj?.serial_id,
			vendorData         : obj,
		});
	};

	const handleEntityChange = (e:any) => {
		const entityData = entityList?.filter((entityItem) => entityItem.id === e)?.[0];
		setFormData({
			...formData,
			entityObject: entityData,
		});
	};

	return [
		{
			span    : 12,
			groupBy : [
				{
					name           : 'vendorName',
					label          : 'Vendor Name*',
					type           : 'asyncSelect',
					asyncKey       : 'list_vendors',
					value          : formData?.vendorName,
					onChange       : (item:any, obj:object) => handleVendorChange(obj),
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Vendor name',
					span           : 2,
					initialCall    : false,
					style          : { width: '220px' },
				},
				{
					name                  : 'invoiceDate',
					label                 : 'Invoice Date*',
					type                  : 'datepicker',
					isPreviousDaysAllowed : true,
					span                  : 1.5,
				},
				{
					name                  : 'transactionDate',
					label                 : 'Transaction Date*',
					type                  : 'datepicker',
					isPreviousDaysAllowed : true,
					span                  : 1.5,
				},
				{
					name           : 'periodOfTransaction',
					label          : 'Period Of Transaction*',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Select Month',
					span           : 2,
					value          : formData?.periodOfTransaction,
					onChange       : (month:string) => setFormData({ ...formData, periodOfTransaction: month }),
					options        : MONTH_OPTIONS,
				},
				{
					name           : 'cogoEntity',
					label          : 'Cogo Entity*',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Entity',
					span           : 2,
					options        : entityOptions,
					value          : formData?.entityObject?.id,
					onChange       : (e:any) => handleEntityChange(e),
				},
			],
		},
		{
			span    : 12,
			groupBy : [
				{
					name        : 'registrationNumber',
					label       : 'PAN',
					type        : 'textarea',
					value       : formData.registrationNumber || null,
					style       : { borderRadius: '4px' },
					placeholder : 'Autofilled PAN',
					span        : 2,
				},
				{
					name           : 'expenseCategory',
					label          : 'Expense Category*',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Category',
					value          : formData?.expenseCategory,
					span           : 2,
					options        : categoryOptions,
				},
				{
					name           : 'expenseSubCategory',
					label          : 'Expense Sub-Category*',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Sub-Category',
					span           : 2,
					options        : subCategoryOptions,
				},
				{
					name           : 'branch',
					label          : 'Branch',
					type           : 'select',
					clearable      : true,
					multiple       : false,
					defaultOptions : false,
					span           : 2,
					options        : branchOptions,
				},
				{
					name           : 'paymentMode',
					label          : 'Payment Mode',
					type           : 'select',
					clearable      : true,
					multiple       : false,
					defaultOptions : false,
					span           : 2,
					options        : [
						{ label: 'Pay Run', value: 'payrun' },
					],
				},
			],

		},
	];
};
