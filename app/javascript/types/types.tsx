const allTags = ["General", "Sports", "Music", "Art", "Technology", "Relationship", "Politics"]
// array and object for tags. Array for iterating over to create checkboxes, object for filtering purposes
const allTagsObject = {
    "General": true,
    "Sports": true,
    "Music": true,
    "Art": true,
    "Technology": true,
    "Relationship": true,
    "Politics": true
}

// props taken in PostForm component
type postFormProps = {
    action: "Create" | "Edit"
    title: string
    body: string
    id: number
    tag: typeof allTags[number]
}

// props taken in CommentForm component
type commentFormProps = {
    action: "Add" | "Edit"
    id: number
    commenter: string
    body: string
    postId: number
    parentId: number | undefined
}
// props taken in PostItem component
type postProps = {
    id: number
    title: string
    body: string
    tag: typeof allTags[number]
}

const samplePost = {
    id: -100,
    title: "",
    body: "",
    tag: "General"
}

// props taken in CommentItem component
type commentProps = {
    id: number
    commenter: string
    body: string
    postId: number
    parentId: number | undefined
}

export { allTags, allTagsObject, postFormProps, commentFormProps, postProps, commentProps, samplePost }