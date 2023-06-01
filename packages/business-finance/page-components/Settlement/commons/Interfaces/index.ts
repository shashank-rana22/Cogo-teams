import React, { ReactNode } from 'react';

export interface ConfigType {
	showHeader?: boolean;
	headerStyles?: React.CSSProperties;
	itemStyles?: React.CSSProperties;
	bodyStyles?: React.CSSProperties;
	clickable?: boolean;
	showHeaderCheckbox?: boolean;
	fields: FieldType[];
}

export interface FunctionObjects {
	[key: string]: React.FC;
}

export interface GenericObject {
	[key: string]: string | number | object;
}

export interface NestedObj {
	[key: string]: string;
}

export interface SortingType {
	name: string;
}

export interface FieldType {
	key?: string;
	topKey?: GenericObject;
	bottomKey?: GenericObject;
	label?: string | ReactNode;
	sorting?: SortingType;
	span: number;
	className?: string;
	styles?: NestedObj;
	func?: string;
}

export interface TableProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	columns: object[];
	data: object[];
	layoutType?: 'table' | 'block' | 'flex' | 'absolute';
	selectType?: 'single' | 'multiple';
	onRowSelect?: (row: object) => void;
	onRowClick?: (row: object) => void;
	getRowId?: (row: object) => string;
}

export interface ListDataProps {
	list: object[];
	pageIndex?: number;
	totalPage?: number;
	totalRecords?:any;
}

export interface Options {
	label: string;
	value: string;
	name?:string;
}

export interface ControlProps {
	span?: number,
	name?: string,
	type?: string;
	options?: Options[];
	groupBy?:ControlProps[];
	style?:React.CSSProperties;
	[key:string]: string | number | undefined | boolean | Options[] | object[] | React.CSSProperties;
}
