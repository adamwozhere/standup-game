export function Card({
  img,
  onClick,
  disabled,
}: {
  img: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <div className={`card ${disabled ? 'disabled' : ''}`} onClick={onClick}>
      <img src={img} alt='' />
    </div>
  );
}
