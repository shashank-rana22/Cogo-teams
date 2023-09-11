import { useRouter } from './useRouter';

const useHandleVersionChangeToOld = ({ url_to_redirect = '' }) => {
	const router = useRouter();
	let newUrl = url_to_redirect;
	if (!newUrl) {
		newUrl = `${window.location.origin}/${router?.asPath}`;
	}

	const handleRouteChange = () => { window.location.href = newUrl; };

	return { handleRouteChange };
};

export default useHandleVersionChangeToOld;
