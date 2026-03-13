export function Deck({
  cardCount,
  img,
  onClick,
  disabled,
}: {
  cardCount: number;
  img: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <div className={`card ${disabled ? 'disabled' : ''}`} onClick={onClick}>
      <img src={img} alt="" style={{ visibility: cardCount > 0 ? 'visible' : 'hidden' }} />
    </div>
  );
}
