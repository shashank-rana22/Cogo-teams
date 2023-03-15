import React, { useState } from 'react';
import { useSelector } from '@cogoport/store';
import { Button, Modal, cl } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import FormSearch from '../Form';
import icons from '../Icons/icons';
import Icon from '../Icons/Icon';
import styles from './styles.module.css';

const InactiveService = ({
	routeLeg = {},
	shipment_data,
	services,
	isUpsellServiceAvailable,
}) => {
	const isMobile = useSelector(({ general }) => general?.isMobile);

	const [upsellModal, setUpsellModal] = useState(false);
	const [form, setShowForm] = useState({
		show: false,
		service: null,
		isAdditional: false,
	});

	const handleClick = () => {
		setShowForm({
			service: {
				service:
					routeLeg?.service_types?.[0].replace('_service', '') ||
					routeLeg?.service_types?.[1].replace('_service', ''),
				service_type: routeLeg?.service_types?.[0].replace('_service', ''),
				type: routeLeg?.trade_type === 'export' ? 'origin' : 'destination',
			},
			show: true,
			additionalShow: true,
		});
		setUpsellModal(true);
	};

	const handleClose = () => {
		setShowForm({ service: null, show: false, isAdditional: false });
		setUpsellModal(false);
	};

	return (
		<>
			<div className={cl` ${styles.container} ${isUpsellServiceAvailable ? 'hover_click' : 'upsell_not_allowed'}`}
				onClick={isUpsellServiceAvailable ? handleClick : null}
			>
				{isMobile ? (
					<div className={styles.mob_container}>
						<div style={{ display: 'flex' }}>
							<div style={{ paddingRight: 10 }}>
								<Icon type={icons[routeLeg?.iconType]} />
							</div>

							<div>{routeLeg?.display}</div>
						</div>

						{isUpsellServiceAvailable ? (
							<Button themeType='tertiary'>
								<IcMPlus />
							</Button>
						) : null}
					</div>
				) : (
					<>
						<div className={styles.icon_container}>
							<Icon type={icons[routeLeg?.iconType]} />

							{isUpsellServiceAvailable ? (
								<Button themeType='tertiary' onClick={handleClick}>
									<IcMPlus />
								</Button>
							) : null}
						</div>

						<div className={styles.inactive_service}>{routeLeg?.display}</div>
					</>
				)}
			</div>

			{upsellModal ? (
				<Modal
					show={upsellModal}
					onClose={() => setUpsellModal(false)}
					className="primary lg"
					styles={{ dialog: { width: isMobile ? 360 : 700 } }}
				>
					<FormSearch
						extraParams={{
							importer_exporter_id: shipment_data?.importer_exporter_id,
							importer_exporter_branch_id:
								shipment_data?.importer_exporter_branch_id,
							user_id: shipment_data?.user_id,
						}}
						service={form.service}
						onClose={handleClose}
						shipment_data={shipment_data}
						services={services}
					/>
				</Modal>
			) : null}
		</>
	);
};

export default InactiveService;
