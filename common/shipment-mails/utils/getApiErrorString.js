export default function getApiErrorString(err) {
	if (err?.response?.data?.message) {
		return err.response.data.message;
	} if (err?.message) {
		return err.message;
	}
	return 'Something went wrong !!';
}
