import React from 'react';

const DOT_LENGTH_MULTIPLIER = 0.2;
const DOT_LENGTH_REMAINDER = 0.1;
const TOTAL_TIME_MULTIPLIER = -0.4;
const ONE = 1;

function WaveLoadingAnimation({ dotLength = 6 }) {
	const animationDelay = (index) => {
		const a = TOTAL_TIME_MULTIPLIER + (index - ONE) * DOT_LENGTH_MULTIPLIER;
		return `${a}s`;
	};

	const finalAnimationTime = `blink ${
		dotLength * DOT_LENGTH_MULTIPLIER + DOT_LENGTH_REMAINDER
	}s infinite, shrink ${dotLength * DOT_LENGTH_MULTIPLIER + DOT_LENGTH_REMAINDER}s infinite`;

	const styles = `
    html, body {
        margin: 0;
        padding: 0;
    }

    body {
        background: #F6F7F8;
    }

    div#wave {
        position: relative;
        margin-top: 50vh;
        text-align: center;
        width: 100px;
        height: 100px;
        margin-left: auto;
        margin-right: auto;
    }

    #wave .dot {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 3px;
        animation:${finalAnimationTime};
    }

    ${Array.from({ length: dotLength })
		.map(
			(_, index) => `
        #wave .dot:nth-child(${index + ONE}) {
            animation-delay: ${animationDelay(index)};
            background-color: #ee3425;
        }
        `,
		)
		.join('\n')}
      
    @keyframes blink {
        0%, 50%, 100% {
            opacity: 1;
        }
    
        25% {
            opacity: 0.3;
        }
    }
    
    @keyframes shrink {
        0%, 50% {
            transform: scale(1);
        }
    
        25% {
            transform: scale(0);
        }
    }
  `;

	return (
		<div>
			<style>{styles}</style>
			<div id="wave">
				{Array.from({ length: dotLength }).map((_, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<span key={index} className="dot" />
				))}
			</div>
		</div>
	);
}

export default WaveLoadingAnimation;
