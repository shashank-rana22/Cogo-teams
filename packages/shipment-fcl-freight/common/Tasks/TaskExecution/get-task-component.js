import {
	AmendDraftBl,
	ChooseServiceProvider,
	GenerateFreightCertificate,
	NominationTask,
	UploadCargoArrival,
	UploadComplianceDocs,
	UploadContainerDetails,
	VerifyShipperDetails,
} from './CustomTasks';
import CargoInsurance from './CustomTasks/CargoInsurance';

const TASKS = {
	UPDATE_CONTAINER_DETAILS        : 'update_container_details',
	UPLOAD_CONTAINER_ARRIVAL_NOTICE : 'upload_container_arrival_notice',
	AMEND_DRAFT_BL                  : 'amend_draft_house_bill_of_lading',
	CHOOSE_SERVICE_PROVIDER         : 'choose_service_provider',
	VERIFY_SHIPPER_DETAILS          : 'verify_shipper_details',
	UPDATE_NOMINATION_DETAILS       : 'update_nomination_details',
	GENERATE_FREIGHT_CERTIFICATE    : 'generate_freight_certificate',
	GENERATE_CARGO_INSURANCE        : 'generate_cargo_insurance',
	UPLOAD_COMPLIANCE_DOCUMENTS     : 'upload_compliance_documents',
};

const {
	UPDATE_CONTAINER_DETAILS,
	UPLOAD_CONTAINER_ARRIVAL_NOTICE,
	AMEND_DRAFT_BL,
	CHOOSE_SERVICE_PROVIDER,
	VERIFY_SHIPPER_DETAILS,
	UPDATE_NOMINATION_DETAILS,
	GENERATE_FREIGHT_CERTIFICATE,
	GENERATE_CARGO_INSURANCE,
	UPLOAD_COMPLIANCE_DOCUMENTS,
} = TASKS;

const COMPONENT_MAPPING = {
	[UPDATE_CONTAINER_DETAILS]        : UploadContainerDetails,
	[UPLOAD_CONTAINER_ARRIVAL_NOTICE] : UploadCargoArrival,
	[AMEND_DRAFT_BL]                  : AmendDraftBl,
	[CHOOSE_SERVICE_PROVIDER]         : ChooseServiceProvider,
	[VERIFY_SHIPPER_DETAILS]          : VerifyShipperDetails,
	[UPDATE_NOMINATION_DETAILS]       : NominationTask,
	[GENERATE_FREIGHT_CERTIFICATE]    : GenerateFreightCertificate,
	[GENERATE_CARGO_INSURANCE]        : CargoInsurance,
	[UPLOAD_COMPLIANCE_DOCUMENTS]     : UploadComplianceDocs,
};

const getTaskComponent = ({
	task = {},
	shipment_data = {},
	servicesList = [],
	primary_service = {},
	onCancel = () => {},
	tasksList = [],
	selectedMail = [],
	taskListRefetch = () => {},
}) => {
	const propsMapping = {
		[UPDATE_CONTAINER_DETAILS]: {
			pendingTask : task,
			services    : servicesList,
			onCancel,
			taskListRefetch,
		},
		[UPLOAD_CONTAINER_ARRIVAL_NOTICE]: {
			pendingTask : task,
			summary     : {
				...(primary_service || {}),
				importer_exporter_id: shipment_data?.importer_exporter?.id,
			},
			refetch   : taskListRefetch,
			clearTask : onCancel,
		},
		[AMEND_DRAFT_BL]: {
			task,
			shipmentData   : shipment_data,
			primaryService : primary_service,
			selectedMail,
			clearTask      : onCancel,
			taskListRefetch,
		},
		[CHOOSE_SERVICE_PROVIDER]: {
			task,
			onCancel,
			refetch  : taskListRefetch,
			services : servicesList,
		},
		[VERIFY_SHIPPER_DETAILS]: {
			task,
			// onCancel,
			refetch      : taskListRefetch,
			shipmentData : shipment_data,
		},
		[UPDATE_NOMINATION_DETAILS]: {
			primaryService : primary_service,
			shipmentData   : shipment_data,
			task,
			onCancel,
			refetch        : taskListRefetch,
		},
		[GENERATE_FREIGHT_CERTIFICATE]: {
			task,
			onCancel,
			refetch: taskListRefetch,
		},
		[GENERATE_CARGO_INSURANCE]: {
			task,
			onCancel,
			refetch: taskListRefetch,
		},
		[UPLOAD_COMPLIANCE_DOCUMENTS]: {
			task,
			onCancel,
			taskListRefetch,
			tasksList,
		},
	};

	return {
		propsMapping,
		COMPONENT_MAPPING,
	};
};

export default getTaskComponent;
