import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import { MONTH_OPTIONS } from '../constants/MONTH_OPTIONS';

import styles from './styles.module.css';

interface FormDataInterface {
	registrationNumber?: string;
	entityObject?: { id?: string; entity_code?: string };
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
	handleCategoryChange?: (obj: any, val: object) => void;
}

export const nonRecurringExpenseDetails = ({
	formData,
	setFormData,
	branchOptions,
	entityList,
	entityOptions,
	handleVendorChange = () => {},
	handleCategoryChange = () => {},
}: Props) => {
	const geo = getGeoConstants();
	const handleEntityChange = (e: number | string) => {
		const entityData = entityList?.filter((entityItem) => entityItem.id === e)?.[GLOBAL_CONSTANTS.zeroth_index];
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
					options   : MONTH_OPTIONS,
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
					options        : entityOptions,
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
					label       : geo.others.identification_number.label,
					type        : 'input',
					value       : formData?.registrationNumber || null,
					prefix      : null,
					className   : styles.pan,
					placeholder : `Autofilled ${geo.others.identification_number.label}`,
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
					params      : { entityCode: formData?.entityObject?.entity_code },
					renderLabel : (item) => startCase(item.categoryName),
					onChange    : (e, obj) => handleCategoryChange(e, obj),
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
				{
					name      : 'dueDate',
					label     : 'due Date',
					type      : 'datepicker',
					clearable : true,
					span      : 2.2,
				},
			],
		},
	];
};
