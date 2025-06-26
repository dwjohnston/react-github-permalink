export function StackOverflowSvg(props: {
    size?: number
}) {

    const size = props.size ?? 16; 

    return <svg className="stackoverflow-logo" height={`${size}`} width={`${size}`} aria-hidden="true" viewBox="0 0 24 24" version="1.1">
        <path fill="#f48024" d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.95zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.36 1.618zM15.539 0l-1.7 1.265 6.381 8.588 1.7-1.265L15.539 0zM6.369 17.594h10.739v-2.137H6.369v2.137z"/>
    </svg>
}