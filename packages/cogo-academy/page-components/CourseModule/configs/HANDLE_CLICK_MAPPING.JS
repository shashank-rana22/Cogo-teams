import { useRouter } from '@cogoport/next';

function HANDLE_CLICK_MAPPING() {
	const router = useRouter();

	const HANDLE_CLICK_MAPPINGS = {
		default: (course_id) => {
			router.push(`/learning/course/introduction?course_id=${course_id}`);
		},
		ongoing: (course_id) => {
			router.push(`/learning/course/introduction?course_id=${course_id}`);
		},
		mandatory: (course_id) => {
			router.push(`/learning/course/introduction?course_id=${course_id}`);
		},
		completed: (course_id) => {
			router.push(`/learning/course/introduction?course_id=${course_id}`);
		},
		saved: () => {},
	};

	return {
		HANDLE_CLICK_MAPPINGS,
	};
}

export default HANDLE_CLICK_MAPPING;
