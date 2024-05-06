export default function (phase, { defaultConfig }) {
	return {
		images: {
			remotePatterns: [
				{
					protocol: "https",
					hostname: "auta.ch",
					port: "",
					pathname: "/**/**/**",
				},
			],
		},
	};
}
