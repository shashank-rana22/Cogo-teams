import { startCase } from '@cogoport/utils';

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

export const recurringExpenseDetails = ({
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

	const handleEntityChange = (e:string | number) => {
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
					style          : { width: '164px' },
				},
				{
					name        : 'registrationNumber',
					label       : 'PAN',
					type        : 'textarea',
					value       : formData.registrationNumber || null,
					style       : { borderRadius: '4px', width: '164px' },
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
					style          : { width: '164px' },
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
					style          : { width: '164px' },
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
					style          : { width: '164px' },
				},
			],
		},
		{
			span    : 12,
			groupBy : [
				{
					name  : 'payableAmount',
					label : 'Payable Amount*',
					type  : 'textarea',
					style : { borderRadius: '4px', width: '164px' },
					span  : 2,
					size  : 'md',
				},
				{
					name    : 'currency',
					label   : 'Currency*',
					type    : 'select',
					span    : 2,
					style   : { borderRadius: '4px', width: '164px' },
					size    : 'md',
					options : [
						{ label: 'INR', value: 'INR' },
						{ label: 'USD', value: 'USD' },
						{ label: 'VN', value: 'VN' },
						{ label: 'GBP', value: 'GBP' }],
				},
				{
					name           : 'repeatEvery',
					label          : 'Repeat Every*',
					type           : 'select',
					clearable      : true,
					multiple       : false,
					defaultOptions : false,
					style          : { width: '164px' },
					span           : 2,
					options        : [
						{ label: 'Week', value: 'WEEK' },
						{ label: '2 Weeks', value: 'TWO_WEEKS' },
						{ label: 'Month', value: 'MONTH' },
						{ label: 'Quarter', value: 'QUARTER' },
						{ label: 'Year', value: 'YEAR' },
					],
				},
				{
					name                  : 'startDate',
					label                 : 'Start Date*',
					type                  : 'datepicker',
					isPreviousDaysAllowed : true,
					span                  : 1.5,
				},
				{
					name                  : 'endDate',
					label                 : 'End Date*',
					type                  : 'datepicker',
					isPreviousDaysAllowed : true,
					span                  : 1.5,
				},

			],

		},
		{
			span    : 12,
			groupBy : [
				{
					name           : 'branch',
					label          : 'Branch',
					type           : 'select',
					clearable      : true,
					multiple       : false,
					defaultOptions : false,
					span           : 2,
					options        : branchOptions,
					style          : { width: '164px' },
				},
				{
					name  : 'agreementNumber',
					label : 'Agreement Number*',
					type  : 'textarea',
					style : { borderRadius: '4px', width: '164px' },
					span  : 2,
					size  : 'md',
				},
			],
		},
		{
			name  : 'description',
			label : 'Description*',
			type  : 'textarea',
			style : { borderRadius: '4px', width: '976px', height: '72px' },
			span  : 12,
			size  : 'md',
		},
		{
			name          : 'uploadedInvoice',
			label         : 'Upload Agreement*',
			type          : 'fileUploader',
			multiple      : true,
			draggable     : true,
			loading       : true,
			dropareaProps : { heading: 'Upload your file here', subHeading: 'supports - jpeg, pdf, docx' },
			style         : { width: '410px' },
			span          : 12,
		},
	];
};
