import { IcMAir, IcMFcl, IcMLcl } from '@cogoport/icons-react';

import PortPair from '../../../PageView/List/Card/PortPair';

import Footer from './Footer';
import styles from './styles.module.css';

const iconMapping = {
	fcl_freight : IcMFcl,
	lcl_freight : IcMLcl,
	air_freight : IcMAir,
};

function Content({
	portPair,
	activePair,
	handlePortChange,
	handleUpdateContract,
	statsData,
	index,
	data,
}) {
	const Element = iconMapping[portPair?.service_type || 'fcl_freight'];
	return (
		<div
			role="presentation"
			className={styles.pair}
			onClick={() => handlePortChange(portPair)}
		>
			<div
				className={activePair?.id === portPair?.id ? styles.port_pair_active : styles.port_pair}
			>
				<div className={styles.sub_container}>
					<div className={styles.service}>
						<Element width={30} height={30} style={{ padding: '4px' }} />
						{`${portPair?.service_type?.split('_')[0]} ${
							portPair?.service_type?.split('_')[1]
						}`}
					</div>

					<div className={styles.port_pair}>
						<PortPair
							portPair={portPair}
							detailView
						/>
						{portPair?.status === 'quoted' && data?.status === 'pending_approval' ? (
							<div className={styles.buttons}>
								<div
									className={styles.button_reject}
									role="presentation"
									onClick={(e) => {
										e.stopPropagation();
										handleUpdateContract({
											payload: {
												id           : portPair?.id,
												service_type : portPair?.service_type,
												status       : 'rejected',
											},
										});
									}}
								>
									REJECT
								</div>
								<div
									className={styles.button_approve}
									role="presentation"
									onClick={(e) => {
										e.stopPropagation();
										handleUpdateContract({
											payload: {
												id           : portPair?.id,
												service_type : portPair?.service_type,
												status       : 'approved',
											},
										});
									}}
								>
									APPROVE
								</div>
							</div>
						) : 	(
							<div className={styles.show_tag}>
								{portPair?.status === 'rejected' ? 'Rejected' : 'Approved'}
							</div>
						)}
					</div>
					<Footer statsData={statsData} portPair={portPair} index={index} />
				</div>
			</div>
			<div className={styles.line} />
		</div>
	);
}

export default Content;
