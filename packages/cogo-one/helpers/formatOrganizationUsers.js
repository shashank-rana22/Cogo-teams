function formatOrganizationUsers({ data }) {
	const { list = [] } = data || {};

	return list?.map((item) => {
		const { organization_id, user_id, name, whatsapp_number_eformat } = item || {};

		return {
			organization_id,
			user_id,
			userName: name,
			whatsapp_number_eformat,
		};
	});
}
export default formatOrganizationUsers;
