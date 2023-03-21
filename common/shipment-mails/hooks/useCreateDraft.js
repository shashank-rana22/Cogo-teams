import useAxios from 'axios-hooks';

/**
 * Single utility hook to create draft email from Cogo RPA
 */

const useCreateDraft = () => {
	const [mailApi, triggerGetMail] = useAxios(
		{
			url    : `${process.env.COGO_LENS_URL}/create_draft_email`,
			method : 'POST',
		},
		{ manual: true },
	);

	/**
	 *
	 * @param {*} id
	 */
	const getEmail = async (id) => {
		try {
			await triggerGetMail({
				data: {
					id,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		mailApi,
		getEmail,
	};
};

export default useCreateDraft;
