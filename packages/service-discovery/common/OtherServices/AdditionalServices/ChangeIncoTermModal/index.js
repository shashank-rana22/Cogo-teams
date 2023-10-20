import { Modal, Button, Pill, cl } from '@cogoport/components';
import { isEmpty, upperCase } from '@cogoport/utils';

import { getServiceIncoTerms } from '../configs';
import useUpdateCheckoutIncoTerm from '../hooks/useUpdateCheckoutIncoTerm';

import iconsMapping from './icons-mapping';
import styles from './styles.module.css';

function ChangeIncoTermModal({
	incoTermModalData = {},
	setIncoTermModalData = () => {},
	searchLoading = false,
	getCheckout = () => {},
	incoterm = '',
	checkout_id = '',
	service_details = {},
	service_type: primary_service = '',
}) {
	const { selectedValue } = incoTermModalData;
	const { updateCheckoutIncoTerm, loading } = useUpdateCheckoutIncoTerm({
		getCheckout,
		setIncoTermModalData,
		checkout_id,
	});

	const addedServices = Object.values(service_details).map(({ trade_type = '', service_type = '' }) => {
		if (!trade_type) {
			return service_type;
		}

		return `${trade_type}_${service_type}`;
	});

	const incoTerms = getServiceIncoTerms({ primary_service });

	const servicesToAdd = incoTerms.filter(
		({ inco_terms = [], mandatory = false, name = '' }) => inco_terms.includes(selectedValue)
				&& mandatory
				&& !addedServices.includes(name),
	);

	const servicesToDelete = addedServices.map((item) => item.replace(
		/trailer_freight|haulage_freight|ftl_freight/g,
		'transportation',
	)).filter((item) => {
		const incoTermObject = incoTerms.find(({ name }) => name === item) || {};

		const { inco_terms = [] } = incoTermObject;

		return !isEmpty(incoTermObject) && !inco_terms.includes(selectedValue);
	}).map((item) => incoTerms.find((incoTerm) => incoTerm.name === item));

	return (
		<Modal
			show={!isEmpty(incoTermModalData)}
			onClose={() => setIncoTermModalData({})}
		>
			<Modal.Header title="Change Inco Term" />

			<Modal.Body>
				<div>
					You are changing the Incoterm from
					{' '}
					<b>{upperCase(incoterm)}</b>
					{' '}
					to
					{' '}
					<b>{upperCase(selectedValue)}</b>
					. As a result, we will add or remove services(as applicable).
					If you wish to continue with the current services, leave the Incoterm unchanged.
				</div>

				{!isEmpty(servicesToAdd) ? (
					<div className={cl`${styles.service_type} ${styles.add}`}>
						<div className={styles.title}>The following services will be added: </div>

						{servicesToAdd.map(({ title, name, service_type = '' }) => (
							<Pill
								key={name}
								size="md"
								prefix={iconsMapping[service_type]}
							>
								<div style={{ color: '#849e4c' }}>{title}</div>
							</Pill>
						))}
					</div>
				) : null}

				{!isEmpty(servicesToDelete) ? (
					<div className={styles.service_type}>
						<div className={styles.title}>The following services will be removed: </div>

						{servicesToDelete.map(({ title, name, service_type = '' }) => (
							<Pill
								key={name}
								size="md"
								prefix={iconsMapping[service_type]}
							>
								<div style={{ color: '#ee3425' }}>{title}</div>
							</Pill>
						))}
					</div>
				) : null}
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					disabled={loading || searchLoading}
					onClick={() => setIncoTermModalData({})}
					style={{ marginRight: '12px' }}
					themeType="secondary"
				>
					Don&apos;t Change
				</Button>

				<Button
					type="button"
					loading={loading || searchLoading}
					onClick={() => updateCheckoutIncoTerm({
						inco_term: selectedValue,
					})}
					themeType="accent"
				>
					{loading || searchLoading ? 'Changing...' : 'Change'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ChangeIncoTermModal;
