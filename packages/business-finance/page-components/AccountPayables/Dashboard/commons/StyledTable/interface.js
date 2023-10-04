export interface TableProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	page?:number,
	pageSize?:number,
	total?:number
	columns: object[];
	data: object[];
	loading?: boolean;
	layoutType?: 'table' | 'block' | 'flex' | 'absolute';
	selectType?: 'single' | 'multiple';
	onRowSelect?: (row: object) => void;
	onRowClick?: (row: object) => void;
	getRowId?: (row: object) => string;
}
