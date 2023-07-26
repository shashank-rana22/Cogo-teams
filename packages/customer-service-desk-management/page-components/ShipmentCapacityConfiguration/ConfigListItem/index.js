import { Tooltip, Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowDown, IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CapacityDetailsTable from '../CapacityDetailsTable';

import styles from './styles.module.css';

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

function ConfigListItem({ data = {}, setShowModal = () => {} }) {
	const router = useRouter();

	const [showDetails, setShowDetails] = useState(false);

	const {
		cogo_entity, organization = [], organization_type,
		segment, status = 'draft', activated_at, config_type,
	} = data;

	const { title, content } = activationStatus({ status, activated_at });

	console.log('data', data);

	const handleEditClick = () => router.push(`/customer-service-desk-management/create-config?
												id=${data.id}&mode=edit`);

	return (
		<div style={{ marginBottom: '20px' }}>
			<div className={styles.container}>

				<div className={styles.details_container}>
					<div className={styles.item}>
						<p className={styles.title}>Entity</p>
						<p className={styles.content}>{cogo_entity.business_name}</p>
					</div>
					<div className={styles.item}>
						<p className={styles.title}>Organization Type</p>
						<p className={styles.content}>{startCase(organization_type)}</p>
					</div>
					<div className={styles.item}>
						<p className={styles.title}>Organization Sub-Type</p>
						<p className={styles.content}>{startCase(segment)}</p>
					</div>
					<div className={styles.item}>
						<p className={styles.title}>Activation Date</p>
						<p className={styles.content}>24 May 2023</p>
					</div>
					<div className={styles.item}>
						<p className={styles.title}>Booking Source</p>
						<p className={styles.content}>24 May 2023</p>
					</div>

					<div className={styles.item}>
						<p className={styles.title}>Config Type</p>
						<p className={styles.content}>{startCase(config_type)}</p>
					</div>

					<div className={styles.vertical_divider} />

					<div className={styles.status}>
						<p className={styles.title}>{title}</p>
						<p className={styles.content}>{content}</p>
					</div>
				</div>

				<div className={styles.tooltip}>
					<Tooltip
						className={styles.tooltip_pad}
						content={(
							<div className={styles.options}>

								<Button
									themeType="primary"
									className={styles.btn}
									onClick={handleEditClick}
								>
									<IcMEdit />
									<div>Edit</div>
								</Button>

								<Button
									themeType="secondary"
									className={styles.btn}
									type="button"
									onClick={() => setShowModal(true)}
								>
									<div>Deactive Config.</div>
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

			{showDetails && (
				<div className={styles.table_container}>
					<div className={styles.divider} />

					<div>Capacity & Normalized combined active shipment capacity</div>

					<CapacityDetailsTable data={data} />
				</div>
			)}

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

		</div>

	);
}

export default ConfigListItem;
