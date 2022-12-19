export interface ConfigType {
	showHeader?:boolean;
	headerStyles?: React.CSSProperties;
	itemStyles?: React.CSSProperties;
	bodyStyles?: React.CSSProperties;
	clickable?:boolean;
	showHeaderCheckbox?:boolean;
	fields:FieldType[];
}

export interface NestedObj {
	[key:string]:string;
}

export interface SortingType {
	name:string;
}

export interface FieldType {
	key? : string;
	label? : string;
	sorting? : SortingType;
	span : number;
	className? : string;
	styles?: NestedObj;
	func? : string;
}
