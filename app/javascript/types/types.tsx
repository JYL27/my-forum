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
    id: number
    poster: string
    title: string
    body: string
    tag: typeof allTags[number]
}

const defaultPost = {
    id: -1,
    poster: " ",
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

type postParams = {
    id: string
}

export { allTags, allTagsObject, postFormProps, commentFormProps, postProps, commentProps, defaultPost, postParams }