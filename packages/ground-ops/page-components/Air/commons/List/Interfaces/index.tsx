import React, { ReactNode } from 'react';

export interface FunctionObjects {
	[key: string]: React.FC;
}

export interface NestedObj {
	[key: string]: string;
}

export interface FieldType {
	key?: string;
	label?: string | ReactNode;
	span: number;
	className?: string;
	styles?: NestedObj;
	func?: string;
	render?: Function;
}

export interface DataType {
	airlineIds?: Array<string>;
	airportIds?: Array<string>;
	importerExporterIds?: Array<string>;
	shipmentPendingTasks?: Array<NestedObj>;
	stakeholderIds?: Array<object>;
	totalRecords?: number;
}

export interface ListDataType {
	data?: DataType;
}
