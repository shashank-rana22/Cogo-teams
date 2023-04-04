import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
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

const SAMPLE_DOCUMENT_URL = 'https://cogoport-production.sgp1.digitaloceanspaces.com'
								+ '/5905c74c7bbf7e71b9e8e00a2af45fbc/sample_faq_upload_sheet.csv';

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
			const { upload_question } = val || {};

			const payload = {
				file_url: upload_question,
			};

			await trigger({ data: payload });

			Toast('Question uploaded Successfully');
		} catch (error) {
			if (error?.message || error?.error?.message) {
				Toast(error?.message || error?.error?.message);
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
