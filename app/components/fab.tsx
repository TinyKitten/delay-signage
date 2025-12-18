type Props = {
  state: boolean;
  onClick: () => void;
};

export const FAB = ({ state, onClick }: Props) => {
  return (
    <div className="fixed top-6 right-6 z-30 w-12 h-12 md:hidden">
      <button
        onClick={onClick}
        className="bg-white text-black rounded-full w-full h-full flex items-center justify-center shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className={`transition-all duration-300 origin-center ${
              state ? "rotate-45 translate-y-0" : "rotate-0 -translate-y-2"
            }`}
            d="M4 12h16"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className={`transition-all duration-300 ${
              state ? "opacity-0" : "opacity-100"
            }`}
            d="M4 12h16"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className={`transition-all duration-300 origin-center ${
              state ? "-rotate-45 translate-y-0" : "rotate-0 translate-y-2"
            }`}
            d="M4 12h16"
          />
        </svg>
      </button>
    </div>
  );
};
