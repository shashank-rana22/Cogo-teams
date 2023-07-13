import getGeoConstants from '@cogoport/globalization/constants/geo';

import { MONTH_OPTIONS } from '../constants/MONTH_OPTIONS';

import styles from './styles.module.css';

interface FormDataInterface {
	registrationNumber?: string;
	entityObject?: { id?: string };
	periodOfTransaction?: string;
	vendorName?: string;
	transactionDate?: string;
}

interface EntityInt {
	id?: string | number;
	entity_code?: string;
	business_name?: string;
}

interface Props {
	formData: FormDataInterface;
	setFormData: (obj: any) => void;
	categoryOptions: object[];
	subCategoryOptions: object[];
	setCategoryOptions: (obj: any) => void;
	setSubCategoryOptions: (obj: any) => void;
	branchOptions: object;
	setBranchOptions: (obj: any) => void;
	entityList: EntityInt[];
	entityOptions: object[];
	setEntityOptions: (obj: any) => void;
	handleVendorChange?: (obj: any) => void;
}

const getMontOptions = (minMonth) => {
	const date = minMonth ? new Date(minMonth) : new Date();
	const options = MONTH_OPTIONS.filter(
		(option) => option.key > date.getMonth(),
	);
	return options;
};
interface Item {
	country_id: string,
}

export const nonRecurringExpenseDetails = ({
	formData,
	setFormData,
	branchOptions,
	entityList,
	entityOptions,
	handleVendorChange = () => {},
}:Props) => {
	const geo = getGeoConstants();
	const LIST_ENTITIES_OPTIONS = geo.navigations.over_heads.region_specific_cogo_entities;
	const handleEntityChange = (e:number | string) => {
		const entityData = entityList?.filter((entityItem) => entityItem.id === e)?.[0];
		setFormData({
			...formData,
			entityObject: entityData,
		});
	};

	const filterOptions = entityOptions.filter((item: Item) => {
		const { country_id: COUNTRY_ID } = item;
		return (
			LIST_ENTITIES_OPTIONS ? geo.country.id === COUNTRY_ID : true
		);
	});

	return [
		{
			span    : 12,
			groupBy : [
				{
					name           : 'vendorName',
					label          : 'Vendor Name',
					type           : 'asyncSelect',
					asyncKey       : 'list_vendors',
					params         : { filters: { kyc_status: 'verified' } },
					value          : formData?.vendorName,
					onChange       : (item: any, obj: object) => handleVendorChange(obj),
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Vendor name',
					span           : 2.2,
					initialCall    : false,
					className      : styles.input_width,
				},
				{
					name                  : 'invoiceDate',
					label                 : 'Invoice Date',
					type                  : 'datepicker',
					isPreviousDaysAllowed : true,
					span                  : 2.2,
					className             : styles.input_width,
				},
				{
					name                  : 'transactionDate',
					label                 : 'Accounting Date',
					type                  : 'datepicker',
					isPreviousDaysAllowed : true,
					span                  : 2.2,
					className             : styles.input_width,
				},
				{
					name           : 'periodOfTransaction',
					label          : 'Period Of Transaction',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Select Month',
					span           : 2.2,
					value          : formData?.periodOfTransaction,
					onChange       : (month: string) => setFormData({
						...formData,
						periodOfTransaction: month,
					}),
					options   : getMontOptions(formData.transactionDate),
					className : styles.input_width,
				},
				{
					name           : 'cogoEntity',
					label          : 'Cogo Entity',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Entity',
					span           : 2.2,
					options        : filterOptions,
					value          : formData?.entityObject?.id,
					onChange       : (e: any) => handleEntityChange(e),
					className      : styles.input_width,
				},
			],
		},
		{
			span    : 12,
			groupBy : [
				{
					name        : 'registrationNumber',
					label       : `${geo.others.pan_number.label.toUpperCase()}`,
					type        : 'textarea',
					value       : formData?.registrationNumber || null,
					className   : styles.pan,
					placeholder : `Autofilled ${geo.others.pan_number.label}`,
					span        : 2.2,
				},
				{
					name        : 'expenseCategory',
					label       : 'Expense Category',
					type        : 'asyncSelect',
					asyncKey    : 'list_expense_category',
					initialCall : true,
					placeholder : 'Select a Category',
					valueKey    : 'id',
					span        : 2.2,
					className   : styles.select,
				},
				{
					name           : 'branch',
					label          : 'Branch',
					type           : 'select',
					clearable      : true,
					multiple       : false,
					defaultOptions : false,
					span           : 2.2,
					className      : styles.select,
					options        : branchOptions,
				},
				{
					name           : 'paymentMode',
					label          : 'Payment Mode',
					type           : 'select',
					clearable      : true,
					multiple       : false,
					className      : styles.select,
					defaultOptions : false,
					span           : 2.2,
					options        : [{ label: 'Pay Run', value: 'payrun' }],
				},
			],
		},
	];
};
