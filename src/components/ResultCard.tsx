export function ResultCard({
  title,
  description,
  result,
  onClose,
}: {
  title: string;
  description: string;
  result?: string;
  onClose: () => void;
}) {
  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose}>
          ✕
        </button>
        <h2>{title}</h2>
        <p>{description}</p>
        {result && result === 'HOST' && (
          <p>
            <em>
              Congratulations, <br />
              You are hosting next standup!
            </em>
          </p>
        )}
        {result && result === 'QUOTE' && (
          <p>
            <em>
              Congratulations, <br />
              You are providing the quote for next standup!
            </em>
          </p>
        )}
      </div>
    </div>
  );
}
