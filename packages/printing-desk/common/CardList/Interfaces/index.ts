import React, { ReactNode } from 'react';

export interface GenericObject {
	[key: string]: any;
}

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
}

export interface DataType {
	shipmentPendingTasks?: Array<object>;
	totalRecords?: number;
}
