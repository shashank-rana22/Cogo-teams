import { useRouter } from '@cogoport/next';

export default function useRedirectToShipmentDetailPage() {
	const router = useRouter();

	const redirect = ({ service = '', shipment = {} }) => {
		if (service === 'fcl_freight') {
			router.push('/booking/fcl/[shipment_id]', `/booking/fcl/${shipment?.id}`);
			document.querySelector('.authority_desk').style.cursor = 'progress';
		} else {
			const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${shipment?.id}`;

			window.sessionStorage.setItem('prev_nav', newUrl);
			window.location.href = newUrl;
			document.querySelector('.authority_desk').style.cursor = 'progress';
		}
	};

	return {
		redirect,
	};
}
