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

export interface Object {
	itemData: object;
}

export type Refetch = (p?: number) => void;

export type FilterProps = {
	page: number,
	pageLimit: number,
	search?: string,
	status?: string,
	searchQuery?: string,
};
