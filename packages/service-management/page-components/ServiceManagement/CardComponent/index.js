import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Link } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import ModalComponent from './ModalComponent';
import SliderComponent from './SliderComponent';
import styles from './styles.module.css';

function CardComponent({ data = {}, key = '', activeTab = '' }) {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className={styles.container} key={key}>

			<div className={styles.flex}>
				<Link
					href="/details/supply/[id]"
					as={`/details/supply/${data?.organization_id}`}
					className={styles.title}
				>
					<Button themeType="link">{data?.organization?.business_name}</Button>
				</Link>
				<div>{startCase(data?.service)}</div>
				{activeTab === 'pending_approval' ? (
					<Link href="/service-management/[id]" as={`/service-management/${data?.id}`}>
						<Button>TAKE ACTION</Button>
					</Link>
				) : null}
				{activeTab !== 'pending_approval' ? (
					<div>
						<Button onClick={() => setShowModal(true)}>VIEW</Button>
						<ModalComponent show={showModal} setShow={setShowModal} data={data} />
					</div>
				) : null}
			</div>
			<div className={styles.sub_container}>
				<div className={styles.flex}>
					<div className={styles.flex_column}>
						{startCase(data?.service_approvers?.[GLOBAL_CONSTANTS.zeroth_index]?.user?.name)}
					</div>
					<div className={styles.flex_column}>
						{startCase(data?.service_approvers?.[GLOBAL_CONSTANTS.one]?.user?.name)}
					</div>
				</div>
				<SliderComponent />
				<div className={styles.flex}>
					<div className={styles.flex_column}>
						<div>{startCase(data?.service_approvers?.[GLOBAL_CONSTANTS.zeroth_index]?.role?.name)}</div>
						<div>
							{(formatDate({
								date       : data?.service_approvers?.[GLOBAL_CONSTANTS.zeroth_index]?.updated_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							}))}

						</div>
					</div>
					<div className={styles.flex_column}>
						<div>{startCase(data?.service_approvers?.[GLOBAL_CONSTANTS.one]?.role?.name)}</div>
						<div>
							{(formatDate({
								date       : data?.service_approvers?.[GLOBAL_CONSTANTS.one]?.updated_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							}))}

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CardComponent;
