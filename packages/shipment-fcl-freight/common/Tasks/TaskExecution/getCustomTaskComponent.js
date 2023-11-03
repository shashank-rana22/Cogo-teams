import { AddCompanyModal } from '@cogoport/ocean-modules';
import ShipmentInsurance from '@cogoport/shipment-insurance';

import { CUSTOM_TASK_MAPPING } from '../../../constants/custom-tasks';

import {
	AmendDraftBl,
	// CargoInsurance,
	ChooseServiceProvider,
	GenerateFreightCertificate,
	NominationTask,
	UploadBookingNote,
	UploadCargoArrival,
	UploadComplianceDocs,
	UploadContainerDetails,
	ConfirmWithShipper,
} from './CustomTasks';

const TRADE_PARTY_TYPE = {
	add_consignee_details : { trade_party_type: 'consignee' },
	add_shipper_details   : { trade_party_type: 'shipper' },
};

const {
	UPDATE_CONTAINER_DETAILS,
	UPLOAD_CONTAINER_ARRIVAL_NOTICE,
	AMEND_DRAFT_BL,
	CHOOSE_SERVICE_PROVIDER,
	CONFIRM_WITH_SHIPPER,
	UPDATE_NOMINATION_DETAILS,
	GENERATE_FREIGHT_CERTIFICATE,
	GENERATE_CARGO_INSURANCE,
	UPLOAD_COMPLIANCE_DOCUMENTS,
	UPLOAD_BOOKING_NOTE,
	ADD_CONSIGNEE_DETAILS,
	ADD_SHIPPER_DETAILS,
} = CUSTOM_TASK_MAPPING;

const COMPONENT_MAPPING = {
	[UPDATE_CONTAINER_DETAILS]        : UploadContainerDetails,
	[UPLOAD_CONTAINER_ARRIVAL_NOTICE] : UploadCargoArrival,
	[AMEND_DRAFT_BL]                  : AmendDraftBl,
	[CHOOSE_SERVICE_PROVIDER]         : ChooseServiceProvider,
	[CONFIRM_WITH_SHIPPER]            : ConfirmWithShipper,
	[UPDATE_NOMINATION_DETAILS]       : NominationTask,
	[GENERATE_FREIGHT_CERTIFICATE]    : GenerateFreightCertificate,
	[GENERATE_CARGO_INSURANCE]        : ShipmentInsurance,
	[UPLOAD_COMPLIANCE_DOCUMENTS]     : UploadComplianceDocs,
	[UPLOAD_BOOKING_NOTE]             : UploadBookingNote,
	[ADD_CONSIGNEE_DETAILS]           : AddCompanyModal,
	[ADD_SHIPPER_DETAILS]             : AddCompanyModal,
};

const getCustomTaskComponent = ({
	task = {},
	shipment_data = {},
	servicesList = [],
	primary_service = {},
	onCancel = () => {},
	tasksList = [],
	selectedMail = [],
	taskListRefetch = () => {},
	mailLoading = false,
	getShipmentRefetch = () => {},
	shipmentTradePartnersData = {},
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
		[CONFIRM_WITH_SHIPPER]: {
			task,
			onCancel,
			refetch: taskListRefetch,
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
		[UPLOAD_BOOKING_NOTE]: {
			task,
			onCancel,
			taskListRefetch,
			mailLoading,
		},
		[ADD_CONSIGNEE_DETAILS]: {
			tradePartnersData    : shipmentTradePartnersData,
			addCompany           : TRADE_PARTY_TYPE[task?.task],
			tradePartnerTrigger  : taskListRefetch,
			shipment_id          : shipment_data?.id,
			importer_exporter_id : shipment_data?.importer_exporter_id,
			withModal            : false,
			setAddCompany        : onCancel,
			getShipmentRefetch,
		},
		[ADD_SHIPPER_DETAILS]: {
			tradePartnersData    : shipmentTradePartnersData,
			addCompany           : TRADE_PARTY_TYPE[task?.task],
			tradePartnerTrigger  : taskListRefetch,
			shipment_id          : shipment_data?.id,
			importer_exporter_id : shipment_data?.importer_exporter_id,
			withModal            : false,
			setAddCompany        : onCancel,
			getShipmentRefetch,
		},
	};

	return {
		propsMapping,
		COMPONENT_MAPPING,
	};
};

export default getCustomTaskComponent;
