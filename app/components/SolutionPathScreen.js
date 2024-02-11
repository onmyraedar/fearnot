import Markdown from 'react-markdown';

export default function SolutionPathScreen({ story, goToNextScreen }) {

  return (
    <>
      <h1>Solutions</h1>
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
