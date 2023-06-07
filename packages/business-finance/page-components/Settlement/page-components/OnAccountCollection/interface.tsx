export interface ModalInterface {
	upload_file?:boolean;
	manual_entry?:boolean;
	download_format?:boolean;

}
export interface UploadFileInterface {
	showModal?: ModalInterface;
	setShowModal?: React.Dispatch<React.SetStateAction<ModalInterface>>;
	refetch?:() => void;
	show?:boolean;
	setShow?: React.Dispatch<React.SetStateAction<boolean>>;
	isEdit?:boolean;
	selectedItem?:object;
	itemData?:{
		sageOrganizationId?:string,
		id?: string;
		accMode?: string;
		paymentDocumentStatus?: string;
		entityType?: string;
	};
	control?:object;
	watch?:Function;
}

export type FormState = { errors : object };

export type FormProps = {
	control: object;
	watch: Function;
	formState: FormState ;
};
export interface ControlItem {
	span?: number;
	show?: boolean;
	type: string;
	name: string;
}
