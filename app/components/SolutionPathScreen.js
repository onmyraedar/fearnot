import Markdown from 'react-markdown';

export default function SolutionPathScreen({ path, story }) {

  return (
    <>
      <p>{path} path</p>
      <Markdown>{story.solution}</Markdown>
    </>
  );
}
