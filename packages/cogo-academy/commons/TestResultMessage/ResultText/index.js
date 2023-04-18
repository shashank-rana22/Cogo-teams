import { startCase } from '@cogoport/utils';

function ResultText({ type, date, testName }) {
	const text = {
		passed: (
			<>
				You have performed really well in the
				{' '}
				<b>{startCase(testName)}</b>
				{' '}
				taken on
				{' '}
				{date}
				{' '}
				. Your hard work has paid off, and we encourage you to continue
				learning and applying your newfound knowledge to future transactions.
				Keep up the excellent work!
			</>
		),
		intermediate: (
			<>
				Your performance on the
				{' '}
				<b>{startCase(testName)}</b>
				{' '}
				taken on
				{' '}
				{date}
				{' '}
				showed Potential for Improvement. Keep working hard and striving for
				better results in future tests - we believe in your ability to succeed!
			</>
		),
		failed: (
			<>
				While your performance on the
				{' '}
				<b>{startCase(testName)}</b>
				{' '}
				taken on
				{' '}
				{date}
				{' '}
				was Not as Strong as we had Hoped, don&apos;t get discouraged!
				Remember that learning takes time and practice. We recommend dedicating
				more time to studying and look forward to seeing your progress on the
				next test. Keep up the effort!
			</>
		),
	};
	return text[type];
}

export default ResultText;
