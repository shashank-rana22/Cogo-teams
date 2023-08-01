import { Tooltip, Button } from '@cogoport/components';
import { IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import DeactivateModal from '../DeactivateModal';
import OrganizationsSection from '../OrganizationsSection';

import styles from './styles.module.css';

function OrgConfigPoolListItem({ data = {}, fetchList = () => {} }) {
	const router = useRouter();

	const [showModal, setShowModal] = useState(false);

	const {
		cogo_entity, organization = [], organization_type, id, booking_source = '',
		segment, config_type, shipment_capacities = [], user = {},
		role_data = {},
	} = data;

	const [bookingSource] = (booking_source || '').split('_');

	const handleEditClick = () => router.push(`/centralised-customer-service/create-config?
												id=${id}`);

	return (
		<div style={{ marginBottom: '20px' }}>
			<div className={styles.container} style={isEmpty(shipment_capacities) ? { borderRadius: '6px' } : {}}>

				<div className={styles.details_container}>
					<div className={styles.item}>
						<p className={styles.title}>Entity</p>
						<p className={styles.content}>{cogo_entity?.business_name}</p>
					</div>

					<div className={styles.item}>
						<p className={styles.title}>Role</p>
						<p className={styles.content}>{role_data?.name || '-'}</p>
					</div>

					<div className={styles.item}>
						<p className={styles.title}>Org Type</p>
						<p className={styles.content}>{startCase(organization_type)}</p>
					</div>

					<div className={styles.item}>
						<p className={styles.title}>Org Sub-Type</p>
						<p className={styles.content}>{startCase(segment) || '-'}</p>
					</div>

					<div className={styles.item}>
						<p className={styles.title}>Agent Name</p>
						<p className={styles.content}>{user?.name || '-'}</p>
					</div>

					<div className={styles.item}>
						<p className={styles.title}>Organizations</p>
						<OrganizationsSection organizations={organization} />
					</div>

					<div className={styles.config}>
						<p className={styles.title}>Booking Source</p>
						<p className={styles.content}>
							{booking_source === 'app_platform' ? 'APP/CP' : startCase(bookingSource) || '-'}
						</p>
					</div>

					<div className={styles.config}>
						<p className={styles.title}>Config Type</p>
						<p className={styles.content}>{startCase(config_type)}</p>
					</div>

					<div className={styles.vertical_divider} />

				</div>

				<div className={styles.tooltip}>
					<Tooltip
						className={styles.tooltip_pad}
						content={(
							<div className={styles.options}>

								<Button
									themeType="primary"
									className={styles.button}
									onClick={handleEditClick}
								>
									<IcMEdit className={styles.icon} />
									<div>Edit</div>
								</Button>

								<Button
									themeType="secondary"
									className={styles.button}
									type="button"
									onClick={() => setShowModal(true)}
								>
									Deactivate
								</Button>
							</div>
						)}
						trigger="click"
						placement="left"
						interactive="true"
					>
						<IcMOverflowDot />
					</Tooltip>
				</div>

			</div>

			{showModal && (
				<DeactivateModal
					showModal={showModal}
					setShowModal={setShowModal}
					id={id}
					fetchList={fetchList}
				/>
			)}

		</div>

	);
}

export default OrgConfigPoolListItem;
