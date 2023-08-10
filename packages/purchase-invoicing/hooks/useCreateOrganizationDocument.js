import { useRequest } from '@cogoport/request';

const useCreateOrganizationDocument = () => {
	const [{ loading: createloading }, createTrigger] = useRequest({
		url    : '/create_organization_document',
		method : 'post',
	});

	return {
		createloading,
		createTrigger,
	};
};

export default useCreateOrganizationDocument;
