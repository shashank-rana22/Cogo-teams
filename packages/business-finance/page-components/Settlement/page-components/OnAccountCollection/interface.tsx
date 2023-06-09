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
		customerName?:string
		accCode?:string
		bankAccountNumber?:string
		orgSerialId?:string
		bankName?:string
		paymentNumValue?:string
		amount?:string
		utr?:string
		entityType?:string
		currency?:string
		id?:string
		paymentDocumentStatus?:string
		accMode?:string
		paymentCode?:string
		sageOrganizationId?:string
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
