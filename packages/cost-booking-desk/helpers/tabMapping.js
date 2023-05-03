export default function tabMapping() {
	const filters = {
		assigned: {
			new_collections: true,
		},
		in_progress: {
			in_progress_collections: true,
		},
		completed: {
			completed_collections: true,
		},
		cancelled: {
			cancelled_collections: true,
		},
	};

	return filters;
}
