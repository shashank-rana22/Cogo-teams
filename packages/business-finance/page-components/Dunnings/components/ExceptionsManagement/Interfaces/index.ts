import React from 'react';

export interface TableListProps {
	id?: string;
	className?: string;
	columns?: object[];
	loading?: boolean;
	data?: object[];
	layoutType?: 'table' | 'block' | 'flex' | 'absolute';
	selectType?: 'single' | 'multiple';
	onRowSelect?: (row: object) => void;
	onRowClick?: (row: object) => void;
	getRowId?: (row: object) => string;
	cycleListId?: string;
	setExceptionFilter?: React.Dispatch<React.SetStateAction<object>>;
	exceptionFilter?: object;
	subTabsValue?: string;
	searchValue?: string;
	setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
	showCycleExceptions?: boolean;
	setShowCycleExceptions?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FilterProps {
	setExceptionFilter?: React.Dispatch<React.SetStateAction<object>>;
	exceptionFilter?: object;
	subTabsValue?: string;
	searchValue?: string;
	setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
	showCycleExceptions?: boolean;
	setShowCycleExceptions?: React.Dispatch<React.SetStateAction<boolean>>;
	cycleListId?: string;
}

export interface AddCustomerInterface {
	show?: boolean;
	setShow?: () => void;
	watch?: UseFormWatch<FieldValues>;
	control?: Control<FieldValues, any>;
	handleSubmit?: UseFormHandleSubmit<FieldValues, undefined>;
	uploadListLoading?: boolean;
	getUploadList?: Function;
}
export interface ManageExceptionInterface {
	setShow?: React.Dispatch<React.SetStateAction<boolean>>;
	showCycleExceptions?: boolean;
	setShowCycleExceptions?: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit?: UseFormHandleSubmit<FieldValues, undefined>;
	uploadListLoading?: boolean;
	cycleListId?: string;
	uncheckedRows?: Array<string>;
	setUncheckedRows?: React.Dispatch<React.SetStateAction<Array<string>>>;
	getUploadList?: Function;
}
