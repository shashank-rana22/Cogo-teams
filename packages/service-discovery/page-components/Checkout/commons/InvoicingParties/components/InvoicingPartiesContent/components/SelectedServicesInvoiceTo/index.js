import { MultiSelect, Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const MAX_INDEX_TO_SHOW = 3;

function SelectedServicesInvoiceTo({
	services = [],
	isEditMode = false,
	setEditInvoiceDetails = () => {},
	editInvoiceDetails = {},
	allServices = [],
}) {
	if (isEditMode) {
		return (
			<div>
				<div className={styles.label}>Select Services</div>
				<MultiSelect
					value={editInvoiceDetails.services.map((item) => item.service_id)}
					onChange={(val) => {
						setEditInvoiceDetails((prev) => ({
							...prev,
							services: val.map((item) => allServices.find(({ service_id }) => service_id === item)),
						}));
					}}
					placeholder="Select Services"
					options={allServices.map(({ label, service_id }) => ({ label, value: service_id }))}
					isClearable
					style={{ width: '250px' }}
				/>
			</div>
		);
	}

	const { itemsToShow, tooltipServices } = services.reduce((acc, curr, index) => {
		if (index > MAX_INDEX_TO_SHOW) {
			return { ...acc, tooltipServices: [...acc.tooltipServices, curr] };
		}

		return { ...acc, itemsToShow: [...acc.itemsToShow, curr] };
	}, { itemsToShow: [], tooltipServices: [] });

	return (
		<div className={styles.container}>
			{itemsToShow.map((service) => {
				const { service_id, label } = service;

				return (
					<div className={styles.item} key={service_id}>
						<div className={styles.content}>{label}</div>
					</div>
				);
			})}

			{!isEmpty(tooltipServices) ? (
				<Popover
					interactive
					placement="bottom"
					trigger="mouseenter"
					content={(
						<div className={styles.popover_content} style={{ maxHeight: '300px', overflow: 'auto' }}>
							{tooltipServices.map(({ service_id, label }) => (
								<div className={styles.item} key={service_id}>
									<div className={styles.content}>{label}</div>
								</div>
							))}
						</div>
					)}
				>
					<div className={styles.item}>
						<div className={styles.content}>
							+
							{tooltipServices.length}
							{' '}
							More
						</div>
					</div>
				</Popover>
			) : null}
		</div>
	);
}

export default SelectedServicesInvoiceTo;
