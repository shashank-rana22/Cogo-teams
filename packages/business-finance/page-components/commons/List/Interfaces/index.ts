import React from 'react';

export interface ConfigType {
	showHeader?:boolean;
	headerStyles?: React.CSSProperties;
	itemStyles?: React.CSSProperties;
	bodyStyles?: React.CSSProperties;
	clickable?:boolean;
	showHeaderCheckbox?:boolean;
	fields:FieldType[];
}

export interface FunctionObjects {
	[key:string]:React.FC;
}

export interface GenericObject { [key: string]: any }

export interface NestedObj {
	[key:string]:string;
}

export interface SortingType {
	name:string;
}

export interface FieldType {
	key : string;
	topKey?: GenericObject;
	bottomKey?: GenericObject;
	label? : string | React.FC;
	sorting? : SortingType;
	span : number;
	className? : string;
	styles?: NestedObj;
	func? : string;
}
