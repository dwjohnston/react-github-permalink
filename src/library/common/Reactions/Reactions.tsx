export type ReactionsProps = {
    reactions: {
        "+1": number,
        "-1": number,
        confused: number,
        eyes: number,
        heart: number,
        hooray: number,
        laugh: number,
        rocket: number,
        total_count: number
    }
}



const REACTIONS_MAP: Record<keyof Omit<ReactionsProps['reactions'], "total_count">, string> = {
    "+1": "👍",
    "-1": "👎",
    "confused": "😕",
    "eyes": "👀",
    "heart": "❤️",
    "hooray": "🎉",
    "laugh": "😆",
    "rocket": "🚀"
}

export function Reactions(props: ReactionsProps) {
    return <div className="reaction-bar">
        {Object.entries(props.reactions).map((v) => {
            const [key, value] = v as [keyof ReactionsProps['reactions'], number];


            if (value === 0 || key === "total_count") {
                return null;
            }

            const emoji = REACTIONS_MAP[key];
            if (!emoji) {
                return null;
            }

            return <div className="reaction-value" key={key}><span>{emoji}</span><span>{value}</span></div>
        })}
    </div>

} 
