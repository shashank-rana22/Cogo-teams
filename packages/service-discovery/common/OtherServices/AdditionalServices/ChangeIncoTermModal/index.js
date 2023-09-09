import { Modal, Button, Pill, cl } from '@cogoport/components';
import { isEmpty, upperCase } from '@cogoport/utils';

import { fclIncoTerms } from '../configs';
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
}) {
	const { selectedValue } = incoTermModalData;
	const { updateCheckoutIncoTerm, loading } = useUpdateCheckoutIncoTerm({
		getCheckout,
		setIncoTermModalData,
		checkout_id,
	});

	const possibleServices = fclIncoTerms.map(({ service_type }) => service_type);

	const addedServices = Object.values(service_details)
		.filter(({ service_type = '' }) => possibleServices.includes(service_type))
		.map(({ trade_type = '', service_type = '' }) => {
			if (!trade_type) {
				return service_type;
			}

			return `${trade_type}_${service_type}`;
		});

	const servicesToAdd = fclIncoTerms.filter(
		({ inco_terms = [], mandatory = false, name = '' }) => inco_terms.includes(selectedValue)
				&& mandatory
				&& !addedServices.includes(name),
	);

	const servicesToDelete = addedServices.filter((item) => {
		const incoTermObject = fclIncoTerms.find(({ name }) => name === item) || {};

		const { inco_terms = [] } = incoTermObject;

		return !inco_terms.includes(selectedValue);
	}).map((item) => fclIncoTerms.find((incoTerm) => incoTerm.name === item));

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
					. As a result, we will add or remove services( if any).
					If you want to continue with the same services, please leave the Incoterm unchanged.
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
