import { Modal, Button, Pill, cl, Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { request } from '@cogoport/request';
import { isEmpty, startCase } from '@cogoport/utils';
import { useContext } from 'react';

import { CheckoutContext } from '../../../context';

import iconsMapping from './icons-mapping';
import styles from './styles.module.css';

const getPayload = ({ serviceType = '', id = '', detail = {}, checkout_id = '' }) => {
	let service_to_be_deleted = serviceType;

	if (
		detail?.primary_service === 'fcl_freight'
		&& service_to_be_deleted === 'trailer_freight'
		&& checkout_id
	) {
		service_to_be_deleted = 'haulage_freight';
	}

	const isSubsidiary = serviceType === 'subsidiary';

	const service_type = isSubsidiary
		? 'subsidiary_services_attributes'
		: `${service_to_be_deleted}_services_attributes`;

	return {
		id             : checkout_id,
		service        : service_to_be_deleted,
		[service_type] : [
			{
				id,
				status: 'inactive',
			},
		],
	};
};

function RemoveServicesModal({
	services = [],
	setServices = () => {},
	updateQuotation = () => {},
}) {
	const {
		detail = {},
		checkout_id = '',
		setIsLoadingStateRequired = () => {},
		isLoadingStateRequired = false,
	} = useContext(CheckoutContext);

	const onClickProceed = async () => {
		try {
			setIsLoadingStateRequired(true);

			const promisesArray = services.map((item) => {
				const promise = request({
					method : 'POST',
					url    : '/update_checkout_service',
					data   : getPayload({ ...item, detail, checkout_id }),
				});

				return promise;
			});

			await Promise.all(promisesArray);

			setServices([]);

			updateQuotation(setIsLoadingStateRequired, true);
		} catch (error) {
			const { config = {} } = error.response;

			setIsLoadingStateRequired(false);

			const { url = '' } = config;
			Toast.error(`${getApiErrorString(error.response?.data)} in ${url}`);
		}
	};

	return (
		<Modal
			show={!isEmpty(services)}
			onClose={() => setServices([])}
		>
			<Modal.Header title="Remove Services With No Rates" />

			<Modal.Body>
				<div>
					We do not have rate available for the following service(s).
					To proceed, we must remove these services. If you&apos;d like to make any changes,
					please click
					{' '}
					<strong>Cancel</strong>
					{' '}
					and modify your selections.
				</div>

				<div className={cl`${styles.service_type}`}>
					<div className={styles.title}>The following services will be removed: </div>

					{services.map(({ service_name, serviceType = '' }) => (
						<Pill
							key={service_name}
							size="md"
							prefix={iconsMapping[serviceType] || iconsMapping.subsidiary}
						>
							<div style={{ color: '#ee3425' }}>{startCase(service_name)}</div>
						</Pill>
					))}
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					disabled={isLoadingStateRequired}
					onClick={() => setServices([])}
					style={{ marginRight: '12px' }}
					themeType="secondary"
				>
					Cancel
				</Button>

				<Button
					type="button"
					loading={isLoadingStateRequired}
					onClick={onClickProceed}
					themeType="accent"
				>
					Delete Services
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default RemoveServicesModal;
