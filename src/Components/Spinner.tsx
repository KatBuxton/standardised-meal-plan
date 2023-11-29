export const Spinner = () => {
    return (
        <svg className="spinner" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <style>{`.spinner_HIK5{transform-origin:center;animation:spinner_XVY9 1s cubic-bezier(0.36,.6,.31,1) infinite}@keyframes spinner_XVY9{50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}`}</style>
            <circle cx="12" cy="12" r="3" fill="#fff" />
            <g className="spinner_HIK5">
                <circle cx="4" cy="12" r="3" fill="#fff" />
                <circle cx="20" cy="12" r="3" fill="#fff" />
            </g>
        </svg>
    )
}