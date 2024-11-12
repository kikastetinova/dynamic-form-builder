import { useTreeMatch } from '../services/context';

const MatchIcon = () => {
  return (
    <svg
      className="w-20 h-20 text-emerald-400 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 21"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"
      ></path>
    </svg>
  );
};

const MatchPage = () => {
  const { match, restart } = useTreeMatch();
  return match ? (
    <div className="flex flex-col">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl font-bold mb-12">You have a match!</h1>
        <MatchIcon/>
      </div>
      <span className="text-lg font-bold">{match.name}</span>
      <span className="mt-2 mb-10">{match.description}</span>
      <button
        className="text-emerald-900 capitalize bg-emerald-200 hover:bg-emerald-300 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-3 focus:outline-none"
        onClick={restart}
      >
        Start over
      </button>
    </div>
  ) : (
    <></>
  );
};

export default MatchPage;
