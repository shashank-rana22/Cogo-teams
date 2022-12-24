export interface ConfigType {
	showHeader?:boolean;
	headerStyles?: React.CSSProperties;
	itemStyles?: React.CSSProperties;
	bodyStyles?: React.CSSProperties;
	fields:any[];
}

export interface TypeObj {
	[key:string]:string;
}

export interface NestedObj {
	[key:string]:string;
}
