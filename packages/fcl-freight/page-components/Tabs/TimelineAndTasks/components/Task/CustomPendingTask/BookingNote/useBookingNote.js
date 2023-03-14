import useForm from '@cogoport/front/hooks/useFormCogo';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import getApiErrorString from '@cogoport/front/utils/functions/getApiErrorString';
import toast from '@cogoport/front/components/admin/Toast';
import { useState } from 'react';
import controls, { fileUrls } from './controls';
import useEditQuote from './useEditQuote';

const useBookingNote = ({ shipmentData, task, completedStep, refetch }) => {
	const [supplier, setSupplier] = useState({});
	const [files, setFiles] = useState({});
	const [bnDetails, setBNDetails] = useState({});
	const [currentBn, setCurrentBn] = useState(0);
	let initialStepValue = 0;
	if (completedStep === '1') {
		initialStepValue = 1;
	}
	if (completedStep === '2') {
		initialStepValue = 4;
	}
	const [step, setStep] = useState(initialStepValue);
	const scope = useSelector((state) => state.general.scope);
	const createDoc = useRequest(
		'post',
		false,
		scope,
	)('/create_shipment_document');
	const updateService = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_service');
	const updateTask = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_pending_task');

	const handleChange = (obj) => {
		setSupplier(obj);
	};
	const { fields, handleSubmit } = useForm(controls);
	const fileUrlForm = useForm(fileUrls);

	const handleUpdateTask = async (stepNo, state) => {
		await updateTask.trigger({
			data: {
				id: task.id,
				status: state || 'pending',
				tags: [stepNo],
			},
		});
	};

	const editQuote = useEditQuote({
		shipmentData,
		handleUpdateTask,
		task,
		refetch,
	});

	fields.service_provider_id.handleChange = handleChange;

	const handleRateSelection = async (data, e) => {
		const newValues = {};
		Object.keys(data).forEach((key) => {
			if (data[key]) {
				newValues[key] = data[key];
			}
		});
		try {
			e.preventDefault();
			await updateService.trigger({
				data: {
					ids: [task.service_id],
					performed_by_org_id: task.organization_id,
					service_type: task.service_type,
					data: {
						...newValues,
					},
				},
			});
			await handleUpdateTask('1');
			setStep(1);
		} catch (err) {
			console.log(err);
		}
	};

	const handleFileUpload = (data) => {
		setFiles({ ...data });
		setStep(3);
	};

	const handleBookingNoteUpload = async () => {
		try {
			const docPaylod = {
				shipment_id: task.shipment_id,
				service_id: task.service_id,
				service_type: task.service_type,
				document_type: 'booking_note',
				uploaded_by_org_id: task.organization_id,
				documents: (files.file_urls || []).map((file) => ({
					file_name: file.name,
					document_url: file.url,
					data: bnDetails[file.url],
				})),
			};
			const urlToTake = (files.file_urls || [])[0].url;
			const serviceRawPayload = bnDetails[urlToTake];
			const movement_details = (serviceRawPayload?.movement_details || []).map(
				(item) => ({
					...item,
					service_type: 'fcl_freight_service',
				}),
			);
			delete serviceRawPayload.yard_details;
			delete serviceRawPayload.document_number;
			delete serviceRawPayload.container_count;

			const servicePayload = {
				shipment_id: task.shipment_id,
				performed_by_org_id: task.organization_id,
				service_type: task.service_type,
				ids: [
					task?.service_id,
					// ...Object.keys(summary?.similar_type_services || {}),
				],
				data: { ...(serviceRawPayload || {}), movement_details },
			};

			await updateService.trigger({ data: servicePayload });

			await createDoc.trigger({ data: docPaylod });
			await handleUpdateTask('2');
			setStep(4);
		} catch (err) {
			toast.error(getApiErrorString(err?.data));
			console.log(err);
		}
	};

	return {
		selectRate: {
			fields,
			handleSubmit,
			controls,
			handleRateSelection,
		},
		fileUrlForm: { ...fileUrlForm, controls: fileUrls, handleFileUpload },
		detailsStep: {
			files,
			supplier,
			setBNDetails,
			bnDetails,
			setCurrentBn,
			currentBn,
			handleBookingNoteUpload,
		},
		editQuote,
		step,
		setStep,
	};
};

export default useBookingNote;
