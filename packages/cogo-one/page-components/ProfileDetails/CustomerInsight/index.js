import { Pill } from '@cogoport/components';
import { IcMPort } from '@cogoport/icons-react';

import BookingContent from './BookingContent';
import styles from './styles.module.css';

function CustomerInsight() {
	return (
		<div className={styles.container}>
			<div className={styles.wrap}>
				<div className={styles.title}>Customer Insight</div>
				<div>
					<Pill
						key="LongTail"
						size="sm"
						color="#FEF199"
					>
						LongTail
					</Pill>
				</div>
			</div>
			<div className={styles.text}>
				Usually replies in
				<span>half a min</span>
			</div>
			<div className={styles.stats_div}>
				<div className={styles.top}>
					<div className={styles.content}>
						<div className={styles.text}>Total Bookings</div>
						<div className={styles.header}>23</div>
					</div>
					<div className={styles.content}>
						<div className={styles.text}>Avg. no. of messages </div>
						<div className={styles.header}>23,876</div>
					</div>
				</div>
				<div className={styles.top}>
					<div className={styles.content}>
						<div className={styles.text}>No. of tickets</div>
						<div className={styles.header}>2</div>
					</div>
					<div className={styles.content}>
						<div className={styles.text}>Wallet share</div>
						<div className={styles.header}> upto 20%</div>
					</div>
				</div>
			</div>
			<div className={styles.booking_div}>
				<div className={styles.text}>
					Last Booking: SID 13432
				</div>
				<BookingContent />
			</div>
			<div className={styles.comm_tex}>Commodity</div>
			<div>
				<Pill
					key="Live animals"
					size="sm"
					color="#FBD1A6"
				>
					Live animals
				</Pill>
			</div>
			<div className={styles.comm_tex}>Port pairs most booked on</div>
			<div className={styles.port_div}>
				<div className={styles.div_top}>
					<div className={styles.origin}>
						India,
						<span>(INNSA)</span>
						,
						<div className={styles.name}>Jawaharlal Nehru</div>
					</div>
					<IcMPort width={15} height={15} fill="#ACDADF" />
					<div className={styles.origin}>
						China,
						<span>(CNSHA)</span>
						,
						<div className={styles.name}>Shanghai</div>
					</div>
				</div>
				<div className={styles.div_footer}>
					<div className={styles.origin}>
						India,
						<span>(INNSA)</span>
						,
						<div className={styles.name}>Jawaharlal Nehru</div>
					</div>
					<IcMPort width={15} height={15} fill="#ACDADF" />
					<div className={styles.origin}>
						China,
						<span>(CNSHA)</span>
						,
						<div className={styles.name}>Shanghai</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CustomerInsight;
