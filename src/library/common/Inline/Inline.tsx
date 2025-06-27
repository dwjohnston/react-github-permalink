import { GithubSvg } from "../../images/GithubSvg/GithubSvg";

export function Inline(props: {
    href: string;
    text: string;
}) {

    const { href, text } = props;
    return <a href={href} className="rgp-base react-github-issue-link-inline">
        <GithubSvg /> <span>{text}</span></a>
}