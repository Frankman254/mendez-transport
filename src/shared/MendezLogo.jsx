export default function MendezLogo({ size = 48, showText = true, dark = false }) {
	return (
		<div className="flex items-center gap-3">
			<svg
				width={size}
				height={size}
				viewBox="0 0 100 100"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="50" cy="50" r="48" fill={dark ? '#ffffff' : '#1a1a1a'} />
				<path
					d="M12 72 Q28 45 50 50 Q28 50 18 68 Z"
					fill="#e31e24"
					opacity="0.9"
				/>
				<path
					d="M88 72 Q72 45 50 50 Q72 50 82 68 Z"
					fill="#e31e24"
					opacity="0.9"
				/>
				<path
					d="M50 50 L50 70"
					stroke="white"
					strokeWidth="1.5"
					strokeDasharray="3 3"
				/>
				<text
					x="50"
					y="56"
					fontFamily="Arial Black, sans-serif"
					fontSize="40"
					fontWeight="900"
					fill={dark ? '#1a1a1a' : '#ffffff'}
					textAnchor="middle"
					dominantBaseline="middle"
				>
					M
				</text>
				<path
					d="M30 20 Q50 15 70 20"
					stroke="#e31e24"
					strokeWidth="3"
					strokeLinecap="round"
					fill="none"
				/>
				<path
					d="M35 14 Q50 10 65 14"
					stroke="#e31e24"
					strokeWidth="2"
					strokeLinecap="round"
					fill="none"
					opacity="0.6"
				/>
			</svg>
			{showText && (
				<div className="leading-none">
					<div
						className={`font-display text-2xl tracking-wide leading-none ${dark ? 'text-brand-black' : 'text-white'}`}
					>
						MÉNDEZ
					</div>
					<div className="text-xs font-semibold tracking-widest uppercase text-brand-red">
						TRANSPORT
					</div>
				</div>
			)}
		</div>
	);
}
