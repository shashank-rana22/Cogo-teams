import { Tooltip, Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot, IcMEdit, IcMArrowDown } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CapacityDetailsTable from '../CapacityDetailsTable';
import DeactivateModal from '../DeactivateModal';

import styles from './styles.module.css';

const SLAB_UPPER_LIMIT_MAX = 99999;

const getUpperLimit = (slab_upper_limit) => {
	let result = '';

	if (slab_upper_limit && slab_upper_limit !== SLAB_UPPER_LIMIT_MAX) {
		result = `-${slab_upper_limit} `;
	} else result = '+';

	return result;
};

const activationStatus = ({ status, activated_at = '' }) => {
	if (status === 'active') {
		return {
			title   : 'Activation Date',
			content : formatDate({
				date       : activated_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}),
		};
	}
	return {
		title   : 'Status',
		content : <Pill size="sm" color="yellow">{startCase(status)}</Pill>,
	};
};

const getSlabs = (agentExperienceSlabs = []) => agentExperienceSlabs?.map((item) => {
	const { slab_unit, slab_lower_limit, slab_upper_limit } = item;

	return (
		<Pill size="md" color="green" key={item.id}>
			{slab_lower_limit}
			{getUpperLimit(slab_upper_limit)}
			{' '}
			{startCase(slab_unit)}
			s
		</Pill>
	);
});

function ConfigListItem({ data = {}, fetchList = () => {} }) {
	const router = useRouter();

	const [showModal, setShowModal] = useState(false);

	const {
		shipment_capacities = [], agent_experience_slab_details = [],
		id, status = 'draft', cogo_entity = {}, role_data = {}, activated_at = '',
	} = data;

	const { title, content } = activationStatus({ status, activated_at });

	const [showDetails, setShowDetails] = useState(false);

	const handleEditClick = () => router.push(
		`/centralised-customer-service/create-shipment-capacity-config?id=${id}`,
	);

	const handleEditCapacity = () => router.push(`/centralised-customer-service/edit-capacity?
												id=${id}&mode=edit`);

	return (
		<div style={{ marginBottom: '20px' }}>
			<div
				className={styles.container}
				style={isEmpty(shipment_capacities) ? { borderRadius: '6px' } : {}}
			>

				<div className={styles.details_container}>
					<div className={styles.item}>
						<p className={styles.title}>Entity</p>
						<p className={styles.content}>{cogo_entity?.business_name || '-'}</p>
					</div>
					<div className={styles.item}>
						<p className={styles.title}>Role</p>
						<p className={styles.content}>{role_data?.name || '-'}</p>
					</div>

					<div className={styles.slab_details}>
						<p className={styles.title}>Experience Slabs</p>
						{getSlabs(agent_experience_slab_details) || '-'}
					</div>

				</div>

				<div className={styles.vertical_divider} />

				<div className={styles.status}>
					<p className={styles.title}>{title}</p>
					<p className={styles.content}>{content || '-'}</p>
				</div>

				<div className={styles.tooltip}>
					<Tooltip
						className={styles.tooltip_pad}
						content={(
							<div className={styles.options}>

								{status === 'draft' && (
									<>
										<Button
											themeType="primary"
											className={styles.button}
											onClick={handleEditClick}
										>
											<IcMEdit className={styles.icon} />
											<div>Edit</div>
										</Button>

										{!isEmpty(shipment_capacities) && (
											<Button
												themeType="secondary"
												className={styles.button}
												type="button"
												onClick={() => setShowModal(true)}
											>
												Activate
											</Button>
										)}

									</>
								)}

								{status === 'active' && (
									<>

										<Button
											themeType="primary"
											className={styles.btn}
											onClick={handleEditCapacity}
										>
											Edit Capacity
										</Button>
										<Button
											themeType="secondary"
											className={styles.btn}
											type="button"
											onClick={() => setShowModal(true)}
										>
											Deactivate
										</Button>
									</>
								)}

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
					status={status}
					fetchList={fetchList}
				/>
			)}

			{showDetails && (
				<div className={styles.table_container}>
					<div className={styles.divider} />

					<div>Capacity & Normalized combined active shipment capacity</div>

					<CapacityDetailsTable data={data} />
				</div>
			)}

			{!isEmpty(shipment_capacities) && (
				<div
					className={styles.accordion_container}
					onClick={() => setShowDetails((prev) => !prev)}
					role="presentation"
				>
					<div>
						View
						{' '}
						{showDetails ? 'Less' : 'Service wise Capacity Details'}
					</div>
					<IcMArrowDown
						style={{
							marginLeft : '6px',
							transform  : showDetails ? 'rotate(180deg)' : 'none',
							transition : 'transform 0.2s ease',
						}}
					/>
				</div>
			)}

		</div>

	);
}

export default ConfigListItem;
