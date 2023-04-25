import { useRequestAir } from '@cogoport/request';

const useCreateManifest = () => {
	const [{ loading }, trigger] = useRequestAir(
		{
			url    : '/air-coe/documents/create-manifest',
			method : 'POST',
			// authKey : 'get_air_coe_documents',
		},
	);

	const createManifest = async (payload, setTriggerManifest) => {
		try {
			await trigger({
				data: payload,
			});
			setTriggerManifest(null);
		} catch (err) {
			console.log(err);
		}
	};

	return {
		createManifest,
		loading,
	};
};
export default useCreateManifest;
