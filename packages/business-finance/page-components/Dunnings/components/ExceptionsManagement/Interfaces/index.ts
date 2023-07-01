import React from 'react';

export interface ExceptionListProps {
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
	getMasterList?: Function;
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
	getMasterList?: Function;
}

export interface AddCustomerInterface {
	show?: boolean;
	setShow?: Function;
	control?: object;
	watch?: Function;
	handleSubmit?: Function;
	uploadListLoading?: boolean;
	getUploadList?: Function;
}
export interface ManageExceptionInterface {
	setShow?: Function;
	showCycleExceptions?: boolean;
	setShowCycleExceptions?: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit?: Function;
	uploadListLoading?: boolean;
	cycleListId?: string;
	uncheckedRows?: Array<string>;
	setUncheckedRows?: React.Dispatch<React.SetStateAction<Array<string>>>;
	getUploadList?: Function;
}
