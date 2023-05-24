import styles from './styles.module.css';
import TimelineItem from './TimelineItem';

const timelineItems = [
	{
		label     : 'Booking Note Expiry',
		accessKey : 'expiry',
	},
	{
		label     : 'SI Cutoff',
		accessKey : 'si_cutoff',
	},
	{
		label     : 'SI Filed At',
		accessKey : 'si_filed_at',
	},
	{
		label     : 'Tr Cutoff',
		accessKey : 'tr_cutoff',
	},
	{
		label     : 'VGM Cutoff',
		accessKey : 'vgm_cutoff',
	},
	{
		label     : 'Gate-in Cutoff',
		accessKey : 'gate_in_cutoff',
	},
	{
		label     : 'Document Cutoff',
		accessKey : 'document_cutoff',
	},
];

export default function Timeline({ item }) {
	const timelineWithDates = [];

	timelineItems.forEach((timelineItem) => {
		if (item?.[timelineItem.accessKey]) {
			const date = new Date(item[timelineItem.accessKey]);
			if (date.toDateString() !== 'Invalid Date') {
				timelineWithDates.push({ ...timelineItem, date });
			}
		}
	});

	const sortedTimeline = timelineWithDates.sort((a, b) => a.date - b.date);

	const nextUpcomingDateIndex = sortedTimeline.findIndex(
		(timelineItem) => timelineItem.date > new Date(),
	);

	return (
		<div className={styles.timeline_container}>
			{sortedTimeline.map((timelineItem, index) => (
				<TimelineItem
					key={timelineItem.accessKey}
					timelineItem={timelineItem}
					isNextUpcoming={index === nextUpcomingDateIndex}
					notCompleted={index > nextUpcomingDateIndex}
				/>
			))}
		</div>
	);
}
