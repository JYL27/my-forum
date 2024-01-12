const allTags = ["General", "Sports", "Music", "Art", "Technology", "Relationship", "Politics"]

const allTagsObject = {
    "General": true,
    "Sports": true,
    "Music": true,
    "Art": true,
    "Technology": true,
    "Relationship": true,
    "Politics": true
}

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

export { allTags, allTagsObject, formProps, postProps }