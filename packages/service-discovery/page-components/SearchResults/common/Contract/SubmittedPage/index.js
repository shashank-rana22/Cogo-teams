import { Button, Pill } from '@cogoport/components';
import { IcCFtick, IcMArrowNext } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React from 'react';

import getLocationInfo from '../../../utils/locations-search';

import LocationItem from './LocationItem';
import styles from './styles.module.css';

function Submitted({ detail = {}, contractData = {} }) {
	const { query } = useSelector(({ general }) => ({ query: general.query }));

	const { partner_id = '' } = query;

	const { max_containers_count = 100 } = contractData;

	const { container_type, container_size, commodity } = detail;

	const { origin, destination } = getLocationInfo(detail, 'search_type');

	const redirectToContract = () => {
		const newHref = `${window.location.origin}/${partner_id}/contract-rates/dashboard/pending_approval`;
		window.location.href = newHref;
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcCFtick width={40} height={40} />

				<div className={styles.text_container}>
					<span className={styles.heading}>Sit tight and wait!</span>
					<span className={styles.heading}>Your request for contract has been successfully submitted.</span>
					<span className={styles.sub_heading}>Our team will get back to you within the next 24 hours.</span>
				</div>

				<Button
					themeType="accent"
					className={styles.button}
					size="lg"
					onClick={redirectToContract}
				>
					View Request
				</Button>
			</div>

			<div className={styles.preview_container}>
				<span className={styles.preview_label}>Following is a preview of your request</span>

				<div className={styles.preview}>
					<div className={styles.left_section}>
						<div className={styles.location_details}>
							<LocationItem location={origin} />

							{destination ? (
								<div className={styles.location_details}>
									<IcMArrowNext style={{ width: 14, height: 14 }} className={styles.icon} />

									<LocationItem location={destination} />
								</div>
							) : null}
						</div>

					</div>

					<div className={styles.right_section}>
						<div className={styles.containers_count}>
							Count:
							{' '}
							<strong>{`${max_containers_count} Ctr.`}</strong>
						</div>

						<div className={styles.load_details}>
							{container_size ? (
								<span className={styles.load_item}>
									{container_size === '20' || container_size === '40'
										? `${container_size}ft`
										: container_size}
									{' '}
									{startCase(container_type)}
								</span>
							) : null}

							<span className={styles.load_item}>
								{startCase(commodity) || 'All Commodities'}
							</span>
						</div>

						<Pill size="sm" color="#FBD1A6">Pending Approval</Pill>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Submitted;
