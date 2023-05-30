/* eslint-disable no-mixed-spaces-and-tabs */

import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyPortsSection from './EmptyPortSection';
import PortsCard from './PortsCard';
import styles from './styles.module.css';
import ToApproveModal from './ToApproveModal';

const TITLE_MAPPING = {

	auto_approved: 'Request For Approvals',

	requested_for_approval: 'Remaining Port Pairs',

};

function Services({ loading, rate_card_list_object = {}, refetchRateCards, getRfqsForApproval }) {
	const { query } = useRouter();

	const { rfq_id = '' } = query || {};

	const [show, setShow] = useState(false);
	const [cardStateCount, setCardStateCount] = useState();

	return (

		<div className={styles.main_container}>

			<div className={styles.header}>

				<Button
					size="md"
					themeType="primary"
					onClick={() => setShow(true)}
					disabled={isEmpty(rate_card_list_object)}
				>
					Preview and Approve

				</Button>

				{
					show && (

						<ToApproveModal
							show={show}
							setShow={setShow}
							rfq_id={rfq_id}
							cardStateCount={cardStateCount}
						/>
					)
				}
			</div>
			<div className={styles.cards}>
				{(isEmpty(rate_card_list_object) && !loading)
					? <EmptyPortsSection />
					: Object.keys(rate_card_list_object).map((key) => (
						<div className={styles.approve_remaining_complete_shipment_section} key={key}>
							<div className={styles.lists_heading_section}>
								<span className={styles.lists_heading_section}>{TITLE_MAPPING[key]}</span>
								<div className={` ${styles.lists_heading_section} ${styles.port_pairs_nos}`}>
									{' '}
									(
									{rate_card_list_object[key].length}
									{' '}
									{' '}
									Port Pairs)
								</div>
							</div>
							{rate_card_list_object[key].map((rate_card) => (
								<div key={rate_card.id}>
									<PortsCard
										id={rate_card.id}
										data={rate_card}
										loading={loading}
										title={key}
										refetchRateCards={refetchRateCards}
										getRfqsForApproval={getRfqsForApproval}
										setCardStateCount={setCardStateCount}
									/>
								</div>
							))}
						</div>
					))}
			</div>
		</div>
	);
}

export default Services;
