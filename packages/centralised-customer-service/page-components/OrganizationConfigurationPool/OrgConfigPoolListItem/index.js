import { Tooltip, Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import DeactivateModal from '../DeactivateModal';

import styles from './styles.module.css';

const OFFSET = 1;

const getOrganizations = (organizations = []) => (
	<section className={styles.orgs}>

		{!isEmpty(organizations) ? (
			<Tooltip
				maxWidth={400}
				content={startCase(organizations[GLOBAL_CONSTANTS.zeroth_index].business_name)}
				placement="top"
				key={organizations[GLOBAL_CONSTANTS.zeroth_index].id}
			>
				<Pill
					className={styles.org_pill}
					size="sm"
					color="#F3FAFA"
				>
					{organizations[GLOBAL_CONSTANTS.zeroth_index].business_name}
				</Pill>
			</Tooltip>
		) : '-'}

		{organizations.length > OFFSET && (
			<Tooltip
				maxWidth={400}
				content={(organizations.map((org, index) => ((index >= OFFSET) ? (
					<Pill
						key={org.id}
						size="sm"
						color="#F3FAFA"
					>
						{org.business_name}
					</Pill>
				) : null)))}
				placement="top"
				interactive
			>
				<Pill
					className={styles.org_pill}
					size="sm"
					color="#F3FAFA"
				>
					+
					{organizations.length - OFFSET}
					{' '}
					More
				</Pill>
			</Tooltip>
		)}
	</section>
);

function OrgConfigPoolListItem({ data = {}, fetchList = () => {} }) {
	const router = useRouter();

	const [showModal, setShowModal] = useState(false);

	const {
		cogo_entity, organization = [], organization_type, id, booking_source = '',
		segment, config_type, shipment_capacities = [], user = {},
		role_data = {},
	} = data;

	const [BookingSource] = (booking_source || '').split('_');

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
						{getOrganizations(organization)}
					</div>
					<div className={styles.config}>
						<p className={styles.title}>Booking Source</p>
						<p className={styles.content}>
							{booking_source === 'app_platform' ? 'APP/CP' : startCase(BookingSource) || '-'}
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
