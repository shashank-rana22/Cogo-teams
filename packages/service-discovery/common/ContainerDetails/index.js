import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getDetails from './getDetails';
import styles from './styles.module.css';

function ContainerDetails({ services = {}, primary_service = '' }) {
	const allContainerDetails = (Object.values(services) || []).filter(
		(service) => service?.service_type === primary_service,
	);

	const firstContainerDetails = getDetails({
		item: allContainerDetails[GLOBAL_CONSTANTS.zeroth_index],
		primary_service,
	});

	const ToolTipContent = () => allContainerDetails.map((item, index) => {
		if (!index) {
			return null;
		}

		return (
			<div key={item.id}>
				{getDetails({ item, primary_service }).map((detail) => (
					<Pill
						key={detail}
						size="md"
						color="#FEF199"
						style={{ border: '1px solid #FCDC00' }}
					>
						{detail}
					</Pill>
				))}
			</div>
		);
	});

	return (
		<div className={styles.container}>
			<div className={styles.pills_container}>
				{firstContainerDetails.map((item) => (
					<Pill
						key={item}
						size="md"
						color="#FEF199"
						style={{ border: '1px solid #FCDC00' }}
					>
						{item}
					</Pill>
				))}

				{allContainerDetails?.length > 1 && (
					<Tooltip
						theme="light"
						placement="bottom"
						maxWidth={800}
						content={<ToolTipContent />}
					>
						<Pill
							size="md"
							color="##F9F9F9"
							style={{ border: '1px solid #E0E0E0' }}
						>
							{`${allContainerDetails.length - 1} More`}
						</Pill>
					</Tooltip>
				)}
			</div>
		</div>
	);
}

export default ContainerDetails;
