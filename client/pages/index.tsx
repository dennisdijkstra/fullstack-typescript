import { gql, useQuery } from '@apollo/client';

const POSTS = gql`
    query getPosts {
        posts {
            id
            title
        }
    }
`;

export default function Home() {
    const { loading, error, data } = useQuery(POSTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return (
        <ul>
            {data.posts.map(({ id, title }) => <li key={id}>{title}</li>)}
        </ul>
    )
}
