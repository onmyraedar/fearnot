import Markdown from 'react-markdown';

export default function SolutionPathScreen({ path, story, goToNextScreen }) {

  return (
    <>
      <p>{path} path</p>
      <Markdown>{story.solution}</Markdown>
      <form onSubmit={(event) => {
        event.preventDefault();
        goToNextScreen();
      }}>
        <button type="submit">Continue</button>
      </form>
    </>
  );
}
