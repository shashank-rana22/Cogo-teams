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
	topKey?: GenericObject;
	bottomKey?: GenericObject;
	label?: string | ReactNode;
	span: number;
	className?: string;
	styles?: NestedObj;
	func?: string;
}
