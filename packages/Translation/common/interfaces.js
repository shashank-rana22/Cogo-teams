export interface TableProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	columns: object[];
	data: object[];
	loading?: boolean;
	layoutType?: 'table' | 'block' | 'flex' | 'absolute';
	selectType?: 'single' | 'multiple';
	onRowSelect?: (row: object) => void;
	onRowClick?: (row: object) => void;
	getRowId?: (row: object) => string;
}

export interface StatusObject {
	status: string
}

export interface Translates {
	status: string
	myTranslates: string
}

export interface Object {
	itemData: object;
}

export interface SingleData {
	id: string;
	[key: string]: string;
}

export type Refetch = (p?: number) => void;

export type FilterProps = {
	pageIndex: number,
	pageLimit: number,
	search?: string,
	status?: string,
	searchQuery?: string,
};

export type Option = {
	value: string;
	label: string;
};

export interface ControlItem {
	span?: number;
	show?: boolean;
	type: string;
	name: string;
}

export interface FilterItem extends ControlItem {
	placeholder?: string;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	caret?: boolean;
	isClearable?: boolean;
	options: Option[];
}

export type ControlProps = (obj: { status: string, row: SingleData }) => ControlItem[];

export type FormState = { errors : object };

export type FormProps = {
	control: object;
	watch: Function;
	formState: FormState ;
};
