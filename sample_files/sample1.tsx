function Foo(props: { name: string }) {
    return <div>{props.name}</div>

}

export function Demo() {
    return <div>
        <Foo name="bar" />
        Hello world!
    </div>
}   