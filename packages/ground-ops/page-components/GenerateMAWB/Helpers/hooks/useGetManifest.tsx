import { useRequestAir } from '@cogoport/request';

const useGetManifest = () => {
	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url    : '/air-coe/list-manifest',
			method : 'get',
			// authKey : 'get_air_coe_documents',
		},
		{ manual: true },
	);

	const getHawb = async (id) => {
		try {
			await trigger({
				params: {
					id,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		hawbData: data,
		getHawb,
		loading,
	};
};
export default useGetManifest;
