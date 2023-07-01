import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const PAGE_MAPPING = {
	topics: {
		api          : '',
		display_name : 'Topics',
	},
	tags: {
		api          : '',
		display_name : 'Tags',
	},
	questions: {
		api          : '',
		display_name : 'Questions',
	},
};

const SAMPLE_DOCUMENT_URL = `https://cogoport-production.sgp1.digitaloceanspaces.com/
									69f22ad557310d6d2488d4ac332fafd3/bulk_upload_faq_sample.csv`;

const useBulkCreateQuestionAnswerSet = () => {
	const { general:{ query : { type } } } = useSelector((state) => (state));

	const [{ loading: BulkCreateQuestionloading = false }, trigger] = useRequest({
		url    : 'bulk_create_question_answer_set',
		method : 'POST',
	}, { manual: true });

	const { formState: { errors }, control, handleSubmit } = useForm();

	const pageType = PAGE_MAPPING[type];
	const router = useRouter();

	const onClickBackButton = () => {
		router.back();
	};

	const onClickViewSampleFile = () => {
		window.open(
			SAMPLE_DOCUMENT_URL,
			'_blank',
			'noreferrer',
		);
	};

	const bulkCreateQuestionAnswerSet = async (val) => {
		try {
			const { finalUrl } = val?.upload_question || {};

			const payload = {
				file_url: finalUrl,
			};

			await trigger({ data: payload });

			Toast('Question uploaded Successfully');
			router.back();
		} catch (error) {
			if (error?.message || error?.error?.message) {
				if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
			}
		}
	};

	return {
		bulkCreateQuestionAnswerSet,
		BulkCreateQuestionloading,
		onClickBackButton,
		pageType,
		control,
		errors,
		onClickViewSampleFile,
		handleSubmit,
	};
};

export default useBulkCreateQuestionAnswerSet;
