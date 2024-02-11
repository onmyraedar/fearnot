import Markdown from 'react-markdown';

export default function PathScreen({ path, story }) {
  if (path === 'solution') {
    return (
      <>
        <p>{path} path</p>
        <Markdown>{story.solution}</Markdown>
      </>
    );
  } else {
    return <p>{path} path</p>;
  }
}
