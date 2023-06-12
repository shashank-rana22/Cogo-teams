import React from 'react';

export interface TableProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	columns: object[];
	loading: boolean;
	data: object[];
	layoutType?: 'table' | 'block' | 'flex' | 'absolute';
	selectType?: 'single' | 'multiple';
	onRowSelect?: (row: object) => void;
	onRowClick?: (row: object) => void;
	getRowId?: (row: object) => string;
}

export interface TableListProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	columns: object[];
	loading: boolean;
	data: object[];
	layoutType?: 'table' | 'block' | 'flex' | 'absolute';
	selectType?: 'single' | 'multiple';
	onRowSelect?: (row: object) => void;
	onRowClick?: (row: object) => void;
	getRowId?: (row: object) => string;
	setExceptionFilter?:React.Dispatch<React.SetStateAction<object>>;
	exceptionFilter?:object;
	subTabsValue?: string;
	searchValue?:string;
	setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
	showCycleExceptions?: boolean;
	setShowCycleExceptions?:React.Dispatch<React.SetStateAction<boolean>>;
}
