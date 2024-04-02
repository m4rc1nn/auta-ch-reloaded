import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default function (phase, { defaultConfig }) {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
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

    return {
        output: "export",
        basePath: "/auta-ch-reloaded",
        images: {
            unoptimized: true,
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
