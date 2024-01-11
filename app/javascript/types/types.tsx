const allTags = ["General", "Sports", "Music", "Art", "Technology", "Relationship", "Politics"]

type formProps = {
    action: "Create" | "Edit"
    title: string
    body: string
    id: number
    tag: typeof allTags[number]
}

type postProps = {
    id: number
    title: string
    body: string
    tag: typeof allTags[number]
}

export { allTags, formProps, postProps }