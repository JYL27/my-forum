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
    action: "Add" | "Edit" | "Reply"
    id: number
    commenter: string
    body: string
    post_id: number
    parent_id: number | undefined
}
// props taken in PostItem component
type postProps = {
    poster: string
    id: number
    title: string
    body: string
    tag: typeof allTags[number]
}

const samplePost = {
    poster: " ",
    id: -1,
    title: " ",
    body: " ",
    tag: "General"
}

// props taken in CommentItem component
type commentProps = {
    id: number
    commenter: string
    body: string
    post_id: number
    parent_id: number | undefined
}

export { allTags, allTagsObject, postFormProps, commentFormProps, postProps, commentProps, samplePost }