type formProps = {
    action: "Create" | "Edit"
    title: string
    body: string
    id: number
}

type postProps = {
    id: number
    title: string
    body: string
}

export { formProps, postProps }